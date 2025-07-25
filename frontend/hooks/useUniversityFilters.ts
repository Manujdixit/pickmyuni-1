"use client";
import { useCallback } from "react";
import { NextRouter } from "next/router";
import { buildUniversitySlug } from "@/utils/slug";
import { LocalFilters } from "./useUniversityPageState";

interface UseUniversityFiltersProps {
  router: any; // Next.js router
  params: any; // Current URL parameters
  localFilters: LocalFilters;
  setLocalFilters: (
    filters: LocalFilters | ((prev: LocalFilters) => LocalFilters),
  ) => void;
  updateSearch: (searchTerm: string) => void;
  updateFilters: (filters: Record<string, any>) => void;
  updateSorting: (sortBy: string) => void;
  clearFilters: () => void;
}

export const useUniversityFilters = ({
  router,
  params,
  localFilters,
  setLocalFilters,
  updateSearch,
  updateFilters,
  updateSorting,
  clearFilters,
}: UseUniversityFiltersProps) => {
  // Function to update URL based on current filters
  const updateURL = useCallback(
    (newFilters: any) => {
      const urlFilters: Record<string, any> = {};

      // Only include filters that have explicit values (not undefined)
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] !== undefined) {
          urlFilters[key] = newFilters[key];
        }
      });

      // Add current params that aren't being updated
      Object.keys(params || {}).forEach((key) => {
        if (
          !(key in newFilters) &&
          params[key] !== undefined &&
          params[key] !== ""
        ) {
          urlFilters[key] = params[key];
        }
      });

      // Remove empty values
      Object.keys(urlFilters).forEach((key) => {
        if (urlFilters[key] === undefined || urlFilters[key] === "") {
          delete urlFilters[key];
        }
      });

      const newSlug = buildUniversitySlug(urlFilters);
      router.replace(newSlug, { scroll: false });
    },
    [router, params],
  );

  // Handle sort changes and map to API parameters
  const handleSortChange = useCallback(
    (newSortBy: string) => {
      let apiSortBy = "score_desc"; // default
      switch (newSortBy) {
        case "Top Rated First":
          apiSortBy = "rating_desc";
          break;
        case "Top Scored First":
          apiSortBy = "score_desc";
          break;
        case "Lowest Rated First":
          apiSortBy = "rating_asc";
          break;
        case "Lowest Scored First":
          apiSortBy = "score_asc";
          break;
      }

      updateSorting(apiSortBy);
    },
    [updateSorting],
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setLocalFilters({
      course: "All Courses",
      location: "All Locations",
      feesRange: "All Fees",
      exams: "All Exams",
      search: "",
      stream: "All Streams",
      state: "All States",
      type: "All Types",
      level: "All Levels",
    });
    clearFilters();
    router.replace("/top-universities-in-australia", { scroll: false });
  }, [setLocalFilters, clearFilters, router]);

  // Clear individual filter
  const clearIndividualFilter = useCallback(
    (filterType: string) => {
      const filterUpdates: Record<string, any> = {};

      switch (filterType) {
        case "search":
          setLocalFilters((prev) => ({ ...prev, search: "" }));
          updateSearch("");
          filterUpdates.searchquery = undefined;
          break;
        case "state":
          setLocalFilters((prev) => ({ ...prev, state: "All States" }));
          updateFilters({ statename: undefined });
          filterUpdates.statename = undefined;
          break;
        case "course":
          setLocalFilters((prev) => ({ ...prev, course: "All Courses" }));
          updateFilters({ coursename: undefined });
          filterUpdates.coursename = undefined;
          break;
        case "stream":
          setLocalFilters((prev) => ({ ...prev, stream: "All Streams" }));
          updateFilters({ streamname: undefined });
          filterUpdates.streamname = undefined;
          break;
        case "fees":
          setLocalFilters((prev) => ({ ...prev, feesRange: "All Fees" }));
          updateFilters({ min_fees: undefined, max_fees: undefined });
          filterUpdates.min_fees = undefined;
          filterUpdates.max_fees = undefined;
          break;
        case "type":
          setLocalFilters((prev) => ({ ...prev, type: "All Types" }));
          updateFilters({ type: undefined });
          filterUpdates.type = undefined;
          break;
        case "level":
          setLocalFilters((prev) => ({ ...prev, level: "All Levels" }));
          updateFilters({ level: undefined });
          filterUpdates.level = undefined;
          break;
      }

      setTimeout(() => updateURL(filterUpdates), 0);
    },
    [setLocalFilters, updateSearch, updateFilters, updateURL],
  );

  // Handle search
  const handleSearch = useCallback(
    (searchTerm: string) => {
      setLocalFilters((prev) => ({ ...prev, search: searchTerm }));
      updateSearch(searchTerm);
      const searchQuery = searchTerm.trim() !== "" ? searchTerm : undefined;
      setTimeout(() => updateURL({ searchquery: searchQuery }), 0);
    },
    [setLocalFilters, updateSearch, updateURL],
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterType: string, value: string | number) => {
      const filterUpdates: Record<string, any> = {};

      switch (filterType) {
        case "state":
          const stateName =
            typeof value === "string" && value !== "" ? value : undefined;
          updateFilters({ statename: stateName });
          filterUpdates.statename = stateName;
          break;
        case "course":
          const courseName =
            typeof value === "string" && value !== "" ? value : undefined;
          updateFilters({ coursename: courseName });
          filterUpdates.coursename = courseName;
          break;
        case "stream":
          const streamName =
            typeof value === "string" && value !== "" ? value : undefined;
          updateFilters({ streamname: streamName });
          filterUpdates.streamname = streamName;
          break;
        case "min_fees":
          const minFees = typeof value === "number" ? value : undefined;
          updateFilters({ min_fees: minFees });
          filterUpdates.min_fees = minFees;
          if (params?.max_fees) {
            filterUpdates.max_fees = params.max_fees;
          }
          break;
        case "max_fees":
          const maxFees = typeof value === "number" ? value : undefined;
          updateFilters({ max_fees: maxFees });
          filterUpdates.max_fees = maxFees;
          if (params?.min_fees) {
            filterUpdates.min_fees = params.min_fees;
          }
          break;
        case "type":
          const typeName =
            typeof value === "string" && value !== "" ? value : undefined;
          updateFilters({ type: typeName });
          filterUpdates.type = typeName;
          break;
        case "level":
          const levelName =
            typeof value === "string" && value !== "" ? value : undefined;
          updateFilters({ level: levelName });
          filterUpdates.level = levelName;
          break;
      }

      setTimeout(() => updateURL(filterUpdates), 0);
    },
    [updateFilters, updateURL, params],
  );

  // Handle fee range changes (both min and max together)
  const handleFeeRangeChange = useCallback(
    (minFees?: number, maxFees?: number) => {
      updateFilters({
        min_fees: minFees,
        max_fees: maxFees,
      });

      const filterUpdates: Record<string, any> = {
        min_fees: minFees,
        max_fees: maxFees,
      };

      setTimeout(() => updateURL(filterUpdates), 0);
    },
    [updateFilters, updateURL],
  );

  return {
    handleSortChange,
    clearAllFilters,
    clearIndividualFilter,
    handleSearch,
    handleFilterChange,
    handleFeeRangeChange,
  };
};
