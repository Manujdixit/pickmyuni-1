import { useState, useEffect } from "react";

export interface College {
  id: string;
  logo_url: string;
  college_name: string;
  slug: string;
  bg_url: string;
}

interface UseTopCollegesByTypeResult {
  colleges: College[];
  loading: boolean;
  error: string | null;
}

export function useTopCollegesByType(
  type?: string,
): UseTopCollegesByTypeResult {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = type ? `?type=${encodeURIComponent(type)}` : "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/top-type${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch colleges");
        return res.json();
      })
      .then((data) => {
        setColleges(data?.data?.colleges || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [type]);

  return { colleges, loading, error };
}
