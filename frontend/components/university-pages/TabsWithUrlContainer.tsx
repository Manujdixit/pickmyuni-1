"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { validTabs } from "./constants";

interface TabsWithUrlContainerProps {
  isparent: boolean;
  slugAndId: string;
  availableTabs?: string[];
}

function TabsWithUrlContainer({
  slugAndId,
  isparent,
  availableTabs: propAvailableTabs,
}: TabsWithUrlContainerProps) {
  const router = useRouter();
  const params = useParams();
  const tabParam = (params.tab as string[])?.[0] || "info";
  const currentTab = tabParam.startsWith("courses") ? "courses" : tabParam;

  // Use prop availableTabs if provided, otherwise fall back to original logic
  const availableTabs =
    propAvailableTabs && propAvailableTabs.length > 0
      ? propAvailableTabs
      : isparent
        ? validTabs.filter(
            (tab: string) => tab !== "facilities" && tab !== "accommodations",
          )
        : validTabs.filter(
            (tab: string) =>
              tab !== "campuses" && tab !== "ranking" && tab !== "scholarships",
          );

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleTabChange = (tab: string) => {
    router.push(`/university/${slugAndId}/${tab}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <div className="relative mb-6">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/80 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/80 p-2 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {/* Scrollable Tabs Container */}
        <div
          ref={scrollRef}
          className="scrollbar-hide mx-8 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollPosition}
        >
          <TabsList className="inline-flex h-auto w-auto min-w-full justify-start gap-4 p-0">
            {availableTabs.map((index) => (
              <TabsTrigger
                key={index}
                value={index}
                className="flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm"
              >
                {index.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
}

export default TabsWithUrlContainer;
