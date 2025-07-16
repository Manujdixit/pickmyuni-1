import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { UniversityCard } from "@/components/university";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { getYear } from "@/utils/getYear";
import { Button } from "@/components/ui/button";
import styles from "../../../styles/page.module.css";

const validTabs = [
  "info",
  "courses",
  "campuses",
  "careers",
  "ranking",
  "fees",
  "scholarships",
  "placement",
  "faqs",
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
    placement: "Placements",
    faqs: "FAQs",
  };

  const tabTitle =
    tabTitles[currentTab as keyof typeof tabTitles] || "Information";

  return {
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
    placement: `${baseUrl}/api/v1/college/placement/${id}`,
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
    case "placement":
      return data.placement ? [data.placement] : [];
    case "faqs":
      return data.faq ? [data.faq] : [];
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
  const currentTab = tab?.[0] || "info";

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
    <div className="p-2 sm:p-4 lg:p-6">{renderContent(currentTab, info)}</div>
  );
}

const renderContent = (currentTab: string, info: any): any => {
  switch (currentTab) {
    case "campuses":
      return info && info.length > 0 ? (
        <div className="space-y-4">
          {info.map((university: any, index: number) => (
            <UniversityCard
              key={university.id || index}
              university={university}
            />
          ))}
        </div>
      ) : (
        <p>Nothing to show.</p>
      );

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
          {info.relatedCourses.length ? (
            <div>
              <h2 className="text-brand-primary mb-4 text-3xl font-semibold">
                {info.college.college_name} Courses
              </h2>
              <p className="text-lg font-normal leading-7">
                {/* Monash University, with its 10 academic faculties, offers an
            impressive 516 programs. These include 142 undergraduate courses,
            174 graduate courses, and 71 double-degree options. Additionally,
            the university provides 129 professional development courses. As the
            third-largest provider of graduate research programs in Australia,
            Monash supervises nearly 5,000 Higher Degree by Research (HDR)
            students.
            <br />
            Monash University in Melbourne offers a diverse array of courses
            across multiple disciplines. Here are some of the courses available: */}
              </p>

              <div className="space-y-4">
                <Accordion
                  type="multiple"
                  className="w-full space-y-2"
                  defaultValue={[categoryList[0]?.[0]]}
                >
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
                                  category.slice(1)}{" "}
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
                                    <button className="group flex w-full items-center justify-between">
                                      <span className="text-brand-primary text-start text-lg font-medium">
                                        {course.name} fees details for {getYear}
                                      </span>
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
                                    </button>
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
                                    <div
                                      className="bg-brand-secondary flex min-w-28 items-center justify-end rounded-r-md pr-2 font-bold text-white sm:min-w-40"
                                      style={{
                                        clipPath:
                                          "polygon(15px 0%, 100% 0%, 100% 100%, 0% 100%)",
                                      }}
                                    >
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
            <p className="bg-gray-50 p-4 text-gray-500">
              No {currentTab} information found for this university
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          {info.map((item: any, index: number) => (
            <div key={index} className="">
              {item?.content && (
                <div
                  className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
                  dangerouslySetInnerHTML={{
                    __html: item.content,
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
