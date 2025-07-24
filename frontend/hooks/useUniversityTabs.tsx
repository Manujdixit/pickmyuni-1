import { useState, useEffect } from "react";
// import axios from "axios";

export const useUniversityTabs = (tab: string, id: number) => {
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTabInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = getEndpointForTab(tab, id);

        if (!endpoint) {
          setInfo([
            {
              title: `${
                tab.charAt(0).toUpperCase() + tab.slice(1)
              } Information`,
              content: `${
                tab.charAt(0).toUpperCase() + tab.slice(1)
              } information will be available soon. Please check back later.`,
            },
          ]);
          setLoading(false);
          return;
        }

        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          const content = extractTabContent(tab, data.data);
          setInfo(content);
        } else {
          setError(data.message || `Failed to fetch ${tab} information`);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : `Failed to fetch ${tab} information`,
        );
        setInfo([]);
      } finally {
        setLoading(false);
      }
    };

    if (id && tab) {
      fetchTabInfo();
    }
  }, [tab, id]);

  return { info, loading, error };
};

// Helper function to map tab names to API endpoints
const getEndpointForTab = (tab: string, id: number): string | null => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const endpointMap: { [key: string]: string | null } = {
    info: `${baseUrl}/api/v1/college/info/${id}`,
    courses: `${baseUrl}/api/v1/college/courses/${id}`,
    campuses: `${baseUrl}/api/v1/college/campuses/${id}`,
    careers: `${baseUrl}/api/v1/college/careers/${id}`,
    ranking: `${baseUrl}/api/v1/college/ranking/${id}`,
    fees: `${baseUrl}/api/v1/college/fees/${id}`,
    scholarships: `${baseUrl}/api/v1/college/scholarships/${id}`,
    faqs: `${baseUrl}/api/v1/college/faqs/${id}`,
    // reviews: `${baseUrl}/api/v1/college/reviews/${id}`,
    placement: `${baseUrl}/api/v1/college/placement/${id}`,
  };

  return endpointMap[tab] || null;
};

// Helper function to extract content from API response
const extractTabContent = (tab: string, data: any): any[] => {
  switch (tab) {
    case "info":
      return data.info_content || [];
    case "courses":
      // For courses, combine course_content and courses list
      const content = [];
      if (data.course_content) {
        content.push(data.course_content);
      }
      if (data.courses && data.courses.length > 0) {
        content.push({
          title: "Available Courses",
          content: `
            <div class="grid gap-4">
              ${data.courses
                .map(
                  (course: any) => `
                <div class="border rounded-lg p-4">
                  <h4 class="font-semibold text-brand-primary">Course ID: ${course.course_id}</h4>
                  <p class="text-gray-600">College ID: ${course.college_id}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `,
        });
      }
      return content;
    case "campuses":
      return data.department ? [data.department] : [];
    case "careers":
      return data.career ? [data.career] : [];
    case "ranking":
      return data.rankings ? [data.rankings] : [];
    case "fees":
      return data.fees ? [data.fees] : [];
    case "scholarships":
      return data.scholarship ? [data.scholarship] : [];
    case "placement":
      return data.placement ? [data.placement] : [];
    case "faqs":
      return data.faq ? [data.faq] : [];
    default:
      return [];
  }
};
