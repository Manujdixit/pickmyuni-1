import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampusContent from "@/components/CampusContent";
import { getYear } from "@/utils/getYear";
import Link from "next/link";
import slug from "slug";

interface CoursesContentProps {
  info: any;
  slugAndId: string;
}

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
      <p className="text-gray-600">
        Duration:{" "}
        {course.duration_in_months != null
          ? `${course.duration_in_months.toLocaleString()} Weeks`
          : "-"}
      </p>
    </div>
  );
};

const CoursesContent: React.FC<CoursesContentProps> = ({ info, slugAndId }) => {
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
                                  category.slice(1).replaceAll("_", " ")}{" "}
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
};

export default CoursesContent;
