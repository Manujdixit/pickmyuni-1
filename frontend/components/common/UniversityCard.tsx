"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Download } from "lucide-react";
import Link from "next/link";
import { tagSanatize } from "@/utils/tagsanatize";

export function UniversityCard({ university, feesPreference }: any) {
  const [showModal, setShowModal] = useState(false);

  const getDisplayFee = () => {
    if (feesPreference === "domestic") {
      return university.domestic_fees_in_aud || "4,50,000";
    }
    if (feesPreference === "international") {
      return university.avg_fees_in_aud || "4,50,000";
    }
  };

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-3 w-3 fill-yellow-400/50 text-yellow-400 sm:h-4 sm:w-4"
        />,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-3 w-3 text-gray-300 sm:h-4 sm:w-4"
        />,
      );
    }

    return stars;
  };

  return (
    <Card className="rounded-2xl border border-gray-200 bg-gray-50 transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="">
        <div className="flex flex-row gap-4 sm:gap-6">
          {/* University Logo */}
          <div className="flex-shrink-0 self-center sm:self-start">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white sm:h-20 sm:w-20">
              <Image
                src={
                  university.logo_url
                    ? "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/" +
                      university.logo_url.trim()
                    : "/vercel.svg"
                }
                alt={university.college_name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* University Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1 sm:pr-4">
                <div>
                  <div>
                    {/* University Name */}
                    <Link
                      href={`/university/${tagSanatize(university.slug)}-${
                        university.id
                      }/info`}
                      className="transition-colors hover:text-blue-600"
                    >
                      <h3 className="text-brand-primary mb-1 line-clamp-2 text-lg font-bold sm:line-clamp-1 sm:text-xl">
                        {university.college_name}
                      </h3>
                    </Link>

                    {/* Location */}
                    <div className="mb-2 flex items-center gap-1 text-gray-600 sm:mb-3">
                      <span className="line-clamp-1 text-xs sm:text-sm">
                        {university.location ||
                          `${university.city_name}, ${university.state_name}`}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(university.rating)}
                    </div>
                    <span className="text-xs font-medium text-gray-700 sm:text-sm">
                      {university.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="mb-4 grid grid-cols-3 gap-3 sm:gap-6">
          <div className="text-start sm:text-left">
            <div className="mb-1 text-xs text-gray-500">
              Course Fee{" "}
              {feesPreference === "domestic" ? "(Domestic)" : "(International)"}
            </div>
            <div className="text-brand-secondary text-base font-bold sm:text-lg">
              ${getDisplayFee()?.toLocaleString()} AUD
            </div>
          </div>
          <div className="border-gray-200 text-center sm:border-x-2 sm:px-4 sm:text-left">
            <div className="mb-1 text-xs text-gray-500">Placement</div>
            <div className="text-base font-bold text-gray-900 sm:text-lg">
              {university.placement_rate || "85"}%
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="mb-1 text-xs text-gray-500">Ranking</div>
            <div className="text-base font-bold text-gray-900 sm:text-lg">
              {university.ranking || "31st"} /{" "}
              <span className="hidden sm:inline">
                {university.total_ranking || "100 in Australia"}
              </span>
              <span className="sm:hidden">
                {university.total_ranking?.split(" ")[0] || "100"}
              </span>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-brand-primary w-full border-blue-800 px-3 py-2 text-xs hover:bg-blue-50 sm:w-auto sm:text-sm"
            onClick={() => window.open(university.brochure_url, "_blank")}
          >
            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Download Brochure
          </Button>
          <div className="flex flex-row gap-2">
            <Link
              href={`/university/${tagSanatize(university.slug)}-${
                university.id
              }/info`}
              className="flex-1 transition-colors hover:text-blue-600"
            >
              <Button size="sm" className="w-full">
                More Details
              </Button>
            </Link>
            <Button
              size="sm"
              variant={"secondary"}
              className="flex-1"
              onClick={() => setShowModal(true)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
