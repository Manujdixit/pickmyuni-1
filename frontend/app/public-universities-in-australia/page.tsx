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
import UniversityComparisonTable from "@/components/UniversityComparisonTable";

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

        {!error && (
          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Top Public Universities Australia for{" "}
              <span className="text-brand-secondary">
                International Students
              </span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              Below is a list of some of the most prestigious Level 1
              universities in Australia, known for their academic excellence and
              outstanding research contributions:
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
            <p className="mt-8 text-center md:text-start">
              These institutions are known for their academic excellence,
              research contributions, and student support services, making them
              top choices for international students.
            </p>
          </section>
        )}
      </div>
      <section>
        <div className="bg-[#F6F6F7] py-24">
          <div className="container mx-auto flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Private vs. Public{" "}
              <span className="text-brand-secondary"> Universities</span>
            </h2>
            <p className="text-center">
              One of the major concerns for students is deciding between public
              colleges and universities and private institutions. While both
              offer quality education, there are key differences:
            </p>
            {/* table here */}
            <UniversityComparisonTable uniType="public" />
          </div>
        </div>
      </section>

      <section>
        <div className="bg-brand-primary py-24">
          <div className="container flex flex-col items-center gap-8 text-white lg:flex-row">
            <div className="flex-1">
              <h2 className="text-h1 leading-tight text-white">
                Admission Requirements for Public{" "}
                <span className="text-brand-secondary">
                  Universities in Australia
                </span>
              </h2>
              <p>
                International students who wish to study at a public university
                in Australia must meet specific admission criteria, which
                typically include:
              </p>
              <ul className="my-4 list-inside list-disc space-y-1 text-white">
                <li>
                  <strong>Academic Qualifications:</strong> A recognized high
                  school diploma or equivalent.
                </li>
                <li>
                  <strong>English Language Proficiency:</strong> IELTS, TOEFL,
                  or PTE scores meeting university requirements.
                </li>
                <li>
                  <strong>Student Visa:</strong> A valid Australian student visa
                  (subclass 500).
                </li>
                <li>
                  <strong>Financial Proof:</strong> Evidence of sufficient funds
                  to cover tuition and living expenses.
                </li>
                <li>
                  <strong>Additional Requirements:</strong> Some courses may
                  require work experience, portfolios, or additional entrance
                  tests.
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
              How to Apply to Public Universities in Australia
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {sec3CardData.map((data, idx) => (
                <div
                  key={idx}
                  className={`flex h-full flex-col items-center rounded-2xl bg-white p-4 shadow hover:shadow-md ${
                    idx === 6 ? "md:col-start-1 md:mx-auto lg:col-start-2" : ""
                  }`}
                >
                  {sec3Cards(data)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto space-y-24 py-12 lg:py-16">
        <section className="">
          <div className="flex flex-col items-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Popular Courses Offered by Public Universities{" "}
              <span className="text-brand-secondary">in Australia</span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              International students can choose from a wide range of popular
              courses at public universities, including:
            </p>
          </div>
          <ul className="my-4 list-inside list-disc space-y-1">
            <li>Business & Management</li>
            <li>Engineering & Technology</li>
            <li>Medicine & Healthcare</li>
            <li>Information Technology & Computer Science</li>
            <li>Law & Legal Studies</li>
            <li>Environmental Science</li>
            <li>Media & Communication</li>
            <li>Hospitality & Tourism</li>
          </ul>
        </section>
        <section className="">
          <div className="flex flex-col items-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
              Cost of Studying at Public Universities{" "}
              <span className="text-brand-secondary">in Australia</span>
            </h2>
            <p className="mb-2 text-center lg:text-start">
              The cost of studying in public universities in Australia varies
              based on the university and course. On average:
            </p>
          </div>
          <ul className="my-4 list-inside list-disc space-y-1">
            <li>
              <strong>Undergraduate Courses:</strong> AUD 20,000 – AUD 45,000
              per year
            </li>
            <li>
              <strong>Postgraduate Courses:</strong> AUD 22,000 – AUD 50,000 per
              year
            </li>
            <li>
              <strong>Doctoral Degrees:</strong> AUD 18,000 – AUD 42,000 per
              year
            </li>
          </ul>
          <p>
            Living expenses, including accommodation, transport, and daily
            costs, typically range between AUD 20,000 – AUD 25,000 per year.
          </p>
        </section>
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold lg:text-start">
            Final <span className="text-brand-secondary">Thoughts</span>
          </h2>
          <p className="mb-2 text-center lg:text-start">
            For international students seeking high-quality education, global
            recognition, and affordability, public universities in Australia are
            the best choice. These universities provide excellent academic
            resources, research opportunities, and career support to help
            students achieve their professional goals.
          </p>
          <p>
            If you’re considering studying in Australia, explore the diverse
            range of courses and institutions available at public universities
            and take the first step towards a successful academic journey!
          </p>
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
    </div>
  );
}
