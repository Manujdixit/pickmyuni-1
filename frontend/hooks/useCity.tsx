"use client";

import { useState, useEffect } from "react";
// import axios from "axios";

export const useCity = (id: number) => {
  const [city, setCity] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/city/${id}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCity(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setCity({});
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [id]);

  return { city, loading, error };
};
