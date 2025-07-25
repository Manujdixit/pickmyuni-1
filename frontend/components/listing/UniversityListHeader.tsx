"use client";
import React from "react";

export function UniversityListHeader({ totalCount, sortBy, setSortBy }: any) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Found {totalCount} colleges
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Showing results for universities in Australia
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">
          Sort By:
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="Top Rated First">Top Rated First</option>
          <option value="Top Scored First">Top Scored First</option>
          <option value="Lowest Rated First">Lowest Rated First</option>
          <option value="Lowest Scored First">Lowest Scored First</option>
        </select>
      </div>
    </div>
  );
}
