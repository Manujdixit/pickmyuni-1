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
  setSelectedStream?: (streamId: string | null, streamName: string) => void;
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
  setSelectedStream,
  setUniversityData,
  onDelete,
  canDelete = false,
}: UniversityBoxProps) {
  const { streams, loading } = useOnlyCollegeIdCompare(
    selectedCollegeId || null,
  );
  const [selectedStreamLocal, setSelectedStreamLocal] = useState<string | null>(
    selectedStreamId || null,
  );

  // Fetch college+course comparison when both are selected
  const {
    data: collegeCourseData,
    loading: courseCompareLoading,
    error: courseCompareError,
  } = useCollegeCourseCompare(
    selectedCollegeId || null,
    selectedStreamLocal || null,
  );

  useEffect(() => {
    if (collegeCourseData) {
      setUniversityData(collegeCourseData);
    }
  }, [collegeCourseData]);

  useEffect(() => {
    // Reset stream when university changes, but preserve if selectedStreamId is provided
    if (!selectedStreamId) {
      setSelectedStreamLocal(null);
      if (setSelectedStream) {
        setSelectedStream(null, "");
      }
    }
  }, [selectedCollegeId, streams]); // Remove setSelectedStream from dependencies

  // Update local state when prop changes
  useEffect(() => {
    setSelectedStreamLocal(selectedStreamId || null);
  }, [selectedStreamId]);

  // Set stream when streams are loaded and selectedStreamId is available
  useEffect(() => {
    if (selectedStreamId && streams.length > 0 && setSelectedStream) {
      const selectedStreamObj = streams.find(
        (stream) => String(stream.id) === selectedStreamId,
      );
      if (
        selectedStreamObj &&
        selectedStreamObj.course_name !== selectedStreamName
      ) {
        setSelectedStream(selectedStreamId, selectedStreamObj.course_name);
      }
    }
  }, [streams, selectedStreamId, selectedStreamName, setSelectedStream]);

  const handleStreamChange = (value: string) => {
    setSelectedStreamLocal(value);
    if (setSelectedStream) {
      const selectedStreamObj = streams.find(
        (stream) => String(stream.id) === value,
      );
      setSelectedStream(value, selectedStreamObj?.course_name || "");
    }
  };

  return (
    <div
      className={`relative space-y-4 rounded bg-white p-4 shadow-md hover:shadow-lg`}
      style={{ paddingTop: canDelete && onDelete ? "1.5rem" : "1rem" }}
    >
      {canDelete && onDelete && (
        <button
          onClick={onDelete}
          className="absolute right-1 top-1 z-50 flex h-6 w-6 items-center justify-center text-black transition-colors hover:text-red-500"
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
        onValueChange={handleStreamChange}
        value={selectedStreamLocal || ""}
      >
        <SelectTrigger className="h-12 w-full">
          <SelectValue
            placeholder={
              loading
                ? "Loading courses..."
                : !streams.length && selectedCollegeId
                  ? "N/A"
                  : "Select Course"
            }
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
