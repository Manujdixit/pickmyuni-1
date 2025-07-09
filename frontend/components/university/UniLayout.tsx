"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import ContactWrapper from "../modal/contact-wrapper";
import { tagSanatize } from "@/utils/tagsanatize";

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
          className="object-cover"
          loading="lazy"
        />

        {/* University Logo */}
        <div className="absolute inset-x-0 -bottom-12 flex xl:container justify-center xl:justify-start z-10">
          <div className="sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-white overflow-hidden flex items-center justify-center shadow-lg border border-gray-300">
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
            />
          </div>
        </div>
      </div>

      {/* University Name and Address */}
      <div className="max-w-6xl mx-auto py-12 px-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          {/* University Info */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary leading-tight">
              {college?.college_name}
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
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
