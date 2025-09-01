"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import Image from "next/image";
import { useTopCollegesByType } from "@/hooks/useTopCollegesByType";
import type { College } from "@/hooks/useTopCollegesByType";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";

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
                ? `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${data?.bg_url}`
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
    trigger: "What does public university mean in Australia?",
    content:
      "A public university in Australia is an institution primarily funded by the government, offering a wide range of undergraduate and postgraduate programs. These universities follow national education policies and focus on research, academic excellence, and accessibility.",
  },
  {
    trigger: "What is the best public university in Australia?",
    content:
      "The top-ranked public university in Australia varies based on global rankings, but The University of Melbourne is often regarded as the best due to its strong research output, high employability rates, and global reputation.",
  },
  {
    trigger: "Are there any public universities in Australia?",
    content:
      "Yes, Australia has 37 public universities, which dominate the higher education sector. These institutions are government-funded and provide quality education across various disciplines.",
  },
  {
    trigger: "Are public universities free in Australia?",
    content:
      "Public universities are not entirely free, but Australian citizens and permanent residents can access HECS-HELP, a government loan scheme that allows students to defer tuition fees and repay them later through their income.",
  },
  {
    trigger: "Which is better, private or public university?",
    content:
      "Public universities are generally preferred due to their strong reputation, research facilities, and lower tuition fees compared to private institutions. However, private universities may offer smaller class sizes and specialized programs that cater to specific needs.",
  },
  {
    trigger:
      "What is the difference between an open university and a public university?",
    content:
      "An open university offers flexible, online, or distance learning without strict entry requirements, making education more accessible. A public university, on the other hand, operates traditionally with campus-based learning, competitive admissions, and a broader academic structure.",
  },
  {
    trigger: "Is UNSW public or private?",
    content:
      "The University of New South Wales (UNSW) is a public university funded by the Australian government, recognized globally for its research, innovation, and high academic standards.",
  },
];

const tips = [
  {
    title: "Compare Tuition Fees",
    description:
      "Use platforms like FindMyUni to compare tuition fees of various Australian cheap universities.",
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

export default function PrivacyPage() {
  const { colleges, loading, error } = useTopCollegesByType("government");

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
            Fortunately, there are Australian cheap universities and colleges
            that provide quality education at a lower cost. This page highlights
            some of the cheapest universities in Australia and explains how
            FindMyUni can help international students select the right course
            and institution for their budget and academic goals. We also help
            you transfer from your current university to an affordable
            university in Australia. 
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Why Study at Affordable Universities{" "}
              <span className="text-brand-secondary">in Australia?</span>
            </h2>
            <p className="text-center">
              Level 1 universities in Australia are the most reputable and
              highly ranked institutions in the country. These universities
              provide exceptional benefits to students, making them the
              preferred choice for those seeking excellence in higher education.
            </p>
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

        {!error && (
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
              {loading
                ? Array.from({ length: 10 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-72 w-full rounded-lg" />
                  ))
                : colleges.map((data: College, idx: number) => (
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
                How FindMyUni Can Help You Choose the{" "}
                <span className="text-brand-secondary">Right University</span>
              </h2>
              <p className="text-center text-white">
                Selecting the right university can be overwhelming, but
                FindMyUni is here to simplify the process. As an
                Australian-based platform dedicated to assisting international
                students, FindMyUni offers:
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
                  FindMyUni is committed to helping international students make
                  informed decisions about their education in Australia. Our
                  team is here to guide you in selecting the right course and
                  institution that fits your budget and career aspirations. Get
                  in touch with FindMyUni today and take the first step toward
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
                  <AccordionTrigger className="text-brand-primary text-start text-xl font-semibold">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="p-4 text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
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
