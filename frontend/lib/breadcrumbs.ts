import { BreadcrumbItem } from "@/components/seo";

/**
 * Generate breadcrumb data based on the current path
 * This function creates breadcrumb schema data for SEO
 */
export function generateBreadcrumbData(
  pathname: string,
  params?: Record<string, string>,
): BreadcrumbItem[] {
  const baseUrl = "https://pickmyuni.com";
  const segments = pathname.split("/").filter(Boolean);

  // Always start with home
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: "Home",
      item: baseUrl,
      position: 1,
    },
  ];

  // Map of route segments to display names
  const routeNames: Record<string, string> = {
    university: "Universities",
    compare: "Compare Universities",
    "student-resources": "Student Resources",
    "transfer-assistance": "Transfer Assistance",
    "about-us": "About Us",
    "contact-us": "Contact Us",
    privacy: "Privacy Policy",
    "pr-path": "PR Pathway",
    city: "Cities",
  };

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const position = index + 2;

    // Handle dynamic routes
    if (segment.startsWith("[") && segment.endsWith("]")) {
      // For dynamic segments, use params to get the actual value
      const paramKey = segment.slice(1, -1);
      const displayName = params?.[paramKey] || segment;

      breadcrumbs.push({
        name: displayName,
        item: `${baseUrl}${currentPath}`,
        position,
      });
    } else {
      // Use predefined names or capitalize the segment
      const displayName =
        routeNames[segment] ||
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      breadcrumbs.push({
        name: displayName,
        item: `${baseUrl}${currentPath}`,
        position,
      });
    }
  });

  return breadcrumbs;
}

/**
 * Common breadcrumb patterns for specific pages
 */
export const commonBreadcrumbs = {
  university: (universityName?: string): BreadcrumbItem[] => [
    { name: "Home", item: "https://pickmyuni.com", position: 1 },
    {
      name: "Universities",
      item: "https://pickmyuni.com/top-universities-in-australia",
      position: 2,
    },
    ...(universityName
      ? [{ name: universityName, item: "", position: 3 }]
      : []),
  ],

  compare: (): BreadcrumbItem[] => [
    { name: "Home", item: "https://pickmyuni.com", position: 1 },
    {
      name: "Compare Universities",
      item: "https://pickmyuni.com/compare-universities-in-australia",
      position: 2,
    },
  ],

  studentResources: (articleTitle?: string): BreadcrumbItem[] => [
    { name: "Home", item: "https://pickmyuni.com", position: 1 },
    {
      name: "Student Resources",
      item: "https://pickmyuni.com/student-resources",
      position: 2,
    },
    ...(articleTitle ? [{ name: articleTitle, item: "", position: 3 }] : []),
  ],
};
