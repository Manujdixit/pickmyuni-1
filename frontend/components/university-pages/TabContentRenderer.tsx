import React from "react";
import { TabType } from "./constants";
import dynamic from "next/dynamic";

const CoursesContent = dynamic(() =>
  import("@/components/university-pages/CoursesContent").then(
    (mod) => mod.CoursesContent,
  ),
);

const CampusesContent = dynamic(() =>
  import("@/components/university-pages/CampusesContent").then(
    (mod) => mod.CampusesContent,
  ),
);

const DefaultContent = dynamic(() =>
  import("@/components/university-pages/DefaultContent").then(
    (mod) => mod.DefaultContent,
  ),
);

interface TabContentRendererProps {
  currentTab: TabType;
  data: any;
}

export const TabContentRenderer: React.FC<TabContentRendererProps> = ({
  currentTab,
  data,
}) => {
  switch (currentTab) {
    case "campuses":
      return <CampusesContent data={data} />;
    case "courses":
      return <CoursesContent data={data} />;
    default:
      return <DefaultContent data={data} />;
  }
};
