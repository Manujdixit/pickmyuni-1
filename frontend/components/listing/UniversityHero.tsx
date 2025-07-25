"use client";
import Image from "next/image";
import React from "react";

export function UniversityHero({
  title = "Best Universities in Australia",
  imageSrc = "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/transfer_banner.webp",
  imageAlt = "Library with books on shelves",
}: any) {
  return (
    <div className="relative h-64 md:h-80 lg:h-96">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto pb-8">
          <h1 className="max-w-[850px] text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
