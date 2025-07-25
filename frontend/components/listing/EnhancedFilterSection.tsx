"use client";
import { Filter, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

const FilterSection = dynamic(() => import("./FilterSection"), { ssr: false });

interface EnhancedFilterSectionProps {
  filters: any;
  setFilters: (filters: any) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  availableFilters?: any;
  currentFilters?: any;
  onFilterChange?: (filterType: string, value: string | number) => void;
  onSearch?: (searchTerm: string) => void;
  onClearIndividualFilter?: (filterType: string) => void;
  onFeeRangeChange?: (minFees?: number, maxFees?: number) => void;
  onClearAllFilters?: () => void;
}

export function EnhancedFilterSection({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  availableFilters,
  currentFilters,
  onFilterChange,
  onSearch,
  onClearIndividualFilter,
  onFeeRangeChange,
  onClearAllFilters,
}: EnhancedFilterSectionProps) {
  const isMobile = useIsMobile();

  // Use currentFilters (actual applied filters) for active filter detection
  const hasActiveFilters = currentFilters
    ? !!(
        currentFilters.searchquery ||
        currentFilters.statename ||
        currentFilters.coursename ||
        currentFilters.streamname ||
        currentFilters.min_fees ||
        currentFilters.max_fees ||
        currentFilters.type ||
        currentFilters.level
      )
    : false;

  return (
    <div className="flex-shrink-0 lg:w-80">
      {/* Mobile Filter Toggle */}
      <div className="mb-4 lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 text-xs">
                Active
              </Badge>
            )}
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* Filter Panel */}
      {(isMobile ? isOpen : true) && (
        <FilterSection
          filters={filters}
          setFilters={setFilters}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          availableFilters={availableFilters}
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
          onSearch={onSearch}
          onClearIndividualFilter={onClearIndividualFilter}
          onFeeRangeChange={onFeeRangeChange}
          onClearAllFilters={onClearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </div>
  );
}
