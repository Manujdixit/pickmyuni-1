import StudentResources from "@/components/student-resources";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Study in Australia Blog | Courses, Transfers, Admissions & More",
  description:
    "Stay informed with PickMyUni’s expert blog on studying in Australia. Explore guides on courses, universities, fees, student life, migration advice, and course transfers.",
  keywords: [
    "student resources Australia",
    "study abroad blog",
    "international student tips",
    "university guides",
    "Australian education blog",
    "student life Australia",
    "study tips",
    "university preparation",
  ],
  openGraph: {
    title:
      "Study in Australia Blog | Courses, Transfers, Admissions & More | PickMyUni",
    description:
      "Stay informed with PickMyUni’s expert blog on studying in Australia. Explore guides on courses, universities, fees, student life, migration advice, and course transfers.",
    type: "website",
  },
};

function page() {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[336px] w-full text-white">
        <Image
          src="/transfer.svg"
          alt="University campus background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Blog
            </h1>
          </div>
        </div>
      </section>
      <StudentResources />
    </div>
  );
}

export default page;
