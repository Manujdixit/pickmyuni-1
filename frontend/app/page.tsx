import { Metadata } from "next";
import dynamic from "next/dynamic";
import { WebsiteSchema } from "@/components/seo";

const HeroSection = dynamic(() => import("@/components/home/Hero"));
const UniversitiesSection = dynamic(
  () => import("@/components/home/universities"),
);
const CostComparisonSection = dynamic(
  () => import("@/components/home/costComparison"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials"),
);
const ProcessSection = dynamic(() => import("@/components/home/process"));
const ArticlesSection = dynamic(() => import("@/components/home/articles"));

export const metadata: Metadata = {
  title:
    "PickMyUni | Find, Compare & Switch to the Right Australian University",
  description:
    "Australia’s trusted student platform to compare universities, switch courses, and read student reviews. Get expert help to find the right uni for your future.",
  keywords: [
    "Australian universities",
    "study in Australia",
    "international students Australia",
    "university comparison Australia",
    "higher education Australia",
    "university admission Australia",
    "Australian education",
    "study abroad Australia",
    "university search",
    "student visa Australia",
    "university rankings Australia",
  ],
  openGraph: {
    title: "PickMyUni - Find the Perfect Australian University",
    description:
      "Discover and compare top Australian universities. Your gateway to studying in Australia.",
    type: "website",
    url: "https://pickmyuni.com",
    siteName: "PickMyUni",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickMyUni - Find the Perfect Australian University",
    description:
      "Discover and compare top Australian universities. Your gateway to studying in Australia.",
  },
};

export default function Home() {
  return (
    <>
      <WebsiteSchema />
      <main className="min-h-screen">
        <HeroSection />
        <UniversitiesSection />
        <CostComparisonSection />
        <TestimonialsSection />
        <ProcessSection />
        <ArticlesSection />
      </main>
    </>
  );
}
