import { notFound } from "next/navigation";
import styles from "@/app/styles/page.module.css";
import { LucideAlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { capitalFirst } from "@/utils/capitalFirst";

async function getCourseData(id: number) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/v1/courses/single?id=${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return { course: null, error: null };
      }
      throw new Error(`Failed to fetch course data: ${response.status}`);
    }

    const data = await response.json();
    return { course: data.data, error: null };
  } catch (error) {
    return notFound();
  }
}

const CourseComparisonTable = ({ course }: any) => {
  const courseInfoRows = [
    {
      label: "Level",
      getValue: (course: any) =>
        capitalFirst(course?.level?.split("_").join(" ")) || "-",
    },
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
          ? `AUD ${Number(course?.one_time_fees).toLocaleString()}`
          : "-",
    },
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-secondary hover:bg-orange-500">
            <TableHead className="border-x-2 border-white text-white">
              Course
            </TableHead>
            <TableHead className="border-x-2 border-white text-center text-white">
              {course?.name}
            </TableHead>
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

              <TableCell
                key={course?.id}
                className={`border-x-2 border-white text-center`}
              >
                {course?.id ? row.getValue(course) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const CollegeCourses = async ({ tab }: { tab: string[] }) => {
  const idStr = tab[0]?.split("-").pop();
  const courseId = idStr ? Number(idStr) : NaN;
  const { course, error } = await getCourseData(courseId);
  if (error) {
    return notFound();
  }
  if (!course) {
    return notFound();
  }
  return (
    <div className="space-y-8">
      <CourseComparisonTable course={course} />
      {course.content ? (
        <div
          className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
          dangerouslySetInnerHTML={{
            __html: course.content,
          }}
        />
      ) : (
        <div className="flex h-[95vh] flex-col items-center justify-center gap-3 bg-gray-50 p-4 text-center italic text-gray-600">
          <LucideAlertCircle className="size-10" />
          <p>No course content available. Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default CollegeCourses;
