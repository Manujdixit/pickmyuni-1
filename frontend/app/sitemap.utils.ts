import { tagSanatize } from "@/utils/tagsanatize";

type ApiResponse = {
  success: boolean;
  data: Array<{
    id: string;
    slug: string;
    is_parent?: boolean;
    available_silos: string[];
  }>;
};

// Fetch data with retry logic and timeout
async function fetchWithRetry(
  url: string,
  retries = 2,
  timeout = 20000,
): Promise<ApiResponse | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.success || !Array.isArray(data.data)) {
        throw new Error("Invalid API response format");
      }

      return data;
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed for ${url}:`, error);

      if (attempt === retries) {
        console.error(
          `Failed to fetch ${url} after ${retries + 1} attempts:`,
          error,
        );
        return null;
      }

      // Exponential backoff
      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000),
        );
      }
    }
  }
  return null;
}

export async function generateStaticUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";

  // Static routes with better organization
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/student-resources`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/top-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/transfer-assistance`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pr-courses-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/public-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/private-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/level1-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/level2-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/level3-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  return staticRoutes;
}

export async function generateCityUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL not configured, skipping city routes");
    return [];
  }

  try {
    const cityData = await fetchWithRetry(`${apiUrl}/api/v1/city/`);

    if (!cityData) {
      return [];
    }

    const cityRoutes = cityData.data.map((city) => ({
      url: `${baseUrl}/city/${tagSanatize(city.slug)}-${city.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    console.log(`Generated ${cityRoutes.length} city routes`);
    return cityRoutes;
  } catch (error) {
    console.error("Error generating city URLs:", error);
    return [];
  }
}

export async function generateArticleUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL not configured, skipping article routes");
    return [];
  }

  try {
    const articleData = await fetchWithRetry(`${apiUrl}/api/v1/articles/`);

    if (!articleData) {
      return [];
    }

    const articleRoutes = articleData.data.map((article) => ({
      url: `${baseUrl}/student-resources/${tagSanatize(article.slug)}-${
        article.id
      }`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    console.log(`Generated ${articleRoutes.length} article routes`);
    return articleRoutes;
  } catch (error) {
    console.error("Error generating article URLs:", error);
    return [];
  }
}

export async function generateCollegeUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL not configured, skipping college routes");
    return [];
  }

  try {
    const collegeData = await fetchWithRetry(`${apiUrl}/api/v1/college/`);

    if (!collegeData) {
      return [];
    }

    // Mapping from database silos to frontend tab names
    const siloToTabMapping: { [key: string]: string } = {
      info: "info",
      course: "courses",
      career: "careers",
      ranking: "ranking",
      fees: "fees",
      scholarship: "scholarships",
      placement: "placement",
      news: "news",
      faq: "faqs",
      other: "more",
      campus: "campuses",
      accommodation: "accommodations",
      reviews: "reviews",
      facilities: "facilities",
    };

    // Define restricted tabs for parent and non-parent colleges
    const parentRestrictedTabs = ["facilities", "accommodations"];
    const nonParentRestrictedTabs = ["campuses", "ranking", "scholarships"];

    const collegeRoutes: Array<{
      url: string;
      lastModified: Date;
      changeFrequency: "daily";
      priority: number;
    }> = [];

    collegeData.data.forEach((college: any) => {
      // Safety check for available_silos
      if (!college.available_silos || !Array.isArray(college.available_silos)) {
        console.warn(
          `College ${college.slug} (${college.id}) has no available_silos data`,
        );
        return;
      }

      // Get tabs that have actual content in the database
      const availableTabs = college.available_silos
        .map((silo: string) => siloToTabMapping[silo])
        .filter((tab: string | undefined): tab is string => Boolean(tab)); // Remove undefined mappings

      // Apply parent/non-parent filtering
      let filteredTabs: string[];
      if (college.is_parent === true) {
        // For parent colleges: remove restricted tabs
        filteredTabs = availableTabs.filter(
          (tab: string) => !parentRestrictedTabs.includes(tab),
        );
      } else {
        // For non-parent colleges: remove restricted tabs
        filteredTabs = availableTabs.filter(
          (tab: string) => !nonParentRestrictedTabs.includes(tab),
        );
      }

      // Generate routes for this college with filtered tabs
      const routesForCollege = filteredTabs.map((tab: string) => ({
        url: `${baseUrl}/university/${tagSanatize(college.slug)}-${
          college.id
        }/${tab}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

      collegeRoutes.push(...routesForCollege);
    });

    console.log(
      `Generated ${collegeRoutes.length} college routes for ${collegeData.data.length} colleges based on actual content`,
    );
    return collegeRoutes;
  } catch (error) {
    console.error("Error generating college URLs:", error);
    return [];
  }
}

// Helper function to escape XML entities
function escapeXml(unsafe: string): string {
  const entityMap: Record<string, string> = {
    "&": "&",
    "<": "<",
    ">": ">",
    '"': '"',
    "'": "&#39;",
  };

  return unsafe
    .replace(/[&<>"']/g, (match) => entityMap[match])
    .replace(/\r\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .trim();
}

export async function generateCourseUrls() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL not configured, skipping course routes");
    return [];
  }

  try {
    const courseData = await fetchWithRetry(`${apiUrl}/api/v1/courses/all`);

    if (!courseData) {
      return [];
    }

    const courseRoutes = courseData.data.map((course: any) => {
      // Create URL-friendly course slug
      const courseSlug = course.name
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        url: escapeXml(
          `${baseUrl}/university/${tagSanatize(course.college.slug)}-${
            course.college.id
          }/courses-${courseSlug}-${course.id}`,
        ),
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      };
    });

    console.log(`Generated ${courseRoutes.length} course routes`);
    return courseRoutes;
  } catch (error) {
    console.error("Error generating course URLs:", error);
    return [];
  }
}
