import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { decode } from "he";
import { getYear } from "@/utils/getYear";
import { Button } from "@/components/ui/button";
import CampusContent from "@/components/CampusContent";
import CampusesContent from "@/components/university-pages/CampusesContent";
import FAQsContent from "@/components/university-pages/FAQsContent";
import styles from "@/app/styles/page.module.css";
import Link from "next/link";
import CollegeCourses from "@/components/university-pages/CollegeCourses";
import slug from "slug";

const validTabs = [
  "info",
  "courses",
  "campuses",
  "careers",
  "ranking",
  "fees",
  "scholarships",
  "news",
  "facilities",
  "accommodations",
  "reviews",
  "faqs",
  "more",
];

// Generate metadata for each tab
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string; tab: string[] }>;
}): Promise<Metadata> {
  const { slugAndId, tab } = await params;
  const currentTab = tab?.[0] || "info";
  const id = slugAndId.split("-").pop();

  if (!id || isNaN(Number(id))) {
    return {
      title: "University Not Found",
      description: "The requested university could not be found.",
    };
  }

  const universityName = slugAndId
    .split("-")
    .slice(0, -1)
    .join(" ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const tabTitles = {
    info: "Information",
    courses: "Courses",
    campuses: "Campuses",
    careers: "Careers",
    ranking: "Rankings",
    fees: "Fees",
    scholarships: "Scholarships",
    accommodations: "Accommodations",
    facilities: "Facilities",
    news: "News",
    reviews: "Reviews",
    faqs: "FAQs",
    more: "More",
  };

  const tabTitle =
    tabTitles[currentTab as keyof typeof tabTitles] || "Information";

  const metadata: Metadata = {
    title: `${universityName} ${tabTitle} - PickMyUni`,
    description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
    openGraph: {
      title: `${universityName} ${tabTitle} - PickMyUni`,
      description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
      url: `https://pickmyuni.com/university/${slugAndId}/${currentTab}`,
      siteName: "PickMyUni",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${universityName} ${tabTitle} - PickMyUni`,
      description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
    },
  };

  return metadata;
}

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
    case "campuses":
      return <CampusesContent info={info} />;

    case "courses":
      const categories = new Map<string, any>();

      info.relatedCourses.forEach((course: any) => {
        const category = course.level;
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category).push(course);
      });

      const categoryList = Array.from(categories.entries());

      return (
        <div className="space-y-4">
          {info.content ? (
            <div className="">
              {info?.content?.content && (
                <CampusContent content={info.content.content} />
              )}
              {info.relatedCourses.length ? (
                <div>
                  <h2 className="text-brand-primary mb-4 text-3xl font-semibold">
                    {info.college.college_name} Courses
                  </h2>
                  <div className="space-y-4">
                    <Accordion type="multiple" className="w-full space-y-2">
                      {categoryList.map(
                        ([category, courses]: any, index: number) => (
                          <AccordionItem
                            className="border-t-2 p-4 first-of-type:border-t-0"
                            key={index}
                            value={category}
                          >
                            <AccordionTrigger asChild>
                              <button className="group flex w-full items-center justify-between">
                                <span className="text-brand-primary text-lg font-medium">
                                  <span className="flex items-center gap-4">
                                    <GraduationCap fill="currentColor" />
                                    {category.charAt(0).toUpperCase() +
                                      category
                                        .slice(1)
                                        .replaceAll("_", " ")}{" "}
                                    Courses ({courses.length})
                                  </span>
                                </span>
                                <span className="ml-2 mr-2 h-4 w-4">
                                  <ChevronDown className="block transition-transform duration-200 group-data-[state=open]:hidden" />
                                  <ChevronUp className="hidden transition-transform duration-200 group-data-[state=open]:block" />
                                </span>
                              </button>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="mt-4 grid gap-4">
                                <Accordion
                                  type="single"
                                  className="w-full space-y-4"
                                  collapsible
                                >
                                  {courses.map((course: any, index: number) => (
                                    <AccordionItem
                                      className="rounded-lg bg-[#F6F6F7] p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                                      key={index}
                                      value={course.name}
                                    >
                                      <AccordionTrigger asChild>
                                        <div className="group flex w-full items-center justify-between">
                                          <Link
                                            href={`/university/${slugAndId}/courses-${slug(course.name)}-${course.id}`}
                                          >
                                            <span className="text-brand-primary text-start text-lg font-medium">
                                              {course.name} fees details for{" "}
                                              {getYear}
                                            </span>
                                          </Link>
                                          <Button
                                            variant={"outline"}
                                            className="text-brand-primary transition-colors hover:text-blue-900"
                                          >
                                            <span className="hidden sm:block">
                                              More Details
                                            </span>
                                            <ChevronDown className="block transition-transform duration-200 group-data-[state=open]:hidden" />
                                            <ChevronUp className="hidden transition-transform duration-200 group-data-[state=open]:block" />
                                          </Button>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="mt-2 grid gap-4">
                                          <CourseCard course={course} />
                                        </div>
                                      </AccordionContent>
                                      <div className="mt-4 flex justify-between rounded-md bg-white">
                                        <div className="hidden p-2 sm:flex">
                                          Total fees for all subjects including
                                          taxes
                                        </div>
                                        <div className="p-2 sm:hidden">
                                          Total Fees
                                        </div>
                                        <div className="bg-brand-secondary fee-badge flex min-w-28 items-center justify-end rounded-r-md pr-2 font-bold text-white sm:min-w-40">
                                          AUD{" "}
                                          {(
                                            course.tution_fees +
                                            course.hostel_fees +
                                            course.other_fees
                                          ).toLocaleString()}{" "}
                                        </div>
                                      </div>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ),
                      )}
                    </Accordion>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <p className="text-brand-primary bg-gray-100 p-4 text-center italic">
              No content Found. Please check back later.
            </p>
          )}
        </div>
      );

    case "faqs":
      // Extract university name from slugAndId
      const universityName = slugAndId
        .split("-")
        .slice(0, -1)
        .join(" ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return <FAQsContent info={info} universityName={universityName} />;

    default:
      return (
        <div className="space-y-6">
          {info.map((item: any, index: number) => (
            <div key={index} className="">
              {item?.content && (
                <div
                  className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
                  dangerouslySetInnerHTML={{
                    __html: decode(item.content),
                  }}
                />
              )}
            </div>
          ))}
        </div>
      );
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
