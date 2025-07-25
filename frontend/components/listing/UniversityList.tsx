import React, { Suspense, lazy } from "react";
import { UniversityCardSkeleton } from "@/components/skeleton/university-skeleton";
import { InfiniteScrollLoader } from "@/components/ui/InfiniteScrollLoader";
import { NoResultsMessage } from "./NoResultsMessage";
import { UniversityListHeader } from "./UniversityListHeader";
import { UniversityCard } from "../common/UniversityCard";

interface UniversityListProps {
  universities: any[];
  pagination: {
    totalItems: number;
    hasNextPage: boolean;
  };
  loading: boolean;
  loadingMore: boolean;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  loadingRef: React.RefObject<HTMLDivElement | null>;
  onClearAllFilters: () => void;
}

export const UniversityList: React.FC<UniversityListProps> = ({
  universities,
  pagination,
  loading,
  loadingMore,
  sortBy,
  onSortChange,
  loadingRef,
  onClearAllFilters,
}) => {
  return (
    <div className="min-w-0 flex-1">
      {/* Results Header */}
      <UniversityListHeader
        totalCount={pagination.totalItems}
        sortBy={sortBy}
        setSortBy={onSortChange}
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
            <Suspense
              key={university.id || index}
              fallback={<UniversityCardSkeleton />}
            >
              <UniversityCard university={university} />
            </Suspense>
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
      ) : !loading ? (
        <NoResultsMessage onClearAllFilters={onClearAllFilters} />
      ) : null}
    </div>
  );
};
