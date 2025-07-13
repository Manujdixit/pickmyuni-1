"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Stream = {
  id: number;
  course_name: string;
};

export const useOnlyCollegeIdCompare = (collegeId: string | null) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collegeId) {
      setStreams([]);
      return;
    }

    const fetchStreams = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/compare?college_id=${collegeId}`,
        );
        if (response.data.success) {
          setStreams(response.data.data.streams);
        } else {
          setError("Failed to fetch streams");
        }
      } catch (err) {
        setError("An error occurred while fetching streams");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, [collegeId]);

  return { streams, loading, error };
};
