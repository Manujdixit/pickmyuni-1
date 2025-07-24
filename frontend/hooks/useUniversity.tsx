"use client";

import { useState, useEffect } from "react";
// import axios from "axios";

export const useUniversity = (id: number) => {
  const [college, setCollege] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/${id}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCollege(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setCollege({});
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  return { college, loading, error };
};
