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
  searchAction = {
    target: "https://pickmyuni.com/universities-?search={search_term_string}",
    queryInput: "required name=search_term_string",
  },
}: WebsiteSchemaProps) {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: searchAction.target,
      "query-input": searchAction.queryInput,
    },
  };

  return <JsonLd data={websiteData} />;
}
