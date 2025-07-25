import { TabType } from "./constants";

export interface TabDataResponse {
  info: any[];
  error: string | null;
}

export interface UniversityParams {
  slugAndId: string;
  tab: string[];
}

export interface Course {
  name: string;
  level: string;
  tution_fees: number | null;
  hostel_fees: number | null;
  other_fees: number | null;
  one_time_fees: number | null;
  duration_in_months: number | null;
}

export interface CourseData {
  relatedCourses: Course[];
  college: {
    college_name: string;
  };
}

export interface TabPageProps {
  params: Promise<UniversityParams>;
}
