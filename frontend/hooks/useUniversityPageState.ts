"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { parseSlugToFilters } from "@/utils/slug";

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

  // Parse initial parameters from URL
  const getInitialParams = () => {
    let initialParams: Record<string, any> = {};

    if (paramsRoute?.filterSlug != "top-universities-in-australia") {
      const rawSlug = paramsRoute?.slugAndId || paramsRoute?.filterSlug || "";
      const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;
      initialParams = parseSlugToFilters(slug);
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
    if (!content) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.height = "auto";
    tempDiv.style.width = "100%";
    tempDiv.className = "prose max-w-none leading-relaxed text-gray-700";

    document.body.appendChild(tempDiv);
    const fullHeight = tempDiv.offsetHeight;
    document.body.removeChild(tempDiv);

    // Check if content has more than 3 lines (approximately 72px at 24px line height)
    setShowReadMore(fullHeight > 72);
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
  };
};
