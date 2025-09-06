import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import Image from "next/image";
import type { College } from "@/hooks/useTopCollegesByType";
import Link from "next/link";
import UniversityComparisonTable from "@/components/UniversityComparisonTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Universities in Australia",
  description:
    "Discover the best private universities in Australia for international students. Compare top private colleges, admission requirements, fees, and career opportunities. Find your ideal private university in Sydney, Melbourne, and more.",
  keywords: [
    "private universities Australia",
    "private colleges Australia",
    "best private universities Australia",
    "private universities Sydney",
    "private universities Melbourne",
    "international students Australia",
    "private university fees",
    "private university admission",
    "Bond University",
    "Torrens University",
    "private vs public universities Australia",
  ],
  authors: [{ name: "PickMyUni" }],
  creator: "PickMyUni",
  publisher: "PickMyUni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pickmyuni.com"),
  alternates: {
    canonical: "/private-universities-in-australia",
  },
};

const sec1CardData = [
  {
    title: "Smaller Class Sizes",
    description:
      "With fewer students per class, you receive personalized attention from lecturers and professors.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/smaller-class-sizes-icon.webp",
  },
  {
    title: "Flexible Admission Process",
    description:
      "Many private universities offer flexible entry pathways, making it easier for international students to gain admission.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/flexible-admission-process-icon.webp",
  },
  {
    title: "Industry-Focused Learning",
    description:
      "Programs at private universities Australia are designed with industry needs in mind, ensuring graduates have practical skills that employers value.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry-focused-learning-icon.webp",
  },
  {
    title: "Specialized Courses",
    description:
      "Some private universities in Australia offer niche courses that may not be available in public universities.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/specialized-courses-icon.webp",
  },
  {
    title: "Faster Graduation Options",
    description:
      "Many private universities and colleges offer accelerated courses, allowing students to complete their degrees faster.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/faster-graduation-options-icon.webp",
  },
];

const accordionData = [
  {
    title: "Is Swinburne University public or private?",
    content:
      "Swinburne University of Technology is a public university in Australia. It was established in 1908 and is known for its strong focus on technology, innovation, and industry partnerships.",
  },
  {
    title: "Does Australia have private universities?",
    content:
      "Yes, Australia has a few private universities, but most universities are public and government-funded. Private universities, such as Bond University and Torrens University, operate independently and rely on tuition fees rather than government subsidies.",
  },
  {
    title: "Is UNSW a private university?",
    content:
      "No, the University of New South Wales (UNSW) is a public university. It is one of Australia’s leading research institutions and a member of the prestigious Group of Eight (Go8) universities.",
  },
  {
    title: "Is Melbourne University a private university?",
    content:
      "No, the University of Melbourne is a public university. Founded in 1853, it is one of Australia’s oldest and most prestigious universities, consistently ranking among the top globally.",
  },
  {
    title:
      "What is the difference between public and private universities in Australia?",
    content:
      "Public universities in Australia receive government funding, making them more affordable for domestic students. Private universities, on the other hand, rely on tuition fees and often have smaller class sizes and specialized programs.",
  },
  {
    title: "Which university is best in Australia, public or private?",
    content:
      "Public universities generally rank higher in Australia, with institutions like the University of Melbourne, ANU, and UNSW leading globally. While private universities offer unique advantages like smaller class sizes, public universities dominate in research, reputation, and funding.",
  },
];

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: accordionData.map((item) => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.content.replace(/<[^>]*>/g, "").trim(), // Remove HTML tags for plain text
    },
  })),
};

const sec1Cards = (data: any, fullHeight = false) => {
  return (
    <div
      className={`flex w-full flex-col items-center space-y-2 bg-[#F6F6F7] p-4 shadow hover:shadow-md sm:items-start ${fullHeight ? "h-full" : ""}`}
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
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent transition-all duration-300 group-hover:bg-black/30" />
        </div>
        <div className="absolute bottom-0 z-20 w-full p-4">
          <h3 className="line-clamp-1 text-xl font-semibold text-white group-hover:line-clamp-2">
            {data.college_name}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default async function PrivacyPage() {
  let colleges: College[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/top-type?type=private`,
      { next: { revalidate: 60 * 60 * 24 } },
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
                Private Universities in Australia
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Australia is home to a diverse range of higher education
            institutions, including both public and private universities in
            Australia. While public universities receive government funding,
            private universities operate independently, offering unique
            advantages such as smaller class sizes, industry-focused programs,
            and personalized learning experiences. If you are an international
            student considering studying at a private university in Australia,
            this guide will help you understand your options and make an
            informed decision.
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              What Are Private Universities in{" "}
              <span className="text-brand-secondary">Australia?</span>
            </h2>
            <p className="mb-2 text-center">
              Private universities in Australia are higher education
              institutions that function independently without direct government
              funding. They offer undergraduate, postgraduate, and professional
              courses across various disciplines. Many private universities have
              strong industry links, allowing students to gain practical
              experience and networking opportunities while studying. Unlike
              public universities, private universities and colleges often have
              more flexible admission requirements and a tailored approach to
              education. This makes them an excellent option for international
              students looking for high-quality education with additional
              academic support.
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

          {error ? (
            <></>
          ) : (
            <section className="flex flex-col justify-center">
              <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
                Top Private Universities in{" "}
                <span className="text-brand-secondary">Australia</span>
              </h2>
              <p className="mb-2 text-center lg:text-start">
                There are several prestigious private universities in Australia,
                offering world-class education and global recognition. Some of
                the top institutions include:
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
              <p className="mt-8 text-center md:text-start">
                These institutions are known for their academic excellence,
                research contributions, and student support services, making
                them top choices for international students.
              </p>
            </section>
          )}
        </div>
        <section className="container mx-auto my-12 flex flex-col">
          <div className="flex flex-col items-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Private Universities{" "}
              <span className="text-brand-secondary">in Sydney</span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              Sydney is home to some of the best private universities in
              Australia, offering a vibrant student life and access to global
              job markets. Popular private universities in Sydney include:
            </p>
          </div>
          <ul className="my-4 list-inside list-disc space-y-1">
            <li>International College of Management, Sydney (ICMS) </li>
            <li>Torrens University (Sydney Campus) </li>
            <li>Sydney Film School (Specialized Private Institution)</li>
          </ul>
        </section>
        <section className="container mx-auto my-24 flex flex-col">
          <div className="flex flex-col items-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Private Universities in{" "}
              <span className="text-brand-secondary">in Melbourne</span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              Melbourne, known for its cultural diversity and academic
              excellence, also hosts several renowned private universities in
              Melbourne, such as:
            </p>
          </div>
          <ul className="my-4 list-inside list-disc space-y-1">
            <li>Torrens University (Melbourne Campus)</li>
            <li>Photography Studies College (PSC)</li>
            <li>Melbourne Institute of Technology (MIT)</li>
          </ul>
        </section>
        <section>
          <div className="bg-[#F6F6F7] py-24">
            <div className="container mx-auto flex flex-col justify-center">
              <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
                Private vs. Public{" "}
                <span className="text-brand-secondary"> Universities</span>
              </h2>
              <p className="text-center">
                One of the major concerns for students is deciding between
                public colleges and universities and private institutions. While
                both offer quality education, there are key differences:
              </p>
              {/* table here */}
              <UniversityComparisonTable uniType="private" />
            </div>
          </div>
        </section>

        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Final <span className="text-brand-secondary">Thoughts</span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              Choosing between private universities in Australia and public
              institutions depends on your academic goals and personal
              preferences. If you prefer a personalized learning experience,
              industry-focused education, and flexible entry requirements, a
              private university in Australia may be the perfect choice for you.
            </p>
            <p>
              International students looking for high-quality education in a
              supportive environment will find plenty of opportunities at
              private universities in Australia. Whether you choose to study in
              Sydney, Melbourne, or any other city, these institutions offer
              excellent programs to help you achieve your career aspirations.
            </p>
          </section>
          <section className="container flex flex-col items-center gap-8">
            <h2 className="text-brand-primary text-center text-h1 leading-tight">
              FAQs on Private Universities{" "}
              <span className="text-brand-secondary"> in Australia</span>
            </h2>
            <div className="mx-auto w-full max-w-4xl">
              <Accordion type="single" collapsible className="w-full">
                {accordionData.map((item, idx) => (
                  <AccordionItem key={idx} value={idx.toString()}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
