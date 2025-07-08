import {
  Calendar,
  Earth,
  LibraryBig,
  MapPinned,
  UserRoundCheck,
  Users,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface College {
  location?: string;
  founded?: number;
  type?: string;
  enrollment?: number;
  website?: string;
  acceptance_rate?: number;
  total_students?: number;
  international_student_rate?: number;
  address?: string;
  _count?: any;
}

function QuickFacts({ college }: { college: College }) {
  return (
    <div>
      <div className="bg-[#FAF4F0] p-4 sm:p-6 h-fit w-full lg:w-[320px] lg:min-w-[320px] flex flex-col shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold text-brand-primary mb-4 sm:mb-6">
          QUICK FACTS
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Location:</p>
              <p className="font-semibold text-brand-primary text-sm sm:text-base">
                {college?.address || "N/A"}
              </p>
            </div>
          </div>

          {/* Students */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Total Students:
              </p>
              <p className="font-semibold text-brand-primary text-sm sm:text-base">
                {college?.total_students
                  ? college?.total_students + " +"
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* International Students */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Earth className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                International students:
              </p>
              <p className="font-semibold text-brand-primary text-sm sm:text-base">
                {college?.international_student_rate
                  ? college?.international_student_rate + " +"
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Acceptance Rate */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <UserRoundCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Acceptance rate:
              </p>
              <p className="font-semibold text-brand-primary text-sm sm:text-base">
                {college?.acceptance_rate
                  ? "~ " + college?.acceptance_rate + "%"
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Courses Offered */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <LibraryBig className="w-4 h-4 sm:w-5 sm:h-5 text-brand-secondary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Courses offered:
              </p>
              <p className="font-semibold text-brand-primary text-sm sm:text-base">
                {college?._count?.CollegesCourses} across 10 faculties
              </p>
            </div>
          </div>
        </div>

        {/* Semester Dates Button */}
        <Button className=" flex items-center justify-center gap-2 text-sm sm:text-base mt-4">
          <span>Semester Dates</span>
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </div>
  );
}

export default QuickFacts;
