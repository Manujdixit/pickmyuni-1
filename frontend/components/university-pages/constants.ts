export const validTabs = [
  "info",
  "campuses",
  "courses",
  "careers",
  "ranking",
  "fees",
  "scholarships",
  "news",
  "facilities",
  "accommodations",
  "reviews",
  "faqs",
  "more",
];

export type TabType = (typeof validTabs)[number];

export const tabTitles = {
  info: "Information",
  courses: "Courses",
  campuses: "Campuses",
  careers: "Careers",
  ranking: "Rankings",
  fees: "Fees",
  scholarships: "Scholarships",
  accommodations: "Accommodations",
  facilities: "Facilities",
  news: "News",
  reviews: "Reviews",
  faqs: "FAQs",
  more: "More",
};

// Function to get dynamic metadata based on tab
export const getDynamicMetadata = (
  tab: string,
  universityName: string,
  slugAndId: string,
  currentTab: string,
  college: any,
) => {
  switch (tab) {
    case "info":
      if (college?.is_parent) {
        return {
          title: `${universityName} Campuses | University Locations | PickMyUni Australia`,
          description: `Explore ${universityName} on PickMyUni — find popular courses, read student reviews, check campus details, and get help with course transfers or switching universities in Australia.`,
        };
      }
      return {
        title: `${college.location}, ${college.college_name} | Campus Info, Reviews & Transfers`,
        description: `Learn about ${college.location} at ${college.college_name} — location, facilities, accomodations, and student reviews. Use PickMyUni to explore your options or get help transferring to this campus.`,
      };

    case "courses":
      if (college?.is_parent) {
        return {
          title: `${universityName} Courses | Degrees, Programs & Study Options`,
          description: `Browse all courses at ${universityName} — from undergraduate to postgraduate programs. Compare study options, read reviews, and get help switching to the right course with PickMyUni.`,
        };
      }
      return {
        title: `Courses at ${college.location}, ${universityName} | Campus Programs & Degrees`,
        description: `Explore all courses available at ${college.location}, ${universityName}. Find campus-specific study options, compare programs, and get expert help with course transfers on PickMyUni.`,
      };

    case "campuses":
      return {
        title: `${universityName} Campuses in Australia | Locations, Facilities & Transfers`,
        description: `Explore all ${universityName} campuses across Australia. Compare locations, student facilities, transport access, and get help transferring to your preferred campus with PickMyUni.`,
      };

    case "careers":
      if (college?.is_parent) {
        return {
          title: `Careers After Studying at ${universityName} | Graduate Outcomes & Job Paths`,
          description: `See where a degree from ${universityName} can take you. Explore career outcomes, graduate salaries, and job-ready programs. PickMyUni helps you choose courses that lead to real opportunities.`,
        };
      }
      return {
        title: `Careers at ${college.location}, ${universityName} | Jobs, Internships & Graduate Support`,
        description: `Find out what career services are available at ${college.location}, ${universityName}. Learn about internships, job support, employer events, and how the campus helps students get career-ready.`,
      };

    case "ranking":
      return {
        title: `${universityName} Rankings 2025 | National & Global Ratings`,
        description: `See how ${universityName} ranks in 2025 across QS, THE, and Australian university ratings. Compare global standings, subject rankings, and student satisfaction on PickMyUni.`,
      };

    case "fees":
      if (college?.is_parent) {
        return {
          title: `${universityName} Fees 2025 | Costs for International & Domestic Students`,
          description: `Check estimated tuition fees at ${universityName} for 2025. View course costs for international and domestic students, plus get help comparing unis or planning your next course transfer on PickMyUni.`,
        };
      }
      return {
        title: `${college.location}, ${universityName} Fees 2025 | Costs for International & Domestic Students`,
        description: `Check estimated tuition fees at ${college.location}, ${universityName} for 2025. View course costs for international and domestic students, plus get help comparing unis or planning your next course transfer on PickMyUni.`,
      };

    case "scholarships":
      return {
        title: `${universityName} Scholarships & Financial Aid | Offers`,
        description: `Explore available scholarships at ${universityName} — merit-based, need-based, and international student offers. Find out what's available and how to apply with PickMyUni.`,
      };

    case "news":
      if (college?.is_parent) {
        return {
          title: `${universityName} News & Updates | Latest Announcements`,
          description: `Stay updated with ${universityName} latest news, events, and announcements. Get campus news, research updates, and important information about ${universityName} in Australia.`,
        };
      }
      return {
        title: `${college.location}, ${universityName} News & Updates | Latest Announcements`,
        description: `Stay updated with ${college.location}, ${universityName} latest news, events, and announcements. Get campus news, research updates, and important information about ${college.location}, ${universityName} in Australia.`,
      };

    case "facilities":
      return {
        title: `${college.location}, ${universityName} | Campus Facilities & Student Life`,
        description: `Get a closer look at the facilities at ${college.location}, ${universityName} — study spaces, labs, cafes, housing, and more. Find out what students can expect from campus life with PickMyUni.`,
      };

    case "accommodations":
      return {
        title: `${college.location}, ${universityName} Accommodation | On-Campus & Nearby Housing`,
        description: `Explore accommodation options at ${college.location}, ${universityName}. Check availability, living arrangements, and student-friendly housing near campus — all in one place with PickMyUni.`,
      };

    case "reviews":
      if (college?.is_parent) {
        return {
          title: `${universityName} Student Reviews & Ratings | University Experience`,
          description: `Read ${universityName} student reviews and ratings. Get honest feedback about courses, campus life, facilities, and overall student experience at ${universityName} in Australia.`,
        };
      }
      return {
        title: `${college.location}, ${universityName} Reviews | Real Student Feedback`,
        description: `Read verified reviews for ${college.location}, ${universityName}. Hear what students say about campus life, facilities, teaching quality, and more on PickMyUni.`,
      };

    case "faqs":
      if (college?.is_parent) {
        return {
          title: `${universityName} FAQs | Student Questions & Expert Answers`,
          description: `Got questions about studying at ${universityName}? Browse popular student FAQs or ask your own. PickMyUni connects you with expert answers and real student experiences.`,
        };
      }
      return {
        title: `${college.location}, ${universityName} FAQs | Student Questions & Expert Answers`,
        description: `Learn what students are asking about ${college.location}, ${universityName}. Browse common questions or submit your own to get helpful answers from the PickMyUni community.`,
      };

    case "more":
      if (college?.is_parent) {
        return {
          title: `${universityName} Additional Information | More Details`,
          description: `Find additional information about ${universityName} including contact details, admission requirements, important dates, and other resources for prospective students in Australia.`,
        };
      }
      return {
        title: `${college.location}, ${universityName} Additional Information | More Details`,
        description: `Find additional information about ${college.location}, ${universityName} including contact details, admission requirements, important dates, and other resources for prospective students in Australia.`,
      };

    default:
      return {
        title: `${universityName} ${tabTitles[tab as keyof typeof tabTitles] || "Information"}`,
        description: `Explore ${tabTitles[tab as keyof typeof tabTitles]?.toLowerCase() || "information"} for ${universityName}. Get detailed information about this Australian university.`,
      };
  }
};
