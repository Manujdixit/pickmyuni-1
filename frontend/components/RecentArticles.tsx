import { useLatestArticles } from "@/hooks/useLatestArticles";
import { Article } from "@/types/search";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { randomImage } from "./home/articles";
import { notFound } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";

function stripHtmlAndTruncate(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text;
}

export const silosMap: Record<string, string> = {
  news: "News",
  exam: "Exam",
  course: "Course",
  blog: "Blog",
  other: "Other",
  universities: "Universities",
  fees_scholarships_and_costs: "Fees, Scholarships, & Costs",
  international_student_essentials: "International Student Essentials",
  transfers_and_migration_advice: "Transfers & Migration Advice",
  application_admissions_and_compliance:
    "Application, Admissions, & Compliance",
};

function RecentArticles() {
  const isLoadingRef = useRef(false);
  const [selectedSilo, setSelectedSilo] = useState<string>("all");

  const { articles, loading, loadingMore, error, hasMore, loadMore, silos } =
    useLatestArticles(selectedSilo);

  // Scroll and tab navigation refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Set initial silo when silos load
  useEffect(() => {
    if (silos && silos.length > 0 && selectedSilo === "all") {
      // Keep "all" as default, or set to first silo if you prefer
    }
  }, [silos]);

  // Scroll position checking for tabs
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
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

  // Filter articles based on selected silo
  const filteredArticles =
    selectedSilo === "all"
      ? articles
      : articles.filter((article) => article.silos === selectedSilo);

  console.log({ filteredArticles });

  // Scroll event handler
  const handleScroll = useCallback(() => {
    // Prevent multiple simultaneous requests
    if (isLoadingRef.current || loading || loadingMore || !hasMore) {
      return;
    }

    // Calculate scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Trigger load more when user is 200px from bottom
    const threshold = 200;
    const isNearBottom = scrollTop + windowHeight >= documentHeight - threshold;

    if (isNearBottom) {
      isLoadingRef.current = true;
      loadMore();
    }
  }, [loading, loadingMore, hasMore, loadMore]);

  // Set up scroll event listener
  useEffect(() => {
    // Add scroll event listener with throttling
    let timeoutId: NodeJS.Timeout;

    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleScroll();
      }, 100); // Throttle to 100ms
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  // Reset loading ref when loadMore completes
  useEffect(() => {
    if (!loadingMore) {
      isLoadingRef.current = false;
    }
  }, [loadingMore]);

  const ArticleCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col">
        <Skeleton className="h-52 w-full flex-shrink-0 rounded-lg" />
        <div className="mt-4 flex flex-1 flex-col justify-center space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );

  if (loading && articles.length === 0) {
    return (
      <section className="pt-8">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.log(error);
    return notFound();
  }

  return (
    <section className="container mx-auto flex flex-col justify-center py-4">
      {/* Tabs Section */}
      {silos && silos.length > 0 && (
        <div className="mx-auto mb-8 max-w-[1400px] px-4">
          <Tabs
            value={selectedSilo}
            onValueChange={setSelectedSilo}
            className="w-full"
          >
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
                  <TabsTrigger
                    value="all"
                    className="flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm"
                  >
                    ALL
                  </TabsTrigger>
                  {silos.map((silo) => (
                    <TabsTrigger
                      key={silo}
                      value={silo}
                      className="flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm"
                    >
                      {silosMap[silo] || silo}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </Tabs>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article: Article) => {
            return (
              <Link
                href={`/student-resources/${article.slug}-${article.id}`}
                key={article.id}
                className="group"
              >
                <div className="mx-auto max-h-[450px] max-w-[400px] overflow-hidden rounded-lg bg-[#F6F6F7] transition-shadow duration-300 hover:shadow-md">
                  <div className="flex flex-col">
                    <div className="relative h-52 w-full flex-shrink-0 overflow-hidden">
                      <img
                        src={article.img1 || randomImage()}
                        alt={article.title}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 text-base font-normal text-gray-500">
                        {moment(article.createdAt).format("DD MMM YYYY")}
                      </div>
                      <h3 className="text-brand-primary line-clamp-2 text-2xl font-semibold leading-tight">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-base font-light text-gray-500">
                        {stripHtmlAndTruncate(article.content)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Loading indicator for infinite scroll */}
        {loadingMore && (
          <div className="mt-8 flex justify-center">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
            </div>
          </div>
        )}

        {/* End of results indicator */}
        {!hasMore && filteredArticles.length > 0 && (
          <div className="my-16 text-center text-gray-500">
            <p>You've reached the end of the articles.</p>
          </div>
        )}

        {/* No articles found for selected silo */}
        {filteredArticles.length === 0 &&
          !loading &&
          selectedSilo !== "all" && (
            <div className="mt-8 text-center text-gray-500">
              <p>No articles found for this category.</p>
            </div>
          )}
      </div>
    </section>
  );
}

export default RecentArticles;
