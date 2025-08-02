"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useRouter, useSearchParams } from "next/navigation";

export function UniversityListHeader({
  totalCount,
  sortBy,
  setSortBy,
  feesPreference,
  setFeesPreference,
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleFeesPreferenceChange = (checked: boolean) => {
    const newPreference = checked ? "international" : "domestic";
    setFeesPreference(newPreference);

    // Update query parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("feesPreference", newPreference);

    // Update URL
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Found {totalCount} colleges
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Showing results for universities in Australia
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-gray-600">
            Sort By:
          </span>
          <select
            aria-label="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Top Rated First">Top Rated First</option>
            <option value="Top Scored First">Top Scored First</option>
            <option value="Lowest Rated First">Lowest Rated First</option>
            <option value="Lowest Scored First">Lowest Scored First</option>
          </select>
        </div>
      </div>

      {/* toggle */}

      <div className="mt-8 flex justify-center">
        <Badge className="bg-gray-100 p-1">
          <div className="flex items-center space-x-2">
            <Label className="text-brand-primary" htmlFor="domestic">
              Domestic
            </Label>
            <Switch
              id="preference-switch"
              checked={feesPreference === "international"}
              className={
                feesPreference === "international"
                  ? "data-[state=checked]:bg-brand-secondary"
                  : "data-[state=unchecked]:bg-brand-primary"
              }
              onCheckedChange={handleFeesPreferenceChange}
            />
            <Label className="text-brand-secondary" htmlFor="international">
              International
            </Label>
          </div>
        </Badge>
      </div>
    </div>
  );
}
