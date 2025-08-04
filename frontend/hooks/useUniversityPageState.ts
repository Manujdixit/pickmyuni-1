"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { parseSlugToFilters } from "@/utils/slug";
import { needsReadMore } from "@/utils/checkReadMore";

export interface LocalFilters {
  course: string;
  location: string;
  feesRange: string;
  exams: string;
  search: string;
  stream: string;
  state: string;
  type: string;
  level: string;
}

export const useUniversityPageState = () => {
  const paramsRoute = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [localFilters, setLocalFilters] = useState<LocalFilters>({
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Top Rated First");
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [feesPreference, setFeesPreference] = useState("international");

  // Initialize feesPreference from URL params
  useEffect(() => {
    const urlFeesPreference = searchParams.get("feesPreference");
    if (
      urlFeesPreference &&
      (urlFeesPreference === "domestic" ||
        urlFeesPreference === "international")
    ) {
      setFeesPreference(urlFeesPreference);
    }
  }, [searchParams]);

  // Parse initial parameters from URL
  const getInitialParams = () => {
    let initialParams: Record<string, any> = {};

    if (paramsRoute?.filterSlug != "top-universities-in-australia") {
      const rawSlug = paramsRoute?.slugAndId || paramsRoute?.filterSlug || "";
      const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;
      initialParams = parseSlugToFilters(slug);
    }

    // Add feesPreference from URL params
    const urlFeesPreference = searchParams.get("feesPreference");
    if (
      urlFeesPreference &&
      (urlFeesPreference === "domestic" ||
        urlFeesPreference === "international")
    ) {
      initialParams.feesPreference = urlFeesPreference;
    } else {
      initialParams.feesPreference = "international"; // default
    }

    // Clean up initialParams to remove empty values
    return Object.fromEntries(
      Object.entries(initialParams).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );
  };

  // Check if content needs read more functionality
  const checkReadMoreNeed = (content?: string) => {
    setShowReadMore(needsReadMore(content));
  };

  return {
    paramsRoute,
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
    setShowReadMore,
    getInitialParams,
    checkReadMoreNeed,
    feesPreference,
    setFeesPreference,
  };
};
