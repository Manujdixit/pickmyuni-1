import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getYear } from "@/utils/getYear";
import { CourseCard } from "./CourseCard";
import { CourseData, Course } from "./types";

interface CoursesContentProps {
  data: CourseData;
}

export const CoursesContent: React.FC<CoursesContentProps> = ({ data }) => {
  const categories = new Map<string, Course[]>();

  data.relatedCourses.forEach((course) => {
    const category = course.level;
    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(course);
  });

  const categoryList = Array.from(categories.entries());

  if (!data.relatedCourses.length) {
    return (
      <p className="bg-gray-50 p-4 text-gray-500">
        No courses information found for this university
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-brand-primary mb-4 text-3xl font-semibold">
          {data.college.college_name} Courses
        </h2>
        <p className="text-lg font-normal leading-7"></p>

        <div className="space-y-4">
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={[categoryList[0]?.[0]]}
          >
            {categoryList.map(([category, courses], index) => (
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
                      {courses.map((course, index) => (
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
                              Total fees for all subjects including taxes
                            </div>
                            <div className="p-2 sm:hidden">Total Fees</div>
                            <div
                              className="bg-brand-secondary flex min-w-28 items-center justify-end rounded-r-md pr-2 font-bold text-white sm:min-w-40"
                              style={{
                                clipPath:
                                  "polygon(15px 0%, 100% 0%, 100% 100%, 0% 100%)",
                              }}
                            >
                              AUD{" "}
                              {(
                                (course.tution_fees || 0) +
                                (course.hostel_fees || 0) +
                                (course.other_fees || 0)
                              ).toLocaleString()}{" "}
                            </div>
                          </div>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
