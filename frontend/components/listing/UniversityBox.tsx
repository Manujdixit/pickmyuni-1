"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnlyCollegeIdCompare } from "@/hooks/useOnlyCollegeIdCompare";
import { useCollegeCourseCompare } from "@/hooks/useCollegeCourseCompare";
import { X, ChevronDown } from "lucide-react";

import CollegeSearchInput from "../compare/CollegeSearchInput";
import CourseDialogContent from "../compare/CourseDialogContent";
import { useEffect, useState } from "react";

export type UniversityBoxProps = {
  id?: number;
  selectedCollegeId?: string | null;
  selectedCollegeName?: string;
  setSelectedCollege?: (collegeId: string | null, collegeName: string) => void;
  selectedCourseId?: string | null;
  selectedCourseName?: string;
  setSelectedCourse?: (courseId: string | null, courseName: string) => void;
  setUniversityData: (data: any) => void;
  onDelete?: () => void;
  canDelete?: boolean;
};

export default function UniversityBox({
  selectedCollegeId,
  selectedCollegeName,
  setSelectedCollege,
  selectedCourseId,
  selectedCourseName,
  setSelectedCourse,
  setUniversityData,
  onDelete,
  canDelete = false,
}: UniversityBoxProps) {
  const { college, courses, loading } = useOnlyCollegeIdCompare(
    selectedCollegeId || null,
  );
  const [selectedCourseLocal, setSelectedCourseLocal] = useState<string | null>(
    selectedCourseId || null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for course selection
  const handleCourseChange = (courseId: string, courseName: string) => {
    setSelectedCourseLocal(courseId);
    if (setSelectedCourse) {
      setSelectedCourse(courseId, courseName);
    }
  };

  // Get the selected course name for display
  const getSelectedCourseName = () => {
    if (selectedCourseName) return selectedCourseName;

    const courseIdToCheck = selectedCourseLocal || selectedCourseId;
    if (courseIdToCheck && courses.length > 0) {
      const courseObj = courses.find(
        (c: any) => String(c.id) === String(courseIdToCheck),
      );
      return courseObj?.name || courseObj?.course_name || "";
    }
    return "";
  };

  // Fetch college+course comparison when both are selected
  const {
    data: collegeCourseData,
    loading: courseCompareLoading,
    error: courseCompareError,
  } = useCollegeCourseCompare(
    selectedCollegeId || null,
    selectedCourseLocal || null,
  );

  useEffect(() => {
    if (collegeCourseData) {
      setUniversityData(collegeCourseData);
    }
  }, [collegeCourseData]);

  useEffect(() => {
    if (college) {
      setUniversityData(college);
    }
  }, [college]);

  useEffect(() => {
    // Sync local course selection with prop
    if (selectedCourseId !== selectedCourseLocal) {
      setSelectedCourseLocal(selectedCourseId || null);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    // Reset course when university changes, but preserve if selectedCourseId is provided
    if (!selectedCourseId) {
      setSelectedCourseLocal(null);
      if (setSelectedCourse) {
        setSelectedCourse(null, "");
      }
    }
  }, [selectedCollegeId]); // Only depend on selectedCollegeId, not courses
  return (
    <div
      className={`relative px-1`}
      style={{ paddingTop: canDelete && onDelete ? "1.5rem" : "1rem" }}
    >
      {/* {canDelete && onDelete && (
        <button
          aria-label="close"
          onClick={onDelete}
          className="absolute right-1 top-1 z-50 flex h-6 w-6 items-center justify-center text-black transition-colors hover:text-red-500"
        >
          <X className="h-3 w-3" />
        </button>
      )} */}
      <CollegeSearchInput
        value={selectedCollegeName || ""}
        onChange={(name: string, collegeId?: string) => {
          if (setSelectedCollege) setSelectedCollege(collegeId || null, name);
        }}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-full justify-between text-left font-normal"
            disabled={loading || (!courses.length && !!selectedCollegeId)}
            style={{ backgroundColor: "white" }}
          >
            <span className="line-clamp-1">
              {loading
                ? "Loading courses..."
                : (selectedCourseLocal || selectedCourseId) &&
                    getSelectedCourseName()
                  ? getSelectedCourseName()
                  : !courses.length && selectedCollegeId
                    ? "N/A"
                    : "Select Course"}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Course</DialogTitle>
          </DialogHeader>
          <CourseDialogContent
            courses={courses}
            onSelect={handleCourseChange}
            selected={selectedCourseLocal || selectedCourseId || null}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
