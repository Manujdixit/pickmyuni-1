import React from "react";
import { notFound } from "next/navigation";
import QuickFacts from "@/components/QuickFacts";
import { Metadata } from "next";
import UniLayout from "@/components/university-pages/UniLayout";
import TabsWithUrlContainer from "@/components/university-pages/TabsWithUrlContainer";
import { getDynamicMetadata } from "@/components/university-pages/constants";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string; tab: string[] }>;
}): Promise<Metadata> {
  const { slugAndId, tab } = await params;
  const tabParam = tab?.[0] || "info";
  const currentTab = tabParam.startsWith("course-") ? "courses" : tabParam;

  // Handle regular university tab routes
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

  const universityName =
    college.college_name ||
    college.name ||
    slugAndId
      .split("-")
      .slice(0, -1)
      .join(" ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Handle course-specific routes
  if (currentTab && currentTab.startsWith("courses-")) {
    const idStr = tabParam.split("-").pop();
    const courseId = idStr ? Number(idStr) : NaN;

    if (isNaN(courseId)) {
      return {
        title: "Course Not Found | PickMyUni",
        description: "The requested course could not be found.",
      };
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${baseUrl}/api/v1/courses/single?id=${courseId}`,
      );

      if (response.ok) {
        const data = await response.json();
        const course = data.data;
        const courseName = course?.name || "Course";

        return {
          title: `${courseName} at ${universityName} | Course Info, Reviews & Transfers – PickMyUni`,
          description: `Explore the ${courseName} at ${universityName} — course details, duration, career outcomes, and student reviews. Thinking of switching? PickMyUni can help you transfer or compare similar courses.`,
          openGraph: {
            title: `${courseName} at ${universityName} | Course Info, Reviews & Transfers – PickMyUni`,
            description: `Explore the ${courseName} at ${universityName} — course details, duration, career outcomes, and student reviews. Thinking of switching? PickMyUni can help you transfer or compare similar courses.`,
            url: `https://pickmyuni.com/university/${slugAndId}/${tabParam}`,
            siteName: "PickMyUni",
            images: [
              {
                url:
                  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                    course?.college?.logo_url ||
                  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/" +
                    course?.college?.bg_url,
                width: 1200,
                height: 630,
                alt: `${universityName} logo`,
              },
            ],
            locale: "en_AU",
            type: "website",
          },
          twitter: {
            card: "summary_large_image",
            title: `${courseName} at ${universityName} | Course Info, Reviews & Transfers – PickMyUni`,
            description: `Explore the ${courseName} at ${universityName} — course details, duration, career outcomes, and student reviews. Thinking of switching? PickMyUni can help you transfer or compare similar courses.`,
            images: [
              "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                course?.college?.logo_url ||
                "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/" +
                  course?.college?.bg_url,
            ],
          },
        };
      }
    } catch (error) {
      console.error("Error fetching course metadata:", error);
    }

    return {
      title: "Course Not Found | PickMyUni",
      description: "The requested course could not be found.",
    };
  }

  // Use dynamic metadata for specific tabs

  const dynamicMeta = getDynamicMetadata(
    currentTab,
    universityName,
    slugAndId,
    currentTab,
    college,
  );

  return {
    title: dynamicMeta.title,
    description: dynamicMeta.description,
    openGraph: {
      title: dynamicMeta.title,
      description: dynamicMeta.description,
      url: `https://pickmyuni.com/university/${slugAndId}/${currentTab}`,
      siteName: "PickMyUni",
      images: [
        {
          url:
            "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
              college.logo_url ||
            "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/" +
              college.bg_url,
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
      title: dynamicMeta.title,
      description: dynamicMeta.description,
      images: [
        "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
          college.logo_url ||
          "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/" +
            college.bg_url,
      ],
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

  const isParent = () => {
    if (college.is_parent) {
      return true;
    } else return false;
  };

  return (
    <>
      <UniLayout college={college} slugAndId={slugAndId} />

      <div className="container mx-auto flex min-h-screen flex-col gap-6 py-6 lg:flex-row-reverse">
        <QuickFacts college={college} />
        <div className="min-w-0 flex-1">
          <TabsWithUrlContainer isparent={isParent()} slugAndId={slugAndId} />
          {children}
        </div>
      </div>
    </>
  );
}
