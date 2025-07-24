import { useState, useEffect } from "react";
// import axios from "axios";

export const useUniversities = (stream: string = "All") => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/top`;
        let url = endpoint;
        if (stream !== "All") {
          const params = new URLSearchParams({ stream });
          url += `?${params.toString()}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUniversities(data.data.colleges);
        setStreams(data.data.streams);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [stream]);

  return { universities, streams, loading, error };
};
