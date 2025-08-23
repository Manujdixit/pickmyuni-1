import { BreadcrumbItem } from "@/components/seo";

// Export the type for use in other modules
export type { BreadcrumbItem };

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

  // Comprehensive route mapping for all pages
  const routeNames: Record<string, string> = {
    // Static pages
    "about-us": "About Us",
    "contact-us": "Contact Us",
    "student-resources": "Student Resources",
    "transfer-assistance": "Transfer Assistance",
    privacy: "Privacy Policy",

    // University related
    university: "Universities",
    "compare-universities-in-australia": "Compare Universities",
    "top-universities-in-australia": "Universities",

    // Level-based pages
    "level1-universities-in-australia": "Level 1 Universities",
    "level2-universities-in-australia": "Level 2 Universities",
    "level3-universities-in-australia": "Level 3 Universities",

    // University types
    "private-universities-in-australia": "Private Universities",
    "public-universities-in-australia": "Public Universities",

    // Other pages
    "pr-courses-in-australia": "PR Courses",
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
      const paramValue = params?.[paramKey];

      if (paramValue) {
        // Handle specific dynamic route cases
        let displayName = paramValue;

        // Special handling for university slugs
        if (paramKey === "universitySlug") {
          displayName = paramValue
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        } else if (paramKey === "filterSlug") {
          displayName = paramValue
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }

        breadcrumbs.push({
          name: displayName,
          item: `${baseUrl}${currentPath}`,
          position,
        });
      }
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
