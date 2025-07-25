import React from "react";

interface NoResultsMessageProps {
  onClearAllFilters: () => void;
}

export const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  onClearAllFilters,
}) => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-lg text-gray-500">
        No universities found matching your criteria.
      </div>
      <button
        onClick={onClearAllFilters}
        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Clear All Filters
      </button>
    </div>
  );
};
