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
    "PickMyUni - Find the Perfect Australian University for International Students",
  description:
    "Discover and compare top Australian universities. Get expert guidance on courses, fees, admission requirements, and student services. Your gateway to studying in Australia starts here.",
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
  // FAQ data for structured data
  const faqs = [
    {
      question: "How do I choose the right university in Australia?",
      answer:
        "Consider factors like course offerings, location, fees, rankings, and student support services. Use PickMyUni's comparison tools to evaluate multiple universities based on your preferences.",
    },
    {
      question:
        "What are the admission requirements for Australian universities?",
      answer:
        "Requirements vary by university and course. Generally, you'll need academic transcripts, English language test scores (IELTS/TOEFL), and may need additional documents like portfolios or work experience.",
    },
    {
      question: "How much does it cost to study in Australia?",
      answer:
        "Tuition fees range from AUD 20,000 to AUD 50,000+ per year for international students, depending on the course and university. Living costs vary by city, typically AUD 18,000-25,000 per year.",
    },
    {
      question: "Can I work while studying in Australia?",
      answer:
        "Yes, student visa holders can work up to 48 hours per fortnight during studies and unlimited hours during breaks. This helps cover living expenses and gain work experience.",
    },
  ];

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
