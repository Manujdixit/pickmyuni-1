import { TabType, endpointMap } from "./constants";
import { TabDataResponse } from "./types";

const getEndpointForTab = (tab: TabType, id: number): string | null => {
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const endpoint = endpointMap[tab];
  return endpoint ? `${baseUrl}${endpoint}/${id}` : null;
};

const extractTabContent = (tab: TabType, data: any): any[] => {
  switch (tab) {
    case "info":
      return data.info_content || [];
    case "courses":
      return data;
    case "campuses":
      return data;
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

export async function getTabData(
  tab: TabType,
  id: number,
): Promise<TabDataResponse> {
  try {
    const endpoint = getEndpointForTab(tab, id);

    if (!endpoint) {
      return {
        info: [
          {
            title: `${tab.charAt(0).toUpperCase() + tab.slice(1)} Information`,
            content: `${
              tab.charAt(0).toUpperCase() + tab.slice(1)
            } information will be available soon. Please check back later.`,
          },
        ],
        error: null,
      };
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${tab} information: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      const content = extractTabContent(tab, data.data);
      return { info: content, error: null };
    } else {
      throw new Error(data.message || `Failed to fetch ${tab} information`);
    }
  } catch (error) {
    console.error(`Error fetching ${tab} data:`, error);
    return {
      info: [],
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
