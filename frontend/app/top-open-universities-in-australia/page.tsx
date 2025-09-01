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
import { CheckCircle2, CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sec1CardData = [
  {
    title: "Flexibility",
    description: "Learn at your own pace from anywhere in the world.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/globally-recognized-degrees-icon.webp",
  },
  {
    title: "Diverse Course Offerings",
    description:
      "A wide range of open university subjects across different disciplines.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/high-quality-education-icon.webp",
  },
  {
    title: "No ATAR Requirement",
    description:
      "Many open universities allow students to enroll without requiring an Australian Tertiary Admission Rank (ATAR).",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/advanced-research-opportunities-icon.webp",
  },
  {
    title: "Affordability",
    description:
      "Access quality education at a lower cost compared to traditional universities.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Pathway to University Degrees",
    description:
      "Use completed units as credits towards a full degree from a recognized university.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
];

const sec3CardData = [
  {
    title: "Choose a Course",
    description:
      "Browse the available open university courses and select a program that aligns with your career goals.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_rankings_icon.webp",
  },
  {
    title: "Check Eligibility",
    description: "Review the entry requirements for the chosen course.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accreditation-Reputation-icon.webp",
  },
  {
    title: "Apply Online",
    description:
      "Complete the online application process through the university’s website.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/course-offerings-icon.webp",
  },
  {
    title: "Enroll in Subjects",
    description:
      "Select the required open university subjects for your study plan.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry-partnerships-icon.webp",
  },
  {
    title: "Start Studying",
    description:
      "Access learning materials online and begin your academic journey.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/alumni-success-icon.webp",
  },
];

const popularCoursesData = [
  "Business and Management",
  "Information Technology",
  "Healthcare and Nursing",
  "Engineering and Science",
  "Arts and Humanities",
  "Education and Teaching",
];

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
      <div className="flex flex-row items-center">
        <Image
          src={data.url}
          alt={data.title}
          width={72}
          height={72}
          className="size-18"
        />
        <div className="ml-5 space-y-1">
          <Badge className="bg-brand-secondary rounded-full px-2">
            {"Step " + 0 + (idx + 1)}
          </Badge>
          <p className="text-brand-primary text-xl font-semibold">
            {data.title}
          </p>
        </div>
      </div>
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
                Open Universities in Australia: Your Gateway to Flexible
                Learning
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Australia is home to some of the best open universities that provide
            flexible, high-quality education to students across the globe.
            Whether you are an international student looking to pursue a degree
            in Australia or a working professional seeking career advancement,
            open universities in Australia offer the perfect opportunity to
            achieve your academic goals without the constraints of traditional
            classroom learning.
          </p>

          <section className="mt-8 flex flex-col justify-center bg-[#FAF4F0] p-[20px] sm:p-[30px] lg:p-[50px]">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold md:text-start">
              What Are Open Universities{" "}
              <span className="text-brand-secondary">in Australia ?</span>
            </h2>
            <p className="mb-2 text-center md:text-start">
              Open Universities Australia (OUA) is a network of leading
              Australian universities that provide accessible and flexible
              online education. These universities cater to students who need
              the convenience of remote learning while maintaining high academic
              standards. Whether you're interested in business, healthcare,
              engineering, or arts, open university courses cover a vast range
              of subjects to suit diverse career aspirations.
            </p>
          </section>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Why Choose an Open University{" "}
              <span className="text-brand-secondary">in Australia?</span>
            </h2>
            <p className="text-center">
              Studying at an open university provides numerous benefits,
              including:
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

        <div className="py-24">
          <div className="container flex flex-col items-center gap-8 text-body lg:flex-row">
            <div className="flex-1">
              <h2 className="text-brand-primary text-h1 leading-tight">
                Popular Open University
                <span className="text-brand-secondary"> Courses</span>
              </h2>
              <p className="mb-4 text-body">
                Australian open universities provide a variety of online courses
                in disciplines such as:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {popularCoursesData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#FAF4F0] p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      <CheckCircle2 fill="#FF882E" className="text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-black">{item}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-body">
                <p>
                  These open university subjects are designed to equip students
                  with industry-relevant skills, making them highly employable
                  upon graduation.
                </p>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="relative">
                <Image
                  src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path3.webp"
                  alt="Graduate student celebrating"
                  width={400}
                  height={500}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {!error && (
          <section className="container mx-auto flex flex-col justify-center pb-24">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Top Open Universities{" "}
              <span className="text-brand-secondary">in Australia</span>
            </h2>
            <p className="mb-2 text-center">
              Several reputable universities in Australia offer open learning
              programs, including:
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
                How to Enroll in an Open University{" "}
                <span className="text-brand-secondary">AU Program</span>
              </h2>
              <p className="text-center text-white">
                Enrolling in an open university in Australia is a
                straightforward process. Follow these steps:
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
                  Choosing an open university Australia program is an excellent
                  way for international students to gain a globally recognized
                  education with maximum flexibility. Whether you are looking to
                  advance your career, change fields, or gain a higher
                  qualification, open universities Australia offers a perfect
                  learning solution. Explore your options today and take the
                  first step towards a brighter future!
                </p>
                <br />
                <p>
                  By selecting an open university of Australia, you ensure
                  quality education that fits your lifestyle. Start your journey
                  now and unlock new career opportunities with open university
                  programs!
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
            FAQs on Open Universities
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
