import { tagSanatize } from "@/utils/tagsanatize";
import { MetadataRoute } from "next";

type ApiResponse = {
  success: boolean;
  data: Array<{
    id: string;
    slug: string;
  }>;
};

// Fetch data with retry logic and timeout
async function fetchWithRetry(
  url: string,
  retries = 2,
  timeout = 5000,
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pickmyuni.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Static routes with better organization
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/student-resources`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/top-universities-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/transfer-assistance`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pr-courses-in-australia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Skip dynamic routes if API URL is not configured
  if (!apiUrl) {
    console.warn("NEXT_PUBLIC_API_URL not configured, skipping dynamic routes");
    return staticRoutes;
  }

  // Fetch dynamic routes in parallel for better performance
  const [cityData, articleData, collegeData] = await Promise.allSettled([
    fetchWithRetry(`${apiUrl}/api/v1/city/`),
    fetchWithRetry(`${apiUrl}/api/v1/articles/`),
    fetchWithRetry(`${apiUrl}/api/v1/college/`),
  ]);

  // Process city routes
  let cityRoutes: MetadataRoute.Sitemap = [];
  if (cityData.status === "fulfilled" && cityData.value) {
    cityRoutes = cityData.value.data.map((city) => ({
      url: `${baseUrl}/city/${tagSanatize(city.slug)}-${city.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    console.log(`Generated ${cityRoutes.length} city routes`);
  }

  // Process article routes
  let articleRoutes: MetadataRoute.Sitemap = [];
  if (articleData.status === "fulfilled" && articleData.value) {
    articleRoutes = articleData.value.data.map((article) => ({
      url: `${baseUrl}/student-resources/${tagSanatize(article.slug)}-${
        article.id
      }`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
    console.log(`Generated ${articleRoutes.length} article routes`);
  }

  // Process college routes
  let collegeRoutes: MetadataRoute.Sitemap = [];
  if (collegeData.status === "fulfilled" && collegeData.value) {
    const universityPaths = [
      "info",
      "courses",
      "campuses",
      "careers",
      "ranking",
      "fees",
      "scholarships",
      "placement",
      "faqs",
    ];

    collegeRoutes = collegeData.value.data.flatMap((college) =>
      universityPaths.map((path) => ({
        url: `${baseUrl}/university/${tagSanatize(college.slug)}-${
          college.id
        }/${path}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
    );
    console.log(`Generated ${collegeRoutes.length} college routes`);
  }

  const totalRoutes =
    staticRoutes.length +
    cityRoutes.length +
    articleRoutes.length +
    collegeRoutes.length;
  console.log(`Sitemap generated with ${totalRoutes} total routes`);

  return [...staticRoutes, ...articleRoutes, ...cityRoutes, ...collegeRoutes];
}
