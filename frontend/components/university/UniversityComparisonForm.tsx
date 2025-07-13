"use client";

import { Button } from "@/components/ui/button";
import { Clock, Plus, University } from "lucide-react";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import UniversityBox from "./UniversityBox";
import UniComapareCrad from "./UniComapareCrad";

export default function UniversityComparisonForm() {
  const [show, setshow] = useState(false);
  // Each university: { id: number, collegeId: string|null, collegeName: string|null }
  type University = {
    id: number;
    collegeId: string | null;
    collegeName: string;
    streamId: string | null;
    streamName: string | null;
    data: any | null;
  };

  const [universities, setUniversities] = useState<University[]>([
    {
      id: 1,
      collegeId: null,
      collegeName: "",
      streamId: null,
      streamName: "",
      data: null,
    },
    {
      id: 2,
      collegeId: null,
      collegeName: "",
      streamId: null,
      streamName: "",
      data: null,
    },
  ]);

  const addUniversity = () => {
    if (universities.length < 4) {
      setUniversities([
        ...universities,
        {
          id: Date.now(),
          collegeId: null,
          collegeName: "",
          streamId: null,
          streamName: "",
          data: null,
        },
      ]);
    }
  };

  const setSelectedUniversity = (
    index: number,
    collegeId: string | null,
    collegeName: string,
  ) => {
    setUniversities((prev) =>
      prev.map((uni, i) =>
        i === index ? { ...uni, collegeId, collegeName } : uni,
      ),
    );
  };

  const setUniversityData = (index: number, data: any) => {
    setUniversities((prev) =>
      prev.map((uni, i) => (i === index ? { ...uni, data } : uni)),
    );
  };

  const deleteUniversity = (id: number) => {
    if (universities.length > 2) {
      setUniversities((prev) => prev.filter((uni) => uni.id !== id));
    }
  };

  useEffect(() => {
    console.log("University comparison form rendered", { universities });
  }, [universities]);

  const add = () => {
    addUniversity();
    setshow(false);
  };

  return (
    <div className="mb-16 p-4">
      {/* Action Buttons */}
      <div className="mb-6 flex flex-col justify-end gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="h-12 px-6"
          onClick={add}
          disabled={universities.length >= 4}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Up To 2 More Uni
        </Button>
        <Button onClick={() => setshow(true)} className="h-12 px-8">
          Compare Now
        </Button>
      </div>

      {/* Single scroll container for all content */}
      <div className="overflow-x-auto">
        <div
          style={{
            minWidth: `${universities.length * 280}px`,
          }}
        >
          {/* University Selection */}
          <div
            className={`mb-6 grid gap-4`}
            style={{
              gridTemplateColumns: `repeat(${universities.length}, minmax(280px, 1fr))`,
            }}
          >
            {universities.map((uni, idx) => (
              <UniversityBox
                key={uni.id}
                id={uni.id}
                selectedCollegeId={uni.collegeId}
                selectedCollegeName={uni.collegeName}
                setSelectedCollege={(
                  collegeId: string | null,
                  collegeName: string,
                ) => setSelectedUniversity(idx, collegeId, collegeName)}
                setUniversityData={(data: any) => setUniversityData(idx, data)}
                onDelete={() => deleteUniversity(uni.id)}
                canDelete={universities.length > 2}
              />
            ))}
          </div>

          {/* Comparison Content */}
          {/* Institution Info */}
          {show && (
            <div>
              <div className="mb-4 rounded bg-gray-300 px-4 py-3 text-center text-lg font-bold">
                Institution Info
              </div>
              <div
                className={`mb-8 grid gap-4`}
                style={{
                  gridTemplateColumns: `repeat(${universities.length}, minmax(280px, 1fr))`,
                }}
              >
                {universities.map((uni) =>
                  uni.collegeId ? (
                    <UniComapareCrad key={uni.id} uni={uni} />
                  ) : (
                    <div className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-gray-400">
                      <University className="mb-2 h-8 w-8 text-gray-300" />
                      <span className="font-medium">No College available</span>
                    </div>
                  ),
                )}
              </div>

              {/* Course Info */}
              <div className="mb-4 rounded bg-gray-300 px-4 py-3 text-center text-lg font-bold">
                Course Info
              </div>
              <div
                className={`mb-8 grid gap-4`}
                style={{
                  gridTemplateColumns: `repeat(${universities.length}, minmax(280px, 1fr))`,
                }}
              >
                {universities.map((uni) => {
                  const courses = uni.data?.college?.CollegesCourses || [];
                  return (
                    <div
                      key={uni.id}
                      className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex max-h-[400px] flex-col gap-4 overflow-y-auto"
                      style={{ scrollbarGutter: "stable" }}
                    >
                      {courses.length > 0 ? (
                        <div className="grid gap-4">
                          {courses.map((course: any, idx: number) => (
                            <CourseCard
                              key={course.id || idx}
                              course={course}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-gray-400">
                          <Clock className="mb-2 h-8 w-8 text-gray-300" />
                          <span className="font-medium">
                            No courses available
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
