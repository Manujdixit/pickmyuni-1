import React from "react";
import JsonLd from "./JsonLd";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    contactType: string;
    availableLanguage: string;
  };
}

/**
 * Organization Schema component for PickMyUni
 * Should be included in the root layout
 */
export default function OrganizationSchema({
  name = "PickMyUni",
  url = "https://pickmyuni.com",
  logo = "https://pickmyuni.com/logo.svg",
  description = "Find and compare the best universities in Australia for international students",
  sameAs = [
    "https://www.facebook.com/people/Pickmyuni/61576633748893/?mibextid=wwXIfr&rdid=55blvIqh3W7qBMYx&share_url=https://www.facebook.com/share/19hveAoxQw/?mibextid=wwXIfr",
    "https://www.instagram.com/pickmyuni",
    "https://www.linkedin.com/company/pick-my-uni/",
    "https://www.tiktok.com/@pickmyuni1",
    "https://www.youtube.com/@PickMyUni",
  ],
  contactPoint = {
    contactType: "customer service",
    availableLanguage: "English",
  },
}: OrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint,
    },
  };

  return <JsonLd data={organizationData} />;
}
