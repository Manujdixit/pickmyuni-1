"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const indexes = [
  "info",
  "courses",
  "campuses",
  "ranking",
  "careers",
  "fees",
  "scholarships",
  "facilities",
  "accommodations",
  "faqs",
  "reviews",
  "news",
  "more",
];

interface TabsWithUrlContainerProps {
  isparent: boolean;
  slugAndId: string;
}

function TabsWithUrlContainer({
  slugAndId,
  isparent,
}: TabsWithUrlContainerProps) {
  const router = useRouter();
  const params = useParams();
  let tabParam = (params.tab as string[])?.[0] || "info";
  const currentTab = tabParam.startsWith("courses") ? "courses" : tabParam;

  // Filter out campuses tab if isparent is false
  const availableTabs = isparent
    ? indexes
    : indexes.filter(
        (tab) =>
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
