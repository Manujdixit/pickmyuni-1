"use client";

import { Button } from "@/components/ui/button";
import { Clock, Plus, University } from "lucide-react";

import { useEffect, useState, useCallback, useRef } from "react";
import CourseCard from "./CourseCard";
import UniversityBox from "./UniversityBox";
import UniComapareCrad from "./UniComapareCrad";
import { useRouter, useSearchParams } from "next/navigation";

export default function UniversityComparisonForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [show, setshow] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  const setUniversityData = useCallback((index: number, data: any) => {
    setUniversities((prev) =>
      prev.map((uni, i) => (i === index ? { ...uni, data } : uni)),
    );
  }, []);

  const updateURL = useCallback(() => {
    // Clear any existing timeout
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current);
    }

    // Debounce URL updates to avoid excessive calls
    urlUpdateTimeoutRef.current = setTimeout(() => {
      const params = universities
        .filter((uni) => uni.collegeId && uni.streamId)
        .map(
          (uni, idx) =>
            `college${idx + 1}=${encodeURIComponent(uni.collegeId!)}&stream${idx + 1}=${encodeURIComponent(uni.streamId!)}`,
        )
        .join("&");
      const url = `/compare${params ? `?${params}` : ""}`;
      console.log("Updating URL", { url });
      router.push(url, { scroll: false });
    }, 500); // 500ms debounce
  }, [universities, router]);

  const setSelectedUniversity = useCallback(
    (index: number, collegeId: string | null, collegeName: string) => {
      setUniversities((prev) =>
        prev.map((uni, i) =>
          i === index ? { ...uni, collegeId, collegeName } : uni,
        ),
      );
    },
    [],
  );

  const setSelectedStream = useCallback(
    (index: number, streamId: string | null, streamName: string) => {
      setUniversities((prev) =>
        prev.map((uni, i) =>
          i === index ? { ...uni, streamId, streamName } : uni,
        ),
      );
    },
    [],
  );

  // Effect to update URL when universities change (with debounce)
  useEffect(() => {
    if (isInitialized) {
      updateURL();
    }
  }, [universities, isInitialized, updateURL]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (urlUpdateTimeoutRef.current) {
        clearTimeout(urlUpdateTimeoutRef.current);
      }
    };
  }, []);

  // Initialize state from URL parameters
  useEffect(() => {
    if (!isInitialized) {
      const initialUniversities: University[] = [];
      let hasUrlParams = false;

      // Parse URL parameters
      for (let i = 1; i <= 4; i++) {
        const collegeId = searchParams.get(`college${i}`);
        const streamId = searchParams.get(`stream${i}`);

        if (collegeId || streamId) {
          hasUrlParams = true;
          initialUniversities.push({
            id: i,
            collegeId: collegeId || null,
            collegeName: "", // Will be populated when university data loads
            streamId: streamId || null,
            streamName: "", // Will be populated when university data loads
            data: null,
          });
        }
      }

      // Only update universities state if we found URL parameters
      if (hasUrlParams) {
        // Ensure at least 2 universities
        while (initialUniversities.length < 2) {
          initialUniversities.push({
            id: initialUniversities.length + 1,
            collegeId: null,
            collegeName: "",
            streamId: null,
            streamName: "",
            data: null,
          });
        }
        setUniversities(initialUniversities);
        setshow(true); // Show comparison when loaded from URL

        // Fetch college names for URL parameters
        initialUniversities.forEach(async (uni, index) => {
          if (uni.collegeId) {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/compare?college_id=${uni.collegeId}`,
              );
              const data = await response.json();
              if (data.success && data.data.college) {
                const collegeName = data.data.college.college_name;
                const streams = data.data.streams || [];

                // Find stream name if streamId exists
                let streamName = "";
                if (uni.streamId && streams.length > 0) {
                  const stream = streams.find(
                    (s: any) => String(s.id) === uni.streamId,
                  );
                  streamName = stream ? stream.course_name : "";
                }

                // Update the university with fetched data
                setUniversities((prev) =>
                  prev.map((u, i) =>
                    i === index
                      ? {
                          ...u,
                          collegeName,
                          streamName,
                        }
                      : u,
                  ),
                );
              }
            } catch (error) {
              console.error("Error fetching college data:", error);
            }
          }
        });
      }

      setIsInitialized(true);
    }
  }, [isInitialized]); // Remove searchParams from dependencies to prevent infinite loop

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
        {universities.length < 4 && (
          <Button
            variant="outline"
            className="h-12 px-6"
            onClick={add}
            disabled={universities.length >= 4}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add upto {4 - universities.length} universities
          </Button>
        )}
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
                selectedStreamId={uni.streamId}
                selectedStreamName={uni.streamName || undefined}
                setSelectedCollege={(
                  collegeId: string | null,
                  collegeName: string,
                ) => setSelectedUniversity(idx, collegeId, collegeName)}
                setSelectedStream={(
                  streamId: string | null,
                  streamName: string,
                ) => setSelectedStream(idx, streamId, streamName)}
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
                    <div
                      className="flex h-full min-h-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-gray-400"
                      key={uni.id}
                    >
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
                      className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex max-h-[300px] flex-col gap-4 overflow-y-auto"
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
