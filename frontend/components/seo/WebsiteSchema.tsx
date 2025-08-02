import React from "react";
import JsonLd from "./JsonLd";

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  searchAction?: {
    target: string;
    queryInput: string;
  };
}

/**
 * Website Schema component for PickMyUni
 * Should be included on the homepage
 */
export default function WebsiteSchema({
  name = "PickMyUni",
  url = "https://pickmyuni.com",
  description = "Discover and compare top Australian universities for international students",
}: WebsiteSchemaProps) {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };

  return <JsonLd data={websiteData} />;
}
