"use client";

import React, { useEffect } from "react";
import { useInfiniteUniversityList } from "@/hooks/useInfiniteUniversityList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useUniversityPageState } from "@/hooks/useUniversityPageState";
import { useUniversityFilters } from "@/hooks/useUniversityFilters";
import { NotFound } from "../ui/not-found";
import {
  getCurrentFilters,
  syncLocalFiltersWithParams,
} from "@/components/listing/universityPageUtils";
import dynamic from "next/dynamic";
import { UniversityHero } from "./UniversityHero";

const BackToTopButton = dynamic(() =>
  import("@/components/ui/BackToTopButton").then((mod) => mod.BackToTopButton),
);

const EnhancedFilterSection = dynamic(
  () =>
    import("@/components/listing/EnhancedFilterSection").then(
      (mod) => mod.EnhancedFilterSection,
    ),
  { ssr: false },
);

const UniversityPageContent = dynamic(() =>
  import("@/components/listing/UniversityPageContent").then(
    (mod) => mod.UniversityPageContent,
  ),
);

const UniversityList = dynamic(() =>
  import("@/components/listing/UniversityList").then(
    (mod) => mod.UniversityList,
  ),
);

function UniversityPage() {
  // Use custom hooks for state management
  const {
    router,
    localFilters,
    setLocalFilters,
    isFilterOpen,
    setIsFilterOpen,
    sortBy,
    setSortBy,
    isContentExpanded,
    setIsContentExpanded,
    showReadMore,
    getInitialParams,
    checkReadMoreNeed,
    feesPreference,
    setFeesPreference,
  } = useUniversityPageState();

  // Get initial parameters from URL
  const cleanInitialParams = getInitialParams();

  // Use the infinite university list hook
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

  // Use custom hook for filter management
  const {
    handleSortChange,
    clearAllFilters,
    clearIndividualFilter,
    handleSearch,
    handleFilterChange,
    handleFeeRangeChange,
  } = useUniversityFilters({
    router,
    params,
    localFilters,
    setLocalFilters,
    updateSearch,
    updateFilters,
    updateSorting,
    clearFilters,
  });

  // Sync local filters with applied filters from URL/slug
  useEffect(() => {
    if (params) {
      const syncedFilters = syncLocalFiltersWithParams(params);
      setLocalFilters((prev) => ({
        ...prev,
        ...syncedFilters,
      }));
    }
  }, [params, setLocalFilters]);

  // Check if content needs read more functionality
  useEffect(() => {
    checkReadMoreNeed(availableFilters?.content);
  }, [availableFilters?.content, checkReadMoreNeed]);

  // Early return for error - AFTER all hooks
  if (error) return <NotFound />;

  // Get current applied filters from the hook
  const currentFilters = getCurrentFilters(params);

  // Handle sort changes with updated setSortBy
  const handleSortChangeWithState = (newSortBy: string) => {
    setSortBy(newSortBy);
    handleSortChange(newSortBy);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <UniversityHero />

      {/* Main Content */}
      <div className="container mx-auto py-6">
        {/* University Page Content */}
        <UniversityPageContent
          content={availableFilters?.content}
          showReadMore={showReadMore}
          isContentExpanded={isContentExpanded}
          setIsContentExpanded={setIsContentExpanded}
        />

        <div className="flex flex-col gap-6 lg:flex-row">
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
          <UniversityList
            universities={universities}
            pagination={pagination}
            loading={loading}
            loadingMore={loadingMore}
            sortBy={sortBy}
            onSortChange={handleSortChangeWithState}
            loadingRef={loadingRef}
            onClearAllFilters={clearAllFilters}
            feesPreference={feesPreference}
            setFeesPreference={setFeesPreference}
          />
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

export default UniversityPage;
