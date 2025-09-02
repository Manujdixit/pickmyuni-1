export interface College {
  id: number;
  college_name: string;
  location: string;
  rating: number;
  score: number;
  slug: string;
}

export interface Course {
  id: number;
  course_name: string;
  duration_in_months: number;
  rating: number;
  score: number;
}

export interface Article {
  id: number;
  title: string;
  meta_desc: string;
  silos: string;
  content: string;
  img1?: string;
  createdAt: string;
  slug: string;
  keywords?: string;
}

export interface SearchResults {
  colleges: College[];
  courses: Course[];
  articles: Article[];
}
