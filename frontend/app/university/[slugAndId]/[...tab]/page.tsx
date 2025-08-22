import React from "react";
import { notFound, redirect } from "next/navigation";
import CampusesContent from "@/components/university-pages/campuses/CampusesContent";
import FAQsContent from "@/components/university-pages/faqs/FAQsContent";
import InfoContent from "@/components/university-pages/info/InfoContent";
import CoursesContent from "@/components/university-pages/courses/CoursesContent";
import CareersContent from "@/components/university-pages/careers/CareersContent";
import RankingContent from "@/components/university-pages/ranking/RankingContent";
import FeesContent from "@/components/university-pages/fees/FeesContent";
import ScholarshipsContent from "@/components/university-pages/scholarships/ScholarshipsContent";
import NewsContent from "@/components/university-pages/news/NewsContent";
import FacilitiesContent from "@/components/university-pages/facilities/FacilitiesContent";
import AccommodationsContent from "@/components/university-pages/accommodations/AccommodationsContent";
import ReviewsContent from "@/components/university-pages/reviews/ReviewsContent";
import MoreContent from "@/components/university-pages/more/MoreContent";
import CollegeCourses from "@/components/university-pages/courses/CollegeCourses";
import { validTabs } from "@/components/university-pages/constants";

const getEndpointForTab = (tab: string, id: number): string | null => {
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  const endpointMap: { [key: string]: string | null } = {
    info: `${baseUrl}/api/v1/college/info/${id}`,
    courses: `${baseUrl}/api/v1/college/courses/${id}`,
    campuses: `${baseUrl}/api/v1/college/suggest/${id}`,
    careers: `${baseUrl}/api/v1/college/careers/${id}`,
    ranking: `${baseUrl}/api/v1/college/ranking/${id}`,
    fees: `${baseUrl}/api/v1/college/fees/${id}`,
    scholarships: `${baseUrl}/api/v1/college/scholarships/${id}`,
    faqs: `${baseUrl}/api/v1/college/faqs/${id}`,
    news: `${baseUrl}/api/v1/college/news/${id}`,
    accommodations: `${baseUrl}/api/v1/college/accommodations/${id}`,
    reviews: `${baseUrl}/api/v1/college/reviews/${id}`,
    facilities: `${baseUrl}/api/v1/college/facilities/${id}`,
    more: `${baseUrl}/api/v1/college/others/${id}`,
  };

  return endpointMap[tab] || null;
};

const extractTabContent = (tab: string, data: any): any[] => {
  switch (tab) {
    case "info":
      return data.info_content || [];
    case "courses":
      return data;
    case "campuses":
      return data;
    case "careers":
      return data.career ? [data.career] : [];
    case "ranking":
      return data.rankings ? [data.rankings] : [];
    case "fees":
      return data.fees ? [data.fees] : [];
    case "scholarships":
      return data.scholarship ? [data.scholarship] : [];
    case "faqs":
      return data.faq ? [data.faq] : [];
    case "news":
      return data.result ? [data.result] : [];
    case "accommodations":
      return data.result ? [data.result] : [];
    case "reviews":
      return data.reviews ? [data.reviews] : [];
    case "facilities":
      return data.facilities ? [data.facilities] : [];
    case "more":
      return data.other ? [data.other] : [];
    default:
      return [];
  }
};

async function getTabData(tab: string, id: number) {
  try {
    const endpoint = getEndpointForTab(tab, id);

    if (!endpoint) {
      return {
        info: [
          {
            title: `${tab.charAt(0).toUpperCase() + tab.slice(1)} Information`,
            content: `${
              tab.charAt(0).toUpperCase() + tab.slice(1)
            } information will be available soon. Please check back later.`,
          },
        ],
        error: null,
      };
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${tab} information: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      const content = extractTabContent(tab, data.data);
      return { info: content, error: null };
    } else {
      throw new Error(data.message || `Failed to fetch ${tab} information`);
    }
  } catch (error) {
    console.error(`Error fetching ${tab} data:`, error);
    return {
      info: [],
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

async function TabPage({
  params,
}: {
  params: Promise<{ slugAndId: string; tab: string[] }>;
}) {
  const { slugAndId, tab } = await params;
  const tabParam = tab?.[0] || "info";
  // Normalize: treat any tab starting with 'course-' as 'courses'
  const currentTab = tabParam.startsWith("course-") ? "courses" : tabParam;

  // Catch-all for courses-... routes
  if (currentTab && currentTab.startsWith("courses-")) {
    return <CollegeCourses tab={tab} />;
  }

  if (!validTabs.includes(currentTab)) {
    redirect(`/university/${slugAndId}/info`);
  }

  const id = slugAndId.split("-").pop();

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const { info, error } = await getTabData(currentTab, Number(id));

  if (error) {
    return notFound();
  }

  if (!info || info.length === 0) {
    return (
      <div className="p-2 sm:p-4 lg:p-6">
        <div className="rounded-lg bg-gray-50 p-4 text-gray-500">
          No {currentTab} information found for this university
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6">
      {renderContent(currentTab, info, slugAndId)}
    </div>
  );
}

const renderContent = (
  currentTab: string,
  info: any,
  slugAndId: string,
): any => {
  switch (currentTab) {
    case "info":
      return <InfoContent info={info} />;

    case "courses":
      return <CoursesContent info={info} slugAndId={slugAndId} />;

    case "campuses":
      return <CampusesContent info={info} />;

    case "careers":
      return <CareersContent info={info} />;

    case "ranking":
      return <RankingContent info={info} />;

    case "fees":
      return <FeesContent info={info} />;

    case "scholarships":
      return <ScholarshipsContent info={info} />;

    case "news":
      return <NewsContent info={info} />;

    case "facilities":
      return <FacilitiesContent info={info} />;

    case "accommodations":
      return <AccommodationsContent info={info} />;

    case "reviews":
      return <ReviewsContent info={info} />;

    case "faqs":
      // Extract university name from slugAndId
      const universityName = slugAndId
        .split("-")
        .slice(0, -1)
        .join(" ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return <FAQsContent info={info} universityName={universityName} />;

    case "more":
      return <MoreContent info={info} />;

    default:
      return <InfoContent info={info} />;
  }
};

const CourseCard = ({ course }: any) => {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-gray-600">
        Tution Fees:{" "}
        {course.tution_fees != null
          ? `AUD ${course.tution_fees.toLocaleString()}`
          : "-"}
      </p>
      <p className="text-gray-600">
        Non Tution Fees:{" "}
        {course.hostel_fees != null
          ? `AUD ${course.hostel_fees.toLocaleString()}`
          : "-"}
      </p>
      <p className="text-gray-600">
        Other Fees:{" "}
        {course.other_fees != null
          ? `AUD ${course.other_fees.toLocaleString()}`
          : "-"}
      </p>
      <p className="text-gray-600">
        Total Estimated Fees:{" "}
        {course.one_time_fees != null
          ? `AUD ${course.one_time_fees.toLocaleString()}`
          : "-"}
      </p>
      {/* <p className="text-gray-600">
        Estimated Total Fees: {course.other_fees?.toLocaleString?.()}
      </p> */}
      <p className="text-gray-600">
        Duration:{" "}
        {course.duration_in_months != null
          ? `${course.duration_in_months.toLocaleString()} Weeks`
          : "-"}
      </p>
    </div>
  );
};

export default TabPage;
