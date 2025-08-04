import { Delete } from "lucide-react";
import Image from "next/image";
import React from "react";

function calculateTotalFees(course: any): number {
  if (!course) return 0;
  return (
    (course.tution_fees ?? 0) +
    (course.one_time_fees ?? 0) +
    (course.hostel_fees ?? 0) +
    (course.other_fees ?? 0)
  );
}

const UniInfoCard: React.FC<any> = ({
  university,
  canDelete = false,
  onDelete,
}) => {
  return (
    <div className="relative flex h-full min-w-[320px] max-w-[340px] flex-col items-center justify-between rounded-2xl border-none bg-white pt-8 shadow">
      {/* Logo in circle above card */}
      <div className="absolute -top-20 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg">
          {university?.data?.college?.logo_url ? (
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={
                  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                    university?.data?.college?.logo_url || "/vercel.svg"
                }
                alt={university?.data?.college?.college_name + " logo"}
                fill
                className="rounded-full object-contain"
              />
            </div>
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200" />
          )}
        </div>
      </div>
      {/* Card content */}
      <div className="mb-2 mt-12 flex flex-col items-center px-4">
        <h2 className="text-brand-primary mb-2 line-clamp-2 text-center text-xl font-bold leading-tight">
          {university?.data?.college?.college_name}
        </h2>
      </div>
      <div className="mb-2 flex w-full flex-row justify-between gap-2 px-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500">COURSE</span>
          <span className="mt-1 line-clamp-2 text-base font-bold text-blue-900">
            {university?.data?.college?.CollegesCourses[0]?.name}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-gray-500">TOTAL COST</span>
          <span className="mt-1 line-clamp-2 text-right text-base font-bold text-orange-500">
            AUD{" "}
            {calculateTotalFees(
              university?.data?.college?.CollegesCourses?.[0],
            ).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="mt-2 w-full">
        <button
          className={`flex w-full items-center justify-center gap-2 rounded-b-2xl border-t border-gray-200 py-2 text-base font-semibold transition-colors duration-300 ${
            canDelete
              ? "bg-red-600 text-white/80 hover:text-white"
              : "cursor-not-allowed bg-[#E6EAED] text-gray-400"
          }`}
          onClick={canDelete ? onDelete : undefined}
          disabled={!canDelete}
        >
          <Delete />
          DELETE
        </button>
      </div>
    </div>
  );
};

export default UniInfoCard;
