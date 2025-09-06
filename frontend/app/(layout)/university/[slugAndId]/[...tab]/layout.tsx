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
        { next: { revalidate: 60 * 60 * 12 } },
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
                url: course?.college?.logo_url
                  ? course?.college?.logo_url.includes("collegelogo/")
                    ? `${course?.college?.logo_url}`
                    : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/${course?.college?.logo_url}`
                  : "/opengraph-image.png",
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
              course?.college?.logo_url
                ? course?.college?.logo_url.includes("collegelogo/")
                  ? `${course?.college?.logo_url}`
                  : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/${course?.college?.logo_url}`
                : "/opengraph-image.png",
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
          url: college?.bg_url
            ? college?.bg_url.includes(
                "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/",
              )
              ? `${college?.bg_url}`
              : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${college?.bg_url}`
            : "/opengraph-image.png",
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
        college?.bg_url
          ? college?.bg_url.includes(
              "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/",
            )
            ? `${college?.bg_url}`
            : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${college?.bg_url}`
          : "/opengraph-image.png",
      ],
    },
  };
}

async function getUniversityData(id: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/v1/college/${id}`, {
      next: { revalidate: 60 * 60 * 12 },
    });

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

  // Map database silos to frontend tab names
  const siloToTabMapping: { [key: string]: string } = {
    info: "info",
    course: "courses",
    career: "careers",
    ranking: "ranking",
    fees: "fees",
    scholarship: "scholarships",
    placement: "placement",
    news: "news",
    faq: "faqs",
    other: "more",
    campus: "campuses",
    accommodation: "accommodations",
    reviews: "reviews",
    facilities: "facilities",
  };

  // Define restricted tabs for parent and non-parent colleges
  const parentRestrictedTabs = ["facilities", "accommodations"];
  const nonParentRestrictedTabs = ["campuses", "ranking", "scholarships"];

  // Get tabs that have actual content in the database
  const availableTabs = college.available_silos
    ? college.available_silos
        .map((silo: string) => siloToTabMapping[silo])
        .filter((tab: string | undefined): tab is string => Boolean(tab))
    : [];

  // Apply parent/non-parent filtering
  let filteredTabs: string[];
  if (college.is_parent === true) {
    // For parent colleges: remove restricted tabs and ensure campuses is included
    filteredTabs = availableTabs.filter(
      (tab: string) => !parentRestrictedTabs.includes(tab),
    );
    // Always include campuses for parent colleges
    if (!filteredTabs.includes("campuses")) {
      filteredTabs.push("campuses");
    }
  } else {
    // For non-parent colleges: remove restricted tabs
    filteredTabs = availableTabs.filter(
      (tab: string) => !nonParentRestrictedTabs.includes(tab),
    );
  }

  // If no content-based tabs are available, fall back to the original logic
  if (filteredTabs.length === 0) {
    const { validTabs } = await import(
      "@/components/university-pages/constants"
    );
    if (college.is_parent === true) {
      filteredTabs = validTabs.filter(
        (tab: string) => !parentRestrictedTabs.includes(tab),
      );
      // Ensure campuses is included for parent colleges
      if (!filteredTabs.includes("campuses")) {
        filteredTabs.push("campuses");
      }
    } else {
      filteredTabs = validTabs.filter(
        (tab: string) => !nonParentRestrictedTabs.includes(tab),
      );
    }
  } else {
    // Sort the filtered tabs according to the order in validTabs
    const { validTabs } = await import(
      "@/components/university-pages/constants"
    );
    filteredTabs = validTabs.filter((tab: string) =>
      filteredTabs.includes(tab),
    );

    // For parent colleges, ensure campuses is included and properly positioned
    if (college.is_parent === true && !filteredTabs.includes("campuses")) {
      // Insert campuses at its proper position according to validTabs order
      const campusesIndex = validTabs.indexOf("campuses");
      filteredTabs.splice(campusesIndex, 0, "campuses");
    }
  }

  return (
    <>
      <UniLayout college={college} slugAndId={slugAndId} />

      <div className="container mx-auto flex min-h-screen flex-col gap-6 py-6 lg:flex-row-reverse">
        <QuickFacts college={college} />
        <div className="min-w-0 flex-1">
          <TabsWithUrlContainer
            isparent={isParent()}
            slugAndId={slugAndId}
            availableTabs={filteredTabs}
          />
          {children}
        </div>
      </div>
    </>
  );
}
