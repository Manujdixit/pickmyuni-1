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

export default function UniversitiesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
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

  if (error) {
    return;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl leading-tight font-semibold text-center mb-8">
          <span className="text-brand-primary">Top Affordable</span>{" "}
          <span className="text-brand-secondary">Universities</span>
        </h2>

        {/* Categories */}
        <div className="relative mb-8">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border rounded-full p-2 shadow-sm hover:bg-background transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border rounded-full p-2 shadow-sm hover:bg-background transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Scrollable Categories Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide mx-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={checkScrollPosition}
          >
            <div className="flex gap-4 w-max">
              {streams?.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                    activeCategory === category.name
                      ? "bg-brand-secondary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* University Cards */}
        <div className="flex justify-center items-center">
          {loading ? (
            <UniversitiesLoadingSkeleton />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {universities?.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center mb-4 gap-4">
                      <Image
                        src={
                          "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                            uni?.logo_url || "/vercel.svg"
                        }
                        alt={uni?.college_name}
                        width={60}
                        height={60}
                        className="object-contain rounded-full"
                      />
                      <div>
                        <Link
                          href={`/university/${tagSanatize(uni.slug)}-${
                            uni.id
                          }/info`}
                        >
                          <h3 className="font-bold text-brand-primary text-lg leading-tight">
                            {uni.college_name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500">{uni.location}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center rounded-sm overflow-hidden bg-orange-50 mb-2">
                      <div className="text-brand-secondary p-2 font-normal">
                        Tuitions Start From
                      </div>
                      <div className="bg-orange-400 text-white p-2 font-medium">
                        $
                        {uni.avg_fees_in_aud
                          ? uni.avg_fees_in_aud.toLocaleString()
                          : "N/A"}
                        /year
                      </div>
                    </div>

                    <div className="flex flex-col text-sm">
                      <div className="grid grid-cols-[100px_1fr] gap-1">
                        <p className="text-gray-500">PR Pathway:</p>
                        <p className="font-medium">
                          {uni.pr_pathway ? "Yes" : "No"}
                        </p>

                        <p className="text-gray-500">Intakes:</p>
                        <p className="font-medium">
                          {uni.intake_start_date
                            ? new Date(
                                uni.intake_start_date
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>

                        <p className="text-gray-500">Courses:</p>
                        <p className="font-medium">
                          {uni.count_collegewise_course || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium mt-auto"
                  >
                    Check Transfer Options
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/university">
            <Button>View All Universities</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
