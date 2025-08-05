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

const sec1CardData = [
  {
    title: "Affordable Tuition Fees",
    description:
      "Compared to private institutions, public universities in Australia offer lower tuition fees, making education more accessible for international students.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/globally-recognized-degrees-icon.webp",
  },
  {
    title: "Government-Funded Scholarships",
    description:
      "Many public universities provide scholarships and financial aid to international students, reducing the financial burden.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/high-quality-education-icon.webp",
  },
  {
    title: "Wide Range of Courses",
    description:
      "From engineering to arts, business, and healthcare, Australian public universities offer diverse courses tailored to global industry demands.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/advanced-research-opportunities-icon.webp",
  },
  {
    title: "High-Quality Education",
    description:
      "These universities adhere to strict educational standards, ensuring students receive top-notch learning experiences.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Strong Industry Connections",
    description:
      "Many public universities collaborate with industries, offering internships and job placements to enhance students' employability.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/enhanced-career-opportunities-icon.webp",
  },
  {
    title: "Multicultural Environment",
    description:
      "With students from all over the world, public universities in Australia offer a diverse and inclusive learning environment.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarships-and-financial-assistance-icon.webp",
  },
  {
    title: "Advanced Research Facilities",
    description:
      "Many of these universities are leaders in research, contributing to groundbreaking innovations in various fields.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarships-and-financial-assistance-icon.webp",
  },
  {
    title: "Global Networking Opportunities",
    description:
      "Students at public universities have access to international exchange programs and collaborations with top institutions worldwide.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarships-and-financial-assistance-icon.webp",
  },
];

const sec3CardData = [
  {
    title: "1. Choose a University and Course",
    description:
      "Research and select a public university and program that aligns with your career goals.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_rankings_icon.webp",
  },
  {
    title: "2. Check Entry Requirements",
    description:
      "Ensure you meet the academic and English proficiency requirements.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accreditation-Reputation-icon.webp",
  },
  {
    title: "3. Prepare Documents",
    description:
      "Gather necessary documents like academic transcripts, English test scores, SOP, and reference letters.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/course-offerings-icon.webp",
  },
  {
    title: "4. Apply Online",
    description:
      "Submit applications through the university’s official portal or via a registered education agent.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry-partnerships-icon.webp",
  },
  {
    title: "5. Await Offer Letter",
    description:
      " If accepted, you will receive a Confirmation of Enrolment (CoE), which is necessary for a student visa application.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/alumni-success-icon.webp",
  },
  {
    title: "6. Apply for a Student Visa",
    description:
      "Lodge your visa application with the Department of Home Affairs.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/student-reviews-experience-icon.webp",
  },
  {
    title: "7. Plan for Arrival",
    description:
      "Arrange accommodation, insurance, and financial support before moving to Australia.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/student-reviews-experience-icon.webp",
  },
];

const accordionData = [
  {
    trigger: "Is Torrens University Level 1 or 2?",
    content:
      "Torrens University Australia is classified as an Assessment Level 2 (AL2) institution. This means that while it maintains quality education standards, international students may need to provide additional documentation, such as evidence of financial capacity and English language proficiency, during the visa application process.",
  },
  {
    trigger: "Is Victoria University Level 1 or 2?",
    content:
      "Victoria University is designated as an Assessment Level 2 (AL2) university. As with other AL2 institutions, prospective international students should be prepared to submit comprehensive documentation to support their visa applications.",
  },
  {
    trigger: "What is the top Level 1 university in Australia?",
    content:
      "Among Assessment Level 1 (AL1) universities, the University of Melbourne stands out as a premier institution. It consistently ranks highly in global university rankings and offers a wide array of programs renowned for their academic excellence.",
  },
  {
    trigger: "Is RMIT University Level 1 or 2?",
    content:
      "RMIT University is classified as an Assessment Level 1 (AL1) institution. This classification facilitates a more streamlined visa application process for international students, reflecting the university's low immigration risk profile.",
  },
  {
    trigger: "What does level 1 university mean?",
    content:
      "A Level 1 university, in the Australian context, refers to an institution categorized under Assessment Level 1 (AL1) by the Department of Home Affairs. This designation indicates a low immigration risk, allowing for a simplified and expedited student visa application process.",
  },
  {
    trigger: "Is ACU a Level 1 university in Australia?",
    content:
      "The Australian Catholic University (ACU) holds an Assessment Level 2 (AL2) classification. Consequently, international applicants may need to provide additional evidence, such as proof of financial capacity and English language proficiency, when applying for a student visa.",
  },
  {
    trigger: "Is UTS a Level 1 or 2 university?",
    content:
      "The University of Technology Sydney (UTS) is designated as an Assessment Level 1 (AL1) institution. This status reflects a low immigration risk and offers a more straightforward visa application process for international students.",
  },
  {
    trigger: "Is the University of New England Level 1 or 2?",
    content:
      "The University of New England is classified as an Assessment Level 2 (AL2) university. Prospective international students should be prepared to meet additional requirements during the visa application process.",
  },
  {
    trigger: "Is Western Sydney University Level 1 or 2?",
    content:
      "Western Sydney University holds an Assessment Level 2 (AL2) classification. This means that international applicants may need to provide more comprehensive documentation to support their visa applications.",
  },
  {
    trigger: "Is Charles Sturt University Level 1 or 2?",
    content:
      "Charles Sturt University is designated as an Assessment Level 2 (AL2) institution. International students applying to this university should be aware of the additional requirements associated with this classification.",
  },
  {
    trigger: "Is Curtin University Level 1 or 2?",
    content:
      "Curtin University is classified as an Assessment Level 1 (AL1) university. This status facilitates a more streamlined visa application process for international students, reflecting the university's low immigration risk profile.",
  },
  {
    trigger: "Is Federation University Level 1?",
    content:
      "Federation University Australia is designated as an Assessment Level 2 (AL2) institution. Consequently, international applicants may need to provide additional evidence, such as proof of financial capacity and English language proficiency, when applying for a student visa.",
  },
  {
    trigger: "Is Victoria University Level 1?",
    content:
      "Victoria University is designated as an Assessment Level 2 (AL2) university. Prospective international students should be prepared to meet additional requirements during the visa application process.",
  },
  {
    trigger: "Is La Trobe University Level 1 or 2?",
    content:
      "La Trobe University holds an Assessment Level 2 (AL2) classification. This means that international applicants may need to provide more comprehensive documentation to support their visa applications.",
  },
  {
    trigger: "What are Australia's Assessment Level 1 universities?",
    content: `Assessment Level 1 (AL1) universities in Australia are considered low-risk institutions, offering streamlined visa processes for international students. Some of these universities include:\n
          <ul>
          <li>University of Melbourne</li>
          <li>University of Sydney</li>
          <li>University of New South Wales (UNSW)</li>
          <li>Australian National University (ANU)</li>
          <li>Monash University</li>
          <li>University of Queensland (UQ)</li>
          <li>University of Western Australia (UWA)</li>
          <li>RMIT University</li>
          </ul>\n
          These institutions are recognized for their academic excellence and low immigration risk profiles.`,
  },
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

const sec3Cards = (data: any) => {
  return (
    <div className="space-y-2">
      <Image
        src={data.url}
        alt={data.title}
        width={100}
        height={100}
        className="size-20"
      />
      <p className="text-brand-primary text-xl font-semibold">{data.title}</p>
      <p className="text-base font-normal">{data.description}</p>
    </div>
  );
};

export default function PrivacyPage() {
  const { colleges, loading, error } = useTopCollegesByType("government");

  return (
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
              Public Universities in Australia
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto space-y-20 py-12 lg:py-16">
        {/* Header Section */}
        <p className="text-lg font-normal">
          Australia is home to some of the world's best higher education
          institutions, offering exceptional academic opportunities to students
          worldwide. For international students looking to pursue higher
          education, public universities in Australia stand out for their
          quality education, affordability, and global recognition.
        </p>

        <section className="flex flex-col justify-center">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
            Why Choose Public Universities in{" "}
            <span className="text-brand-secondary">Australia</span>
          </h2>
          <p className="mb-2 text-center">
            Public universities are government-funded institutions that provide
            high-quality education and research facilities at subsidized tuition
            rates. These universities are recognized globally for their academic
            excellence and strong industry connections. Studying at a public
            university in Australia ensures students receive an internationally
            accredited degree that enhances their career prospects.
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

        <section className="flex flex-col justify-center">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
            Top Public Universities Australia for{" "}
            <span className="text-brand-secondary">International Students</span>
          </h2>
          <p className="mb-2 text-center lg:text-start">
            Below is a list of some of the most prestigious Level 1 universities
            in Australia, known for their academic excellence and outstanding
            research contributions:
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              colleges.map((data: College, idx: number) => (
                <div
                  key={data.id}
                  className="flex h-full flex-col items-center bg-[#F6F6F7] shadow hover:shadow-md"
                >
                  {sec2Cards(data, idx)}
                </div>
              ))
            )}
          </div>
          <p className="mt-8 text-center md:text-start">
            These institutions are known for their academic excellence, research
            contributions, and student support services, making them top choices
            for international students.
          </p>
        </section>
      </div>
      <section>
        <div className="bg-brand-primary py-24">
          <div className="container flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-h1 leading-tight text-white">
                Cheap Level 1 universities{" "}
                <span className="text-brand-secondary">in Australia</span>
              </h2>
              <ul className="my-4 list-inside list-disc space-y-1 text-white">
                <li>
                  Among Assessment Level 1 universities, some offer relatively
                  affordable tuition fees for international students.
                </li>
                <li>
                  For instance, the University of the Sunshine Coast (USC) is
                  known for its competitive fee structure while maintaining
                  quality education standards.
                </li>
                <li>
                  Additionally, institutions like the University of Canberra
                  (UC) and Australian Catholic University (ACU) offer programs
                  that are cost-effective compared to other AL1 universities.
                </li>
                <li>
                  Prospective students are encouraged to research specific
                  programs and associated costs to identify the best fit for
                  their academic and financial needs.
                </li>
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
      <section>
        <div className="bg-brand-secondary py-24">
          <div className="container mx-auto flex flex-col justify-center">
            <h2 className="mb-4 text-center text-4xl font-semibold text-white">
              Why Choose Level 1 Universities in <span>Australia 2025?</span>
            </h2>
            <p className="mb-2 text-center text-white">
              Level 1 universities in Australia are the most reputable and
              highly ranked institutions in the country. These universities
              provide exceptional benefits to students, making them the
              preferred choice for those seeking excellence in higher education.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {sec3CardData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col items-center rounded-2xl bg-white p-4 shadow hover:shadow-md"
                >
                  {sec3Cards(data)}
                </div>
              ))}
            </div>
          </div>{" "}
        </div>
      </section>
      <div className="container mx-auto space-y-20 py-12 lg:py-16">
        <section className="py-13 flex flex-col items-center justify-center bg-[#FAF4F0] p-8 text-center">
          <h2 className="text-brand-primary mb-4 max-w-[800px] text-center text-4xl font-semibold">
            How FindMyUni Helps International Students to get into{" "}
            <span className="text-brand-secondary">Level 1 Universities</span>
          </h2>
          <p className="mx-auto max-w-[1000px] text-center">
            FindMyUni is an Australian-based platform dedicated to assisting
            international students in selecting the right course and university.
            We understand that choosing the right institution can be
            challenging, especially for students moving to a new country. That’s
            where we come in!
          </p>
        </section>
        <section className="container flex flex-col items-center gap-8 lg:flex-row-reverse">
          <div className="flex-1">
            <h2 className="text-brand-primary text-center text-h1 leading-tight md:text-start">
              Why Choose{" "}
              <span className="text-brand-secondary">{"FindMyUni?"}</span>
            </h2>
            <ul className="my-4 list-inside list-disc space-y-1 pl-4">
              <li>
                <span className="font-bold">
                  Comparisons of Level 1 universities:
                </span>{" "}
                We provide detailed comparisons of Level 1 universities based on
                courses, rankings, tuition fees, and student reviews.
              </li>
              <li>
                <span className="font-bold">Personalized Guidance:</span> Our
                expert consultants offer one-on-one counseling to help students
                make informed decisions.
              </li>
              <li>
                <span className="font-bold">Application Assistance:</span> We
                assist students with university applications, ensuring all
                requirements are met for a smooth admission process.
              </li>
              <li>
                <span className="font-bold">Scholarship Support:</span>{" "}
                FindMyUni helps students explore and apply for scholarships
                available at top Australian universities.
              </li>
              <li>
                <span className="font-bold">
                  Visa and Immigration Assistance:
                </span>{" "}
                Our team provides guidance on visa applications and ensures
                students meet all necessary requirements.
              </li>
              <li>
                <span className="font-bold">Internships & Career Support:</span>{" "}
                We connect students with internship opportunities to gain
                real-world experience and enhance employability.
              </li>
            </ul>
          </div>

          <div className="lg:w-1/3">
            <div className="relative">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/why_choose_findmyuni.webp"
                alt="Graduate student celebrating"
                width={400}
                height={500}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>
        <section className="container flex flex-col items-center gap-8">
          <h2 className="text-brand-primary text-center text-h1 leading-tight">
            FAQs on Level 1 Universities
            <span className="text-brand-secondary"> in Australia</span>
          </h2>
          <div className="mx-auto w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {accordionData.map((item, idx) => (
                <AccordionItem key={idx} value={idx.toString()}>
                  <AccordionTrigger className="text-brand-primary text-xl font-semibold">
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
    </div>
  );
}
