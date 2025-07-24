"use client";

import { useState, useEffect } from "react";
// import axios from "axios";

export const useArticle = (id: number) => {
  const [article, setArticle] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${id}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setArticle(data.data.article);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setArticle({});
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  return { article, loading, error };
};
