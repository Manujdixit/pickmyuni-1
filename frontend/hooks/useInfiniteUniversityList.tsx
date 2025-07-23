"use client";
import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface University {
  id: number;
  college_name: string;
  location: string;
  rating?: number;
  score?: number;
  slug: string;
  avg_fees_in_aud: number;
  [key: string]: any; // For any additional properties
}

export function useInfiniteUniversityList(initialParams: any = {}) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filters, setFilters] = useState({
    stream: [],
    city: [],
    state: [],
    courses: [],
    type: [],
    content: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const fetchUniversities = useCallback(
    async (queryParams: any, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        // Build query string
        const searchParams = new URLSearchParams();

        if (queryParams.searchquery)
          searchParams.append("searchquery", queryParams.searchquery);
        if (queryParams.page)
          searchParams.append("page", queryParams.page.toString());
        if (queryParams.limit)
          searchParams.append("limit", queryParams.limit.toString());
        if (queryParams.statename)
          searchParams.append("statename", queryParams.statename);
        if (queryParams.coursename)
          searchParams.append("coursename", queryParams.coursename);
        if (queryParams.streamname)
          searchParams.append("streamname", queryParams.streamname);
        if (queryParams.type) searchParams.append("type", queryParams.type);
        if (queryParams.level) searchParams.append("level", queryParams.level);
        if (queryParams.min_fees)
          searchParams.append("min_fees", queryParams.min_fees.toString());
        if (queryParams.max_fees)
          searchParams.append("max_fees", queryParams.max_fees.toString());
        if (queryParams.sortBy)
          searchParams.append("sortBy", queryParams.sortBy);

        const response = await fetch(
          `${API_BASE_URL}/api/v1/college/list?${searchParams.toString()}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.success) {
          const newUniversities = data.data.colleges;
          const newPagination = {
            ...data.data.pagination,
            hasNextPage:
              data.data.pagination.currentPage <
              data.data.pagination.totalPages,
          };

          if (isLoadMore) {
            // Append new universities to existing list
            setUniversities((prev) => [...prev, ...newUniversities]);
          } else {
            // Replace universities list
            setUniversities(newUniversities);
          }

          setFilters(data.data.filters);
          setPagination(newPagination);
        } else {
          throw new Error("Failed to fetch universities");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching universities";
        setError(errorMessage);
        console.error("Error fetching universities:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  // Fetch data when params change (except for page changes during infinite scroll)
  useEffect(() => {
    fetchUniversities(params, false);
  }, [params, fetchUniversities]);

  // Load next page for infinite scroll
  const loadNextPage = useCallback(() => {
    if (pagination.hasNextPage && !loadingMore) {
      const nextPage = pagination.currentPage + 1;
      const nextParams = { ...params, page: nextPage };
      fetchUniversities(nextParams, true);
      setPagination((prev) => ({ ...prev, currentPage: nextPage }));
    }
  }, [
    params,
    pagination.hasNextPage,
    pagination.currentPage,
    loadingMore,
    fetchUniversities,
  ]);

  // Update search query
  const updateSearch = useCallback((searchquery: string) => {
    setParams((prev: any) => ({
      ...prev,
      searchquery,
      page: 1, // Reset to first page when searching
    }));
    // Reset universities list when searching
    setUniversities([]);
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: any) => {
    setParams((prev: any) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filtering
    }));
    // Reset universities list when filtering
    setUniversities([]);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
    });
    // Reset universities list when clearing filters
    setUniversities([]);
  }, []);

  // Update sorting
  const updateSorting = useCallback((sortBy: string) => {
    setParams((prev: any) => ({
      ...prev,
      sortBy,
      page: 1, // Reset to first page when sorting
    }));
    // Reset universities list when sorting
    setUniversities([]);
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    setUniversities([]);
    fetchUniversities({ ...params, page: 1 }, false);
  }, [params, fetchUniversities]);

  return {
    universities,
    filters,
    pagination,
    loading,
    loadingMore,
    error,
    params,
    updateSearch,
    updateFilters,
    updateSorting,
    clearFilters,
    loadNextPage,
    refresh,
  };
}
