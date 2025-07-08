"use client";
import React, { useState, useEffect } from "react";
import { useInfiniteUniversityList } from "@/hooks/useInfiniteUniversityList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import {
  UniversityCard,
  UniversityHero,
  UniversityListHeader,
} from "@/components/university";
import { UniversityCardSkeleton } from "@/components/skeleton/university-skeleton";
import { EnhancedFilterSection } from "@/components/university/EnhancedFilterSection";
import { InfiniteScrollLoader } from "@/components/ui/InfiniteScrollLoader";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { BreadcrumbSchema } from "@/components/seo";
import { commonBreadcrumbs } from "@/lib/breadcrumbs";
import { useParams, useRouter } from "next/navigation";
import { parseSlugToFilters, buildUniversitySlug } from "@/utils/slug";

function UniversityPage() {
  // Get slug from URL params
  const paramsRoute = useParams();
  const router = useRouter();

  // Extract slug from either 'slug' or 'slugAndId' parameter
  const rawSlug = paramsRoute?.slug || paramsRoute?.slugAndId || "";
  const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;

  const initialParams = parseSlugToFilters(slug);

  // Clean up initialParams to remove empty values
  const cleanInitialParams = Object.fromEntries(
    Object.entries(initialParams).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  const {
    universities,
    filters: availableFilters,
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
  } = useInfiniteUniversityList(cleanInitialParams);

  // Setup infinite scroll
  const { loadingRef } = useInfiniteScroll({
    hasNextPage: pagination.hasNextPage,
    isFetchingNextPage: loadingMore,
    fetchNextPage: loadNextPage,
  });

  const [localFilters, setLocalFilters] = useState({
    course: "All Courses",
    location: "All Locations",
    feesRange: "All Fees",
    exams: "All Exams",
    search: "",
    stream: "All Streams",
    state: "All States",
  });

  // Sync local filters with applied filters from URL/slug
  useEffect(() => {
    if (params) {
      setLocalFilters((prev) => ({
        ...prev,
        search: params.searchquery || "",
        course: params.coursename || "All Courses",
        state: params.statename || "All States",
        stream: params.streamname || "All Streams",
        feesRange:
          params.min_fees || params.max_fees
            ? `${params.min_fees || 0} - ${params.max_fees || "∞"}`
            : "All Fees",
      }));
    }
  }, [params]);

  // Get current applied filters from the hook
  const currentFilters = {
    searchquery: params?.searchquery || "",
    statename: params?.statename || "",
    coursename: params?.coursename || "",
    streamname: params?.streamname || "",
    min_fees: params?.min_fees,
    max_fees: params?.max_fees,
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Top Rated First");

  // Function to update URL based on current filters
  const updateURL = (newFilters: any) => {
    const urlFilters: Record<string, any> = {};

    // Only include filters that have explicit values (not undefined)
    // If a filter is explicitly set to undefined, it means we want to clear it
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
  };

  // Handle sort changes and map to API parameters
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);

    // Map frontend sort options to backend parameters
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
  };

  // Clear all filters
  const clearAllFilters = () => {
    setLocalFilters({
      course: "All Courses",
      location: "All Locations",
      feesRange: "All Fees",
      exams: "All Exams",
      search: "",
      stream: "All Streams",
      state: "All States",
    });
    clearFilters();
    // Navigate to base URL when clearing all filters
    router.replace("/university/universities", { scroll: false });
  };

  // Clear individual filter
  const clearIndividualFilter = (filterType: string) => {
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
    }

    // Update URL after clearing filter
    setTimeout(() => updateURL(filterUpdates), 0);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setLocalFilters((prev) => ({ ...prev, search: searchTerm }));
    updateSearch(searchTerm);
    // Update URL with search (undefined if empty)
    const searchQuery = searchTerm.trim() !== "" ? searchTerm : undefined;
    setTimeout(() => updateURL({ searchquery: searchQuery }), 0);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string | number) => {
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
        // Include max_fees in URL update if it exists
        if (params?.max_fees) {
          filterUpdates.max_fees = params.max_fees;
        }
        break;
      case "max_fees":
        const maxFees = typeof value === "number" ? value : undefined;
        updateFilters({ max_fees: maxFees });
        filterUpdates.max_fees = maxFees;
        // Include min_fees in URL update if it exists
        if (params?.min_fees) {
          filterUpdates.min_fees = params.min_fees;
        }
        break;
    }

    // Update URL after filter change
    setTimeout(() => updateURL(filterUpdates), 0);
  };

  // Handle fee range changes (both min and max together)
  const handleFeeRangeChange = (minFees?: number, maxFees?: number) => {
    updateFilters({
      min_fees: minFees,
      max_fees: maxFees,
    });

    const filterUpdates: Record<string, any> = {
      min_fees: minFees,
      max_fees: maxFees,
    };

    // Update URL after fee range change
    setTimeout(() => updateURL(filterUpdates), 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema items={commonBreadcrumbs.university()} />

      {/* Hero Section */}
      <UniversityHero />

      {/* Main Content */}
      <div className="container mx-auto py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Section */}
          <EnhancedFilterSection
            filters={localFilters}
            setFilters={setLocalFilters}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            availableFilters={availableFilters}
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearIndividualFilter={clearIndividualFilter}
            onFeeRangeChange={handleFeeRangeChange}
            onClearAllFilters={clearAllFilters}
          />

          {/* University List */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <UniversityListHeader
              totalCount={pagination.totalItems}
              sortBy={sortBy}
              setSortBy={handleSortChange}
            />

            {/* University Cards */}
            {loading && universities.length === 0 ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <UniversityCardSkeleton key={index} />
                ))}
              </div>
            ) : universities.length > 0 ? (
              <div className="space-y-4">
                {universities.map((university: any, index: number) => (
                  <UniversityCard
                    key={university.id || index}
                    university={university}
                  />
                ))}

                {/* Infinite scroll trigger and loader */}
                <div ref={loadingRef}>
                  <InfiniteScrollLoader
                    isLoading={loadingMore}
                    hasNextPage={pagination.hasNextPage}
                    totalItems={pagination.totalItems}
                  />
                </div>
              </div>
            ) : null}

            {/* No Results */}
            {universities.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
                <div className="text-gray-500 text-lg mb-4">
                  No universities found matching your criteria.
                </div>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

export default UniversityPage;
