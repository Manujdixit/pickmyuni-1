/**
 * Utility functions for the University Page
 */

// Get current applied filters from params
export const getCurrentFilters = (params: any) => ({
  searchquery: params?.searchquery || "",
  statename: params?.statename || "",
  coursename: params?.coursename || "",
  streamname: params?.streamname || "",
  min_fees: params?.min_fees,
  max_fees: params?.max_fees,
  type: params?.type,
  level: params?.level,
});

// Sync local filters with URL parameters
export const syncLocalFiltersWithParams = (params: any) => {
  return {
    search: params.searchquery || "",
    course: params.coursename || "All Courses",
    state: params.statename || "All States",
    stream: params.streamname || "All Streams",
    type: params.type || "All Types",
    level: params.level || "All Levels",
    feesRange:
      params.min_fees || params.max_fees
        ? `${params.min_fees || 0} - ${params.max_fees || "∞"}`
        : "All Fees",
  };
};
