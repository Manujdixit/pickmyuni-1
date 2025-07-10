import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Article } from "@/types/search";

interface PaginationInfo {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function useLatestArticles(selectedSilo: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [silos, setSilos] = useState<string[]>([]);

  const fetchArticles = useCallback(
    async (page: number = 1, limit: number = 6, append: boolean = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/new?page=${page}&limit=${limit}&silos=${selectedSilo}`,
        );

        const { articles: newArticles, pagination: paginationData } =
          response.data.data;

        if (append) {
          setArticles((prev) => [...prev, ...newArticles]);
        } else {
          setArticles(newArticles);
          setSilos(response.data.data.allSilos);
        }

        setPagination(paginationData);
        setHasMore(
          parseInt(paginationData.currentPage) < paginationData.totalPages,
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedSilo],
  );

  const loadMore = useCallback(() => {
    if (pagination && hasMore && !loadingMore) {
      const nextPage = parseInt(pagination.currentPage) + 1;
      fetchArticles(nextPage, pagination.itemsPerPage, true);
    }
  }, [pagination, hasMore, loadingMore, fetchArticles]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    loadingMore,
    error,
    pagination,
    hasMore,
    loadMore,
    silos,
  };
}
