import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import Image from "next/image";
import type { College } from "@/hooks/useTopCollegesByType";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Affordable Universities in Australia",
  description:
    "Discover the most affordable universities in Australia for international students. Compare tuition fees, find cheap universities in Sydney, Melbourne, and regional areas. Get admission guidance and scholarship information.",
  keywords: [
    "affordable universities Australia",
    "cheap universities Australia",
    "low cost universities Australia",
    "budget universities Australia",
    "affordable tuition Australia",
    "cheap universities Sydney",
    "cheap universities Melbourne",
    "University of Sunshine Coast",
    "Charles Darwin University",
    "Federation University",
    "international students Australia",
    "university fees Australia",
    "scholarships Australia",
  ],
  authors: [{ name: "PickMyUni" }],
  creator: "PickMyUni",
  publisher: "PickMyUni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const sec1CardData = [
  {
    title: "Cost-Effective Education",
    description:
      "Affordable universities in Australia offer lower tuition fees without compromising the quality of education, making it easier for students to manage their expenses.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/globally-recognized-degrees-icon.webp",
  },
  {
    title: "Scholarship Opportunities",
    description:
      "Many cheap universities in Australia provide scholarships and financial aid to help reduce costs further.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/high-quality-education-icon.webp",
  },
  {
    title: "Industry-Focused Courses",
    description:
      "These Australian cheap universities design their courses to align with industry requirements, increasing employability after graduation.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/advanced-research-opportunities-icon.webp",
  },
  {
    title: "Pathway to Permanent Residency",
    description:
      "Completing a course at an accredited institution can improve a student's chances of obtaining work visas and permanent residency in Australia.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Diverse Student Community",
    description:
      "Even at budget-friendly universities, international students can experience Australia's cultural diversity and make valuable global connections.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
];

const sec3CardData = [
  {
    title: "University and Course Comparisons",
    description:
      "FindMyUni helps students compare tuition fees, course structures, and career prospects across various cheap universities in Australia.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_rankings_icon.webp",
  },
  {
    title: "Guidance on Visa and Admissions",
    description:
      "Our team provides expert assistance with student visa applications and university admissions to make the process seamless.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accreditation-Reputation-icon.webp",
  },
  {
    title: "Scholarship Assistance",
    description:
      "We assist students in finding and applying for scholarships to reduce their financial burden at Australian cheap universities.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/course-offerings-icon.webp",
  },
  {
    title: "Internship and Job Placement Support",
    description:
      "FindMyUni connects students with internship and job opportunities to gain valuable work experience while studying.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry-partnerships-icon.webp",
  },
  {
    title: "Personalized Consultation",
    description:
      "Our education consultants provide one-on-one support to help students make informed decisions based on their budget and career goals.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/alumni-success-icon.webp",
  },
  {
    title: "Course/University Transfer",
    description:
      "Due to various reasons, international students looking for university transfer assistance, and we are here to help you in possible ways.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/alumni-success-icon.webp",
  },
];

const sec1Cards = (data: any, fullHeight = false) => {
  return (
    <div
      className={`flex w-full flex-col items-center space-y-2 rounded-md bg-[#F6F6F7] p-4 shadow hover:shadow-md sm:items-start ${fullHeight ? "h-full" : ""}`}
    >
      <Image
        src={data.url}
        alt={data.title}
        width={80}
        height={80}
        className="size-20"
      />
      <p className="text-brand-primary text-xl font-semibold">{data.title}</p>
      <p className="text-base font-normal">{data.description}</p>
    </div>
  );
};

const sec2Cards = (data: College, idx: number) => {
  return (
    <div className="group relative h-72 w-full overflow-hidden rounded-lg">
      <Link href={`/university/${data?.slug}-${data?.id}/info`}>
        <div className="relative h-full w-full">
          <Image
            src={
              data?.bg_url
                ? data?.bg_url.includes(
                    "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/",
                  )
                  ? `${data?.bg_url}`
                  : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${data?.bg_url}`
                : "/transfer.svg"
            }
            alt={data.college_name}
            fill
            className="cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
          />
          {/* Overlay covers the complete image */}
          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/40 to-transparent transition-all duration-300 group-hover:bg-black/30" />
        </div>
        <div className="absolute bottom-0 z-10 w-full p-4">
          <h3 className="line-clamp-1 text-xl font-semibold text-white group-hover:line-clamp-2">
            {data.college_name}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const sec3Cards = (data: any, idx: number) => {
  return (
    <div className="space-y-2">
      <Image
        src={data.url}
        alt={data.title}
        width={72}
        height={72}
        className="size-18"
      />
      <p className="text-brand-primary text-xl font-semibold">{data.title}</p>
      <p className="text-base font-normal">{data.description}</p>
    </div>
  );
};

const accordionData = [
  {
    trigger: "Which university has the lowest tuition fees in Australia?",
    content:
      "The University of the Sunshine Coast (USC) and Charles Darwin University (CDU) are among the most affordable universities in Australia, with tuition fees starting from around AUD 24,000 per year for international students.",
  },
  {
    trigger: "Where is the cheapest place to study in Australia?",
    content:
      "Regional cities like Hobart, Darwin, and Rockhampton offer lower living costs and affordable universities compared to major cities like Sydney and Melbourne, making them the cheapest places to study in Australia.",
  },
  {
    trigger: "What is the cheapest degree to study in Australia?",
    content:
      "Degrees in education, nursing, and humanities generally have lower tuition fees compared to medicine, engineering, or business, with some starting at around AUD 20,000–25,000 per year.",
  },
  {
    trigger: "Which course has the lowest fees in Australia?",
    content:
      "Vocational and diploma courses in fields like hospitality, aged care, and IT often have the lowest tuition fees, sometimes starting as low as AUD 6,000 per year.",
  },
  {
    trigger: "What is the cheapest uni in Australia?",
    content:
      "Charles Darwin University, Federation University, and the University of the Sunshine Coast are some of the most affordable universities in Australia, offering budget-friendly tuition fees for both domestic and international students.",
  },
];

const tips = [
  {
    title: "Compare Tuition Fees",
    description:
      "Use platforms like pickmyuni.com to compare tuition fees of various Australian cheap universities.",
  },
  {
    title: "Check Accreditation and Reputation",
    description:
      "Ensure that the institution is recognized by the Australian government and offers quality education.",
  },
  {
    title: "Look for Scholarships and Discounts",
    description:
      "Many affordable universities in Australia offer discounts or financial aid for international students.",
  },
  {
    title: "Consider Location",
    description:
      "Studying in smaller cities or regional areas can help reduce living expenses compared to studying in metropolitan areas.",
  },
  {
    title: "Explore Online and Hybrid Learning",
    description:
      "Some of the cheapest universities in Australia offer online courses at reduced costs, which can be a more affordable option.",
  },
];

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: accordionData.map((item) => ({
    "@type": "Question",
    name: item.trigger,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.content.replace(/<[^>]*>/g, "").trim(), // Remove HTML tags for plain text
    },
  })),
};

export default async function PrivacyPage() {
  let colleges: College[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/top-type?type=government`,
    );
    if (!res.ok) throw new Error("Failed to fetch colleges");
    const data = await res.json();
    colleges = data?.data?.colleges || [];
  } catch (err: any) {
    error = err.message || "Unknown error";
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="min-h-screen bg-white text-[#242628]">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <Image
            src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/level-1-banner.webp"
            alt="Library with books on shelves"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto pb-8">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Get Admission in Affordable University in Australia
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Australia is a dream destination for many international students,
            offering world-class education, vibrant multicultural cities, and
            promising career opportunities. However, the cost of studying in
            Australia can be a significant concern for many students.
            Fortunately, there are{" "}
            <strong>Australian cheap universities</strong> and colleges that
            provide quality education at a lower cost. This page highlights some
            of the <strong>cheapest universities in Australia</strong> and
            explains how FindMyUni can help international students select the
            right course and institution for their budget and academic goals. We
            also help you transfer from your current university to an affordable
            university in Australia.
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Why Study at Affordable Universities{" "}
              <span className="text-brand-secondary">in Australia?</span>
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {sec1CardData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col items-center bg-[#F6F6F7]"
                >
                  {sec1Cards(data, true)}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <div className="bg-brand-secondary py-24">
            <div className="container flex flex-col items-center gap-8 text-white lg:flex-row">
              <div className="flex-1">
                <h2 className="text-h1 leading-tight text-white">
                  How to Find Cheap Universities{" "}
                  <span className="text-brand-primary">in Australia?</span>
                </h2>
                <p>
                  Finding an affordable university in Australia involves
                  research and planning. Here are some effective ways to locate
                  cheap universities in Australia:
                </p>
                <br />
                <ul className="space-y-4">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        fill="#2C5680"
                        className="mt-1 h-6 w-6 flex-shrink-0"
                      />
                      <p className="text-base">
                        <span className="text-brand-primary font-semibold">
                          {tip.title}:{" "}
                        </span>
                        <span className="text-white/90">{tip.description}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/3">
                <div className="relative">
                  <Image
                    src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/cheap-level-1-universities-in-australia.webp"
                    alt="Graduate student celebrating"
                    width={400}
                    height={500}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <></>
        ) : (
          <section className="container mx-auto flex flex-col justify-center py-24">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              List of Affordable Universities{" "}
              <span className="text-brand-secondary">in Australia</span>
            </h2>
            <p className="mb-2 text-center">
              Below is a list of some of the{" "}
              <strong>cheapest universities in Australia</strong>, offering
              cost-effective education to international students.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {colleges.map((data: College, idx: number) => (
                <div
                  key={data.id}
                  className="flex h-full flex-col items-center bg-[#F6F6F7] shadow hover:shadow-md"
                >
                  {sec2Cards(data, idx)}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="bg-brand-primary py-24">
            <div className="container mx-auto flex flex-col justify-center">
              <h2 className="mb-4 text-center text-4xl font-semibold text-white">
                How PickMyUni Can Help You Choose the{" "}
                <span className="text-brand-secondary">Right University</span>
              </h2>
              <p className="text-center text-white">
                Selecting the right university can be overwhelming, but
                PickMyUni is here to simplify the process. As an
                Australian-based platform dedicated to assisting international
                students, PickMyUni offers:
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {sec3CardData.map((data, idx) => (
                  <div
                    key={idx}
                    className={`flex h-full flex-col items-center rounded-2xl bg-white p-4 shadow hover:shadow-md`}
                  >
                    {sec3Cards(data, idx)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-brand-secondary py-24">
            <div className="container flex flex-col items-center gap-8 text-white lg:flex-row-reverse">
              <div className="flex-1">
                <h2 className="text-h1 leading-tight text-white">Conclusion</h2>
                <p>
                  Studying in Australia doesn’t have to be expensive. With the
                  right research and guidance, international students can find
                  affordable universities in Australia that offer quality
                  education. Whether you’re looking for diploma courses,
                  undergraduate programs, or vocational training, the
                  institutions listed above provide cost-effective options.
                </p>
                <br />
                <p>
                  PickMyUni is committed to helping international students make
                  informed decisions about their education in Australia. Our
                  team is here to guide you in selecting the right course and
                  institution that fits your budget and career aspirations. Get
                  in touch with PickMyUni today and take the first step toward
                  achieving your academic dreams in Australia!
                </p>
              </div>

              <div className="lg:w-3/7">
                <div className="relative">
                  <Image
                    src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/cheap-level-1-universities-in-australia.webp"
                    alt="Graduate student celebrating"
                    width={400}
                    height={500}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container flex flex-col items-center gap-8 py-24">
          <h2 className="text-brand-primary text-center text-h1 leading-tight">
            FAQs on Affordable Universities
            <span className="text-brand-secondary"> in Australia</span>
          </h2>
          <div className="mx-auto w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {accordionData.map((item, idx) => (
                <AccordionItem key={idx} value={idx.toString()}>
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
}
