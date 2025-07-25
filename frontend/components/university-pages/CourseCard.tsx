import React from "react";
import { Course } from "./types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-gray-600">
        Tuition Fees:{" "}
        {course.tution_fees != null
          ? `AUD ${course.tution_fees.toLocaleString()}`
          : "-"}
      </p>
      <p className="text-gray-600">
        Non Tuition Fees:{" "}
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
