import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import UniLayout from "@/components/university-pages/UniLayout";
import TabsWithUrlContainer from "@/components/university-pages/TabsWithUrlContainer";
import QuickFactsLoader from "@/components/university-pages/QuickFactsLoader";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}): Promise<Metadata> {
  const { slugAndId } = await params;
  const id = slugAndId.split("-").pop();

  if (!id || isNaN(Number(id))) {
    return {
      title: "University Not Found",
      description: "The requested university could not be found.",
    };
  }

  const { college } = await getUniversityData(Number(id));

  if (!college) {
    return {
      title: "University Not Found",
      description: "The requested university could not be found.",
    };
  }

  return {
    title: `${college.college_name} - PickMyUni`,
    description:
      college.description ||
      `Learn more about ${college.college_name}, one of Australia's leading universities.`,
    openGraph: {
      title: `${college.college_name} - PickMyUni`,
      description:
        college.description ||
        `Learn more about ${college.name}, one of Australia's leading universities.`,
      url: `https://pickmyuni.com/university/${slugAndId}`,
      siteName: "PickMyUni",
      images: [
        {
          url: college.logo_url || college.bg_url,
          width: 1200,
          height: 630,
          alt: `${college.college_name} logo`,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${college.college_name} - PickMyUni`,
      description:
        college.description ||
        `Learn more about ${college.name}, one of Australia's leading universities.`,
      images: [college.logo_url || college.bg_url],
    },
  };
}

async function getUniversityData(id: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/v1/college/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return { college: null, error: null };
      }
      throw new Error(`Failed to fetch university data: ${response.status}`);
    }

    const data = await response.json();
    return { college: data.data, error: null };
  } catch (error) {
    return notFound();
  }
}

export default async function UniversityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slugAndId: string }>;
}) {
  const { slugAndId } = await params;
  const id = slugAndId.split("-").pop();

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const { college, error } = await getUniversityData(Number(id));

  if (error) return <div>Error: {error}</div>;
  if (!college) {
    notFound();
    return null;
  }

  return (
    <>
      {/* Show banner and college info first */}
      <UniLayout college={college} slugAndId={slugAndId} />

      <div className="container mx-auto flex min-h-screen flex-col gap-6 py-6 lg:flex-row-reverse">
        {/* Defer QuickFacts until API resolves */}
        <Suspense fallback={<div>Loading facts…</div>}>
          <QuickFactsLoader id={Number(id)} />
        </Suspense>

        <div className="min-w-0 flex-1">
          <TabsWithUrlContainer id={id!} slugAndId={slugAndId} />
          {children}
        </div>
      </div>
    </>
  );
}
