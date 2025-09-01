"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUniversities } from "@/hooks/useUniversities";
import { UniversitiesLoadingSkeleton } from "@/components/skeleton/university-skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { tagSanatize } from "@/utils/tagsanatize";
import { capitalFirst } from "@/utils/capitalFirst";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function UniversitiesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [preference, setPreference] = useState("international");
  const [stream, setStream] = useState(null);
  const { universities, streams, loading, error } =
    useUniversities(activeCategory);

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
  }, [streams]);

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

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category.name);
    if (category.name === "All") {
      setStream(null);
    } else {
      setStream(category.slug);
    }
  };

  if (error) {
    return;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-8 text-center text-4xl font-semibold leading-tight">
            <span className="text-brand-primary">Top Affordable</span>{" "}
            <span className="text-brand-secondary">Universities</span>
          </h2>

          {/* Categories */}
          <div className="container relative mx-auto mb-8">
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

            {/* Scrollable Categories Container */}
            <div
              ref={scrollRef}
              className="scrollbar-hide overflow-x-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={checkScrollPosition}
            >
              <div className="flex w-max gap-4">
                {streams?.map((category) => (
                  <button
                    key={category.id}
                    className={cn(
                      "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      activeCategory === category.name
                        ? "bg-brand-secondary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100",
                    )}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* toggle */}
          {loading ? (
            <Skeleton className="h-10 w-36" />
          ) : (
            <Badge className="bg-gray-100 p-1">
              <div className="flex items-center space-x-2">
                <Label className="text-brand-primary" htmlFor="domestic">
                  Domestic
                </Label>
                <Switch
                  aria-label="toggle"
                  id="preference-switch"
                  checked={preference === "international"}
                  className={
                    preference === "international"
                      ? "data-[state=checked]:bg-brand-secondary"
                      : "data-[state=unchecked]:bg-brand-primary"
                  }
                  onCheckedChange={(checked) =>
                    setPreference(checked ? "international" : "domestic")
                  }
                />
                <Label className="text-brand-secondary" htmlFor="international">
                  International
                </Label>
              </div>
            </Badge>
          )}
        </div>

        {/* University Cards */}
        <div className="mt-8 flex items-center justify-center">
          {loading ? (
            <UniversitiesLoadingSkeleton />
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {universities?.map((uni) => (
                <div
                  key={uni.id}
                  className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <div className="flex-1 p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <Image
                        src={
                          "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                            uni?.logo_url || "/vercel.svg"
                        }
                        alt={uni?.college_name?.slice(0, 10)}
                        width={60}
                        height={60}
                        className="rounded-full object-contain"
                      />
                      <div>
                        <Link
                          href={`/university/${tagSanatize(uni.slug)}-${
                            uni.id
                          }/info`}
                        >
                          <h3 className="text-brand-primary line-clamp-2 text-lg font-bold leading-tight">
                            {uni.college_name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500">{uni.location}</p>
                      </div>
                    </div>

                    <div className="mb-2 flex items-center justify-between overflow-hidden rounded-sm bg-orange-50">
                      <div className="text-brand-secondary p-2 font-normal">
                        Tuitions Start From
                      </div>
                      <div className="bg-orange-400 p-2 font-medium text-white">
                        {preference === "domestic"
                          ? uni.min_tution_fee_domestic
                            ? `AUD ${uni.min_tution_fee_domestic.toLocaleString()}/year`
                            : "AUD -/year"
                          : uni.min_tution_fee_int
                            ? `AUD ${uni.min_tution_fee_int.toLocaleString()}/year`
                            : "AUD -/year"}
                      </div>
                    </div>

                    <div className="flex flex-col text-sm">
                      <div className="grid grid-cols-[100px_1fr] gap-1">
                        <p className="text-gray-500">Type:</p>
                        <p className="font-medium">
                          {(() => {
                            let type = uni.type || "-";
                            if (
                              typeof type === "string" &&
                              type.toLowerCase().includes("government")
                            ) {
                              type = type.replace(/government/gi, "Public");
                            }
                            return capitalFirst(type);
                          })()}
                        </p>

                        <p className="text-gray-500">Intakes:</p>
                        <p className="line-clamp-1 font-medium">
                          {uni.intake || "-"}
                        </p>

                        <p className="text-gray-500">Courses:</p>
                        <p className="font-medium">
                          {uni?.coursesCount > 0
                            ? uni?.coursesCount + " +"
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-auto w-full bg-gray-100 font-medium text-gray-600 hover:bg-gray-200"
                  >
                    Check Transfer Options
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={
              stream
                ? `/universities-stream-${stream}`
                : "/top-universities-in-australia"
            }
          >
            <Button>View All Universities</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
