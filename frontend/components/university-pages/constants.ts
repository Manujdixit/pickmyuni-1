export const validTabs = [
  "info",
  "courses",
  "campuses",
  "careers",
  "ranking",
  "fees",
  "scholarships",
  "placement",
  "faqs",
] as const;

export type TabType = (typeof validTabs)[number];

export const tabTitles: Record<TabType, string> = {
  info: "Information",
  courses: "Courses",
  campuses: "Campuses",
  careers: "Careers",
  ranking: "Rankings",
  fees: "Fees",
  scholarships: "Scholarships",
  placement: "Placements",
  faqs: "FAQs",
};

export const endpointMap: Record<TabType, string> = {
  info: "/api/v1/college/info",
  courses: "/api/v1/college/courses",
  campuses: "/api/v1/college/suggest",
  careers: "/api/v1/college/careers",
  ranking: "/api/v1/college/ranking",
  fees: "/api/v1/college/fees",
  scholarships: "/api/v1/college/scholarships",
  faqs: "/api/v1/college/faqs",
  placement: "/api/v1/college/placement",
};
