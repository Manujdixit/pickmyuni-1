"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnlyCollegeIdCompare } from "@/hooks/useOnlyCollegeIdCompare";
import { useCollegeCourseCompare } from "@/hooks/useCollegeCourseCompare";
import { X } from "lucide-react";

import CollegeSearchInput from "./CollegeSearchInput";
import { useEffect, useState } from "react";

export type UniversityBoxProps = {
  id?: number;
  selectedCollegeId?: string | null;
  selectedCollegeName?: string;
  setSelectedCollege?: (collegeId: string | null, collegeName: string) => void;
  selectedStreamId?: string | null;
  selectedStreamName?: string;
  // setSelectedStream?: (streamId: string | null, streamName: string) => void;
  setUniversityData: (data: any) => void;
  onDelete?: () => void;
  canDelete?: boolean;
};

export default function UniversityBox({
  selectedCollegeId,
  selectedCollegeName,
  setSelectedCollege,
  selectedStreamId,
  selectedStreamName,
  // setSelectedStream,
  setUniversityData,
  onDelete,
  canDelete = false,
}: UniversityBoxProps) {
  const { streams, loading } = useOnlyCollegeIdCompare(
    selectedCollegeId || null,
  );
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  // Fetch college+course comparison when both are selected
  const {
    data: collegeCourseData,
    loading: courseCompareLoading,
    error: courseCompareError,
  } = useCollegeCourseCompare(
    selectedCollegeId || null,
    selectedStream || null,
  );

  useEffect(() => {
    if (collegeCourseData) {
      setUniversityData(collegeCourseData);
    }
  }, [collegeCourseData]);

  useEffect(() => {
    // Reset stream when university changes
    setSelectedStream(null);
  }, [selectedCollegeId, streams]);

  return (
    <div
      className={`relative space-y-4 rounded bg-white p-4 shadow-md hover:shadow-lg`}
      style={{ paddingTop: canDelete && onDelete ? "1.5rem" : "1rem" }}
    >
      {canDelete && onDelete && (
        <button
          onClick={onDelete}
          className="absolute right-2 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full text-red-500 shadow-md transition-colors hover:bg-red-500 hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <CollegeSearchInput
        value={selectedCollegeName || ""}
        onChange={(name: string, collegeId?: string) => {
          if (setSelectedCollege) setSelectedCollege(collegeId || null, name);
        }}
      />
      <Select
        onValueChange={(value) => setSelectedStream(value)}
        value={selectedStream || ""}
      >
        <SelectTrigger className="h-12 w-full">
          <SelectValue
            placeholder={loading ? "Loading courses..." : "Select Course"}
          />
        </SelectTrigger>
        <SelectContent>
          {streams.map((stream) => (
            <SelectItem key={stream.id} value={String(stream.id)}>
              {stream.course_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
