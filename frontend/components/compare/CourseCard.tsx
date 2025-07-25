import React from "react";

function CourseCard({ course }: { course: any }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="grid gap-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">Course Name</span>
          <span className="font-semibold text-gray-800">
            {course.name || (
              <span className="italic text-gray-400">Course</span>
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="font-semibold text-gray-800">
            {course.level || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Score</span>
          <span className="font-semibold text-gray-800">
            {course.score ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Specialization</span>
          <span className="font-semibold text-gray-800">
            {course.specialization || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-semibold text-gray-800">
            {course.duration_in_months
              ? `${course.duration_in_months} Months`
              : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition</span>
          <span className="font-semibold text-gray-800">
            {course.tution_fees ? `AUD ${course.tution_fees}` : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Hostel</span>
          <span className="font-semibold text-gray-800">
            {course.hostel_fees ? `AUD ${course.hostel_fees}` : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">One Time</span>
          <span className="font-semibold text-gray-800">
            {course.one_time_fees ? `AUD ${course.one_time_fees}` : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Other</span>
          <span className="font-semibold text-gray-800">
            {course.other_fees ? `AUD ${course.other_fees}` : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
