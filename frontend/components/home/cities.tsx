"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CityCard = ({ city }: { city: any }) => {
  return (
    <Link href={`/city/${city.slug}-${city.id}`}>
      <Card className="flex cursor-pointer items-center transition-shadow hover:shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="bg-brand-primary flex h-28 w-28 items-center justify-center overflow-hidden rounded-full">
            <Image
              src={city.img1 || city.img2 || city.banner_img || "/vercel.svg"}
              alt={city.name + " logo"}
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
          </div>
          <div className="text-brand-primary text-center text-h3 font-semibold">
            {city.name
              .toLowerCase()
              .split(" ")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" ")}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function CitiesSection() {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/city/top`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch cities: ${response.status}`);
      }

      const data = await response.json();
      return data.data.cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return null;
    }
  };

  useEffect(() => {
    const getCities = async () => {
      const citiesData = await fetchCities();
      if (citiesData) {
        setCities(citiesData);
      }
      setLoading(false);
    };
    getCities();
  }, []);

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
  }, [cities]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  if (loading) {
    return (
      <section className="container mt-10 flex flex-col md:mt-16">
        <h2 className="text-center text-4xl font-semibold leading-tight">
          <span className="text-brand-primary">Top Cities</span>{" "}
          <span className="text-brand-secondary">In Australia</span>
        </h2>
        <div className="flex justify-center gap-6 overflow-hidden">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Card className="animate-pulse">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <div className="h-28 w-28 rounded-full bg-gray-300"></div>
                  <div className="h-4 w-24 rounded bg-gray-300"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!cities || cities.length === 0) {
    return null;
  }

  return (
    <section className="container mt-10 flex flex-col md:mt-16">
      <h2 className="mb-6 text-center text-3xl font-bold">
        <span className="text-brand-primary">Top Cities</span>{" "}
        <span className="text-brand-secondary">In Australia</span>
      </h2>

      <div className="relative">
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

        {/* Scrollable Cities Container */}
        <div
          ref={scrollRef}
          className="scrollbar-hide mx-8 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollPosition}
        >
          <div className="flex w-max gap-6 pb-4">
            {cities.map((city: any, index: number) => (
              <div key={index} className="flex-shrink-0">
                <CityCard city={city} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
