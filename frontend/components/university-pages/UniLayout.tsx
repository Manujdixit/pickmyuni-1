"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { tagSanatize } from "@/utils/tagsanatize";
import ContactWrapper from "../form/contact-wrapper";

interface UniLayoutProps {
  college: any;
  slugAndId: string;
}

function UniLayout({ college, slugAndId }: UniLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Split into slug and id
  const parts = slugAndId.split("-");
  const id = parts.pop(); // last part is ID
  const slug = parts.join("-"); // rest is slug

  const correctSlug = tagSanatize(college.slug);

  // If the slug is incorrect, redirect to correct URL
  if (slug !== correctSlug) {
    redirect(`/university/${correctSlug}-${college.id}`);
  }

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96">
        <Image
          src={
            college?.bg_url
              ? `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${college?.bg_url}`
              : "/transfer.svg"
          }
          alt={college?.college_name || "college campus"}
          fill
          priority
          className="object-cover"
          fetchPriority="high"
        />

        {/* University Logo */}
        <div className="absolute inset-x-0 -bottom-12 z-10 flex justify-center xl:container xl:justify-start">
          <div className="flex items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-lg sm:h-24 sm:w-24 md:h-32 md:w-32">
            <Image
              src={
                college?.logo_url
                  ? `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/${college?.logo_url}`
                  : "/benefit3.svg"
              }
              alt="University Logo"
              width={120}
              height={120}
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* University Name and Address */}
      <div className="mx-auto max-w-6xl px-16 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {/* University Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-brand-primary text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
              {college?.college_name}
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-lg">
              {college?.location}
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center sm:justify-end">
            <Button
              variant={"secondary"}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center"
            >
              <span>Enquire Now</span>
              <Image
                src="/logo-button.svg"
                alt="Icon"
                width={50}
                height={50}
                className=""
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ContactWrapper open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}

export default UniLayout;
