import { useState, useCallback } from "react";
// import axios from "axios";
import { SearchResults } from "@/types/search";

export const useComprehensiveSearch = () => {
  const [results, setResults] = useState<SearchResults>({
    colleges: [],
    courses: [],
    articles: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const search = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${apiUrl}/api/v1/search?q=${encodeURIComponent(query)}`,
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        } else {
          setResults({ colleges: [], courses: [], articles: [] });
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search");
        setResults({ colleges: [], courses: [], articles: [] });
      } finally {
        setLoading(false);
      }
    },
    [apiUrl],
  );

  const getTotalResults = () => {
    return (
      results.colleges.length + results.courses.length + results.articles.length
    );
  };

  return { results, loading, error, search, getTotalResults };
};
