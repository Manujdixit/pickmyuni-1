import React from "react";
import { notFound } from "next/navigation";
import UniversityPage from "@/components/university/Universitypage";

interface PageProps {
  params: Promise<{
    filterSlug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { filterSlug } = await params;

  if (filterSlug.includes("top-universities-in-australia")) {
    return <UniversityPage />;
  } else if (filterSlug.includes("universities")) {
    return <UniversityPage />;
  } else {
    notFound();
  }
};

export default page;
