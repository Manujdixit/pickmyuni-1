import { Metadata } from "next";
import { TabType, tabTitles } from "./constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugAndId: string; tab: string[] }>;
}): Promise<Metadata> {
  const { slugAndId, tab } = await params;
  const currentTab = (tab?.[0] || "info") as TabType;
  const id = slugAndId.split("-").pop();

  if (!id || isNaN(Number(id))) {
    return {
      title: "University Not Found",
      description: "The requested university could not be found.",
    };
  }

  const universityName = slugAndId
    .split("-")
    .slice(0, -1)
    .join(" ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const tabTitle = tabTitles[currentTab] || "Information";

  return {
    title: `${universityName} ${tabTitle} - PickMyUni`,
    description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
    openGraph: {
      title: `${universityName} ${tabTitle} - PickMyUni`,
      description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
      url: `https://pickmyuni.com/university/${slugAndId}/${currentTab}`,
      siteName: "PickMyUni",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${universityName} ${tabTitle} - PickMyUni`,
      description: `Explore ${tabTitle.toLowerCase()} for ${universityName}. Get detailed information about this Australian university.`,
    },
  };
}
