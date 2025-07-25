"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Download } from "lucide-react";
import Link from "next/link";
import { tagSanatize } from "@/utils/tagsanatize";

export function UniversityCard({ university }: any) {
  const [showModal, setShowModal] = useState(false);

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200 bg-gray-50 rounded-2xl">
      <CardContent className="">
        <div className="flex flex-row gap-4 sm:gap-6">
          {/* University Logo */}
          <div className="flex-shrink-0 self-center sm:self-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
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
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 sm:pr-4">
                <div>
                  <div>
                    {/* University Name */}
                    <Link
                      href={`/university/${tagSanatize(university.slug)}-${
                        university.id
                      }/info`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-brand-primary mb-1 line-clamp-2 sm:line-clamp-1">
                        {university.college_name}
                      </h3>
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-2 sm:mb-3 text-gray-600">
                      <span className="text-xs sm:text-sm line-clamp-1">
                        {university.location ||
                          `${university.city_name}, ${university.state_name}`}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(university.rating)}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {university.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4">
          <div className="text-start sm:text-left">
            <div className="text-xs text-gray-500 mb-1">Course Fee</div>
            <div className="text-base sm:text-lg font-bold text-brand-secondary">
              ${university.avg_fees_in_aud?.toLocaleString() || "4,50,000"} AUD
            </div>
          </div>
          <div className="sm:border-x-2 border-gray-200 sm:px-4 text-center sm:text-left">
            <div className="text-xs text-gray-500 mb-1">Placement</div>
            <div className="text-base sm:text-lg font-bold text-gray-900">
              {university.placement_rate || "85"}%
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-xs text-gray-500 mb-1">Ranking</div>
            <div className="text-base sm:text-lg font-bold text-gray-900">
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
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto text-brand-primary border-blue-800 hover:bg-blue-50 text-xs sm:text-sm py-2 px-3"
            onClick={() => window.open(university.brochure_url, "_blank")}
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Download Brochure
          </Button>
          <div className="flex flex-row gap-2">
            <Link
              href={`/university/${tagSanatize(university.slug)}-${
                university.id
              }/info`}
              className="hover:text-blue-600 transition-colors flex-1"
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
