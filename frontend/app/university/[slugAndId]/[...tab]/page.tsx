import React from "react";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import Head from "next/head";
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
import { UniversityCard } from "@/components/common/UniversityCard";
import CampusContent from "@/components/CampusContent";
import CampusesContent from "@/components/university-pages/CampusesContent";
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

// Helper function to parse FAQ HTML content and extract accordion items
const parseFAQContent = (
  htmlContent: string,
): Array<{ question: string; answer: string }> => {
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const faqItems: Array<{ question: string; answer: string }> = [];

  // Look for accordion structures
  const accordions = tempDiv.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header h4");
    const content = accordion.querySelector(".accordion-content p");

    if (header && content) {
      faqItems.push({
        question: header.textContent?.trim() || "",
        answer: content.innerHTML || "",
      });
    }
  });

  // Also look for list items with questions and answers
  const listItems = tempDiv.querySelectorAll("li");
  listItems.forEach((li) => {
    const text = li.innerHTML;
    if (text.includes("<br />") || text.includes("<br>")) {
      const parts = text.split(/<br\s*\/?>/);
      if (parts.length >= 2) {
        const question = parts[0].trim();
        const answer = parts.slice(1).join(" ").trim();
        if (question && answer) {
          faqItems.push({
            question: question.replace(/^\d+\.\s*/, ""), // Remove numbering
            answer: answer,
          });
        }
      }
    }
  });

  return faqItems;
};

// Helper function to clean HTML entities and tags
const cleanHtmlContent = (content: string): string => {
  // Use 'he' library to decode all HTML entities
  const decodedContent = decode(content);

  // Remove HTML tags and normalize whitespace
  return decodedContent
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Helper function to parse FAQ content on server side (without DOM)
const parseFAQContentServer = (
  htmlContent: string,
): Array<{ question: string; answer: string }> => {
  const faqItems: Array<{ question: string; answer: string }> = [];

  // Parse accordion structures first
  const accordionRegex =
    /<div class="accordion">[\s\S]*?<h4[^>]*>\s*(.*?)\s*<\/h4>[\s\S]*?<div class="accordion-content">[\s\S]*?<p[^>]*>(.*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<\/div>/g;
  let match;

  while ((match = accordionRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (question && answer && question !== answer) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // Parse list items with questions and answers (various formats)
  const listItemRegex = /<li[^>]*>\s*(.*?)\s*<\/li>/g;

  while ((match = listItemRegex.exec(htmlContent)) !== null) {
    const liContent = match[1];

    // Check for br tag separation
    if (liContent.includes("<br")) {
      const parts = liContent.split(/<br\s*\/?>/);
      if (parts.length >= 2) {
        const question = cleanHtmlContent(parts[0]).replace(/^\d+\.\s*/, "");
        const answer = decode(parts.slice(1).join(" ")).trim(); // Keep HTML in answer but decode entities
        if (
          question &&
          answer &&
          question !== answer &&
          question.length > 5 &&
          answer.length > 5
        ) {
          faqItems.push({
            question,
            answer,
          });
        }
      }
    }
    // Check for question ending with ? and followed by content
    else if (liContent.includes("?")) {
      const questionMatch = liContent.match(/^(.*?\?)\s*(.*)/);
      if (questionMatch) {
        const question = cleanHtmlContent(questionMatch[1]).replace(
          /^\d+\.\s*/,
          "",
        );
        const answer = decode(questionMatch[2]).trim(); // Keep HTML in answer but decode entities
        if (
          question &&
          answer &&
          question !== answer &&
          question.length > 5 &&
          answer.length > 5
        ) {
          faqItems.push({
            question,
            answer,
          });
        }
      }
    }
  }

  // Parse h3, h4, h5, h6 followed by p tags
  const headingRegex = /<h[3-6][^>]*>(.*?)<\/h[3-6]>\s*<p[^>]*>(.*?)<\/p>/g;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (
      question &&
      answer &&
      question !== answer &&
      question.length > 5 &&
      answer.length > 5
    ) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // Parse strong/bold questions followed by content
  const strongRegex = /<strong[^>]*>(.*?\?[^<]*)<\/strong>\s*([^<]+)/g;

  while ((match = strongRegex.exec(htmlContent)) !== null) {
    const question = cleanHtmlContent(match[1]);
    const answer = decode(match[2]).trim(); // Keep HTML in answer but decode entities
    if (
      question &&
      answer &&
      question !== answer &&
      question.length > 5 &&
      answer.length > 5
    ) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  // If no structured FAQs found, try to extract any question-like content
  if (faqItems.length === 0) {
    const questionRegex = /([^.!?]*\?[^<]*)/g;
    const questions = htmlContent.match(questionRegex);
    if (questions) {
      questions.forEach((q, index) => {
        const cleanQuestion = cleanHtmlContent(q);
        if (cleanQuestion.length > 10) {
          faqItems.push({
            question: cleanQuestion,
            answer:
              "Please refer to the university's official website for detailed information.",
          });
        }
      });
    }
  }

  return faqItems;
};

// FAQ Accordion Component
const FAQAccordion = ({ content }: { content: string }) => {
  const faqItems = parseFAQContentServer(content);

  // Filter out duplicate questions and ensure quality
  const uniqueFaqItems = faqItems
    .filter((item, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) => t.question.toLowerCase() === item.question.toLowerCase(),
        )
      );
    })
    .filter((item) => {
      // Filter out low-quality items
      return (
        item.question.length > 10 &&
        item.answer.length > 10 &&
        item.question !== item.answer &&
        !item.question.includes("&nbsp;") &&
        !item.answer.includes("&nbsp;")
      );
    });

  // Extract title/heading from content if exists
  const titleMatch =
    content.match(/<h[1-6][^>]*class[^>]*sub-title[^>]*>(.*?)<\/h[1-6]>/i) ||
    content.match(/<h[1-6][^>]*>(.*?FAQs.*?)<\/h[1-6]>/i);
  const title = titleMatch ? cleanHtmlContent(titleMatch[1]) : null;

  // If no valid FAQ items found, render original content
  if (uniqueFaqItems.length === 0) {
    return (
      <div
        className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
        dangerouslySetInnerHTML={{
          __html: decode(content),
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Render title if found */}
      {title && <h2 className="sub-title">{title}</h2>}

      <Accordion type="single" collapsible className="w-full space-y-2">
        {uniqueFaqItems.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="accordion overflow-hidden rounded-lg bg-white shadow-sm"
          >
            <AccordionTrigger className="accordion-header flex w-full cursor-pointer items-center justify-between px-4 py-5 transition-colors hover:bg-gray-50 [&[data-state=open]>.accordion-icon]:rotate-180">
              <h4 className="text-brand-primary mr-4 flex-1 text-left text-lg font-medium leading-tight">
                {faq.question}
              </h4>
              <span className="accordion-icon text-brand-primary text-2xl font-light transition-transform duration-300">
                <ChevronUp />
              </span>
            </AccordionTrigger>
            <AccordionContent className="accordion-content border-t border-gray-200 bg-white">
              <div className="p-4">
                <div
                  className="m-0 leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: decode(faq.answer) }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

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

// Generate FAQ JSON-LD structured data
const generateFAQJsonLd = (
  faqItems: Array<{ question: string; answer: string }>,
  universityName: string,
) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${universityName} Frequently Asked Questions`,
    description: `Find answers to common questions about ${universityName}`,
    mainEntity: faqItems.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanHtmlContent(faq.answer),
      },
    })),
  };

  return JSON.stringify(faqSchema);
};

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

  // Generate FAQ JSON-LD for the faqs tab
  let faqJsonLd = null;
  if (currentTab === "faqs" && info.length > 0) {
    const universityName = slugAndId
      .split("-")
      .slice(0, -1)
      .join(" ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Extract all FAQ items from the content
    const allFaqItems: Array<{ question: string; answer: string }> = [];

    info.forEach((item: any) => {
      if (item?.content) {
        const faqItems = parseFAQContentServer(item.content);
        const uniqueFaqItems = faqItems
          .filter((faqItem, index, self) => {
            return (
              index ===
              self.findIndex(
                (t) =>
                  t.question.toLowerCase() === faqItem.question.toLowerCase(),
              )
            );
          })
          .filter((faqItem) => {
            return (
              faqItem.question.length > 10 &&
              faqItem.answer.length > 10 &&
              faqItem.question !== faqItem.answer &&
              !faqItem.question.includes("&nbsp;") &&
              !faqItem.answer.includes("&nbsp;")
            );
          });
        allFaqItems.push(...uniqueFaqItems);
      }
    });

    if (allFaqItems.length > 0) {
      faqJsonLd = generateFAQJsonLd(allFaqItems, universityName);
    }
  }

  return (
    <>
      {faqJsonLd && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: faqJsonLd,
            }}
          />
        </Head>
      )}
      <div className="p-2 sm:p-4 lg:p-6">
        {renderContent(currentTab, info, slugAndId)}
      </div>
    </>
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
      return (
        <div className="space-y-6">
          {info.map((item: any, index: number) => (
            <div key={index} className="">
              {item?.content && <FAQAccordion content={item.content} />}
            </div>
          ))}
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
