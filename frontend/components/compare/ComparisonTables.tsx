"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalFirst } from "@/utils/capitalFirst";
import { LucideBookOpenText, LucideUniversity } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type University = {
  id: number;
  collegeId: string | null;
  collegeName: string;
  courseId: string | null;
  courseName: string | null;
  data: any | null;
};

interface ComparisonTableProps {
  universities: University[];
}

const CourseComparisonTable = ({ universities }: ComparisonTableProps) => {
  // const [widthCourseCol1, setWidthCourseCol1] = useState(null);
  // const [widthCourseCol2, setWidthCourseCol2] = useState(null);
  // const [widthCourseCol3, setWidthCourseCol3] = useState(null);

  const getCourseForUni = (uni: University) => {
    if (!uni.data || !uni.data.college || !uni.courseId) return null;
    return (
      uni.data.college.CollegesCourses.find(
        (c: any) => String(c.id) === uni.courseId,
      ) || null
    );
  };

  const courseInfoRows = [
    {
      label: "Course Name",
      getValue: (course: any) => course?.name || "-",
    },
    {
      label: "Level",
      getValue: (course: any) =>
        capitalFirst(course?.level?.split("_").join(" ")) || "-",
    },
    // { label: "Score", getValue: (course: any) => course?.score || "-" },
    {
      label: "Duration (Weeks)",
      getValue: (course: any) =>
        course?.duration_in_months
          ? `${course?.duration_in_months} Weeks`
          : "-",
    },
    {
      label: "Tuition Fees (International)",
      getValue: (course: any) =>
        course?.tution_fees
          ? `AUD ${Number(course?.tution_fees).toLocaleString()}`
          : "-",
    },
    {
      label: "Tuition Fees (Domestic)",
      getValue: (course: any) =>
        course?.domestic_fees_in_aud
          ? `AUD ${Number(course?.domestic_fees_in_aud).toLocaleString()}`
          : "-",
    },
    {
      label: "Non-tuition Fees",
      getValue: (course: any) =>
        course?.hostel_fees
          ? `AUD ${Number(course?.hostel_fees).toLocaleString()}`
          : "-",
    },
    {
      label: "Estimated Total Fees",
      getValue: (course: any) =>
        course?.one_time_fees
          ? `AUD ${Number(course.one_time_fees).toLocaleString()}`
          : "-",
    },
  ];

  return (
    <div>
      <span className="text-brand-secondary flex items-center gap-4 text-[26px] font-semibold">
        <LucideBookOpenText /> Course info
      </span>
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-secondary hover:bg-orange-500">
            <TableHead className="border-x-2 border-white text-white">
              Subject
            </TableHead>
            {universities.map((uni) => (
              <TableHead
                key={uni.id}
                className="border-x-2 border-white text-center text-white"
              >
                {uni.collegeName || "Select University"}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseInfoRows.map((row, index) => (
            <TableRow
              className={`text-h4 leading-tight ${
                index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-[#F0F0F0]"
              }`}
              key={index}
            >
              <TableCell className="border-x-2 border-white font-medium">
                {row.label}
              </TableCell>
              {universities.map((uni) => {
                const course = getCourseForUni(uni);
                return (
                  <TableCell
                    key={uni.id}
                    className={`border-x-2 border-white text-center`}
                  >
                    {uni.collegeId ? row.getValue(course) : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const InstitutionComparisonTable = ({ universities }: ComparisonTableProps) => {
  // const [widthInstituteCol1, setWidthInstituteCol1] = useState<number>(0);
  // const [widthInstituteCol2, setWidthInstituteCol2] = useState(0);
  // const [widthInstituteCol3, setWidthInstituteCol3] = useState(0);
  // const [widthInstituteCol4, setWidthInstituteCol4] = useState(0);
  // const [widthInstituteCol5, setWidthInstituteCol5] = useState(0);

  // let instituteDivWIdths=[]

  // useEffect(() => {
  //   if (instituteDiv1.current) {
  //     setWidthInstituteCol1(instituteDiv1.current.offsetWidth);
  //   }
  //   if (instituteDiv2.current) {
  //     setWidthInstituteCol2(instituteDiv2.current.offsetWidth);
  //   }
  //   if (instituteDiv3.current) {
  //     setWidthInstituteCol3(instituteDiv3.current.offsetWidth);
  //   }
  //   if (instituteDiv4.current) {
  //     setWidthInstituteCol4(instituteDiv4.current.offsetWidth);
  //   }
  //   if (instituteDiv5.current) {
  //     setWidthInstituteCol5(instituteDiv5.current.offsetWidth);
  //   }
  // }, [universities]);

  const institutionInfoRows = [
    {
      label: "Established",
      getValue: (uni: University) => uni.data?.college?.established || "-",
    },
    {
      label: "Type of Institution",
      getValue: (uni: University) => {
        let type = uni.data?.college?.type || "-";
        if (
          typeof type === "string" &&
          type.toLowerCase().includes("government")
        ) {
          type = type.replace(/government/gi, "Public");
        }
        return type;
      },
    },
    {
      label: "Total Courses",
      getValue: (uni: University) => uni.data?.college?.coursesCount || "-",
    },
    {
      label: "Total Students",
      getValue: (uni: University) =>
        uni.data?.college?.total_students
          ? Number(uni.data.college.total_students).toLocaleString()
          : "-",
    },
    {
      label: "Acceptance Rate",
      getValue: (uni: University) =>
        uni.data?.college?.acceptance_rate
          ? `${uni.data.college.acceptance_rate}%`
          : "-",
    },
    {
      label: "Intl. Student Rate",
      getValue: (uni: University) =>
        uni.data?.college?.international_student_rate
          ? `${uni.data.college.international_student_rate}%`
          : "-",
    },
    {
      label: "Intake Period",
      getValue: (uni: University) => uni.data?.college?.intake || "-",
    },
  ];

  return (
    <div className="mt-12">
      <span className="text-brand-primary flex items-center gap-4 text-[26px] font-semibold">
        <LucideUniversity /> Institution info
      </span>
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-primary hover:bg-blue-900">
            <TableHead
              // ref={instituteDiv1}
              className="border-x-2 border-white text-white"
            >
              Subject
            </TableHead>
            {universities.map((uni) => (
              <TableHead
                key={uni.id}
                className="border-x-2 border-white text-center text-white"
                // ref={ins}
              >
                {uni.collegeName || "Select University"}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutionInfoRows.map((row, index) => (
            <TableRow
              className={`text-h4 leading-tight ${
                index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-[#F0F0F0]"
              }`}
              key={index}
            >
              <TableCell className="border-x-2 border-white font-medium">
                {row.label}
              </TableCell>
              {universities.map((uni) => (
                <TableCell
                  key={uni.id}
                  className="border-x-2 border-white text-center"
                >
                  {uni.collegeId ? row.getValue(uni) : "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { CourseComparisonTable, InstitutionComparisonTable };
