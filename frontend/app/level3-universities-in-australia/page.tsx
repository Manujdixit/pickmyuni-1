import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import { Metadata } from "next";
import Image from "next/image";
import { CollegeListSection } from "@/components/CollegeListSection";

async function fetchTopCollegesByLevel(
  level: string,
  limit: number = 10,
): Promise<any> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      sortBy: "score_desc",
      level: level,
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/college/list?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data?.colleges) {
      return data.data.colleges;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error fetching colleges:", err);
    return [];
  }
}

const sec1CardData = [
  {
    title: "Affordable Tuition Fees",
    description:
      "Compared to Level 1 and Level 2 Universities, Level 3 Universities often have lower tuition fees, making them a budget-friendly option for international students.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/affordable_tuition_fees_icon.webp",
  },
  {
    title: "Diverse Course Options",
    description:
      "These universities offer a wide range of undergraduate, postgraduate, and vocational courses that cater to various academic interests and career aspirations.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/diverse_course_options_icon.webp",
  },
  {
    title: "Industry-Relevant Programs",
    description:
      "Many Level 3 Universities have strong ties with industries, ensuring that their curriculum aligns with market needs, increasing employability.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry_relevant_programs_icon.webp",
  },
  {
    title: "Flexible Admission Requirements",
    description:
      "Level 3 Universities have more flexible entry requirements, making it easier for international students to gain admission.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/flexible_admission_requirements_icon.webp",
  },
  {
    title: "Multicultural Environment",
    description:
      "With a diverse student population, these universities offer an inclusive and supportive learning environment.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/multicultural_environment_icon.webp",
  },
  {
    title: "Pathways to Higher Education",
    description:
      "Many Level 3 Universities offer pathway programs that enable students to transfer to higher-ranked institutions in the future.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pathways_to_higher_education_icon.webp",
  },
  {
    title: "Work Opportunities",
    description:
      "International students in Australia can work part-time while studying, and Level 3 Universities provide career guidance and job support services.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/work_opportunities_icon.webp",
  },
];

// const sec2CardData = [
//   {
//     title: "Federation University Australia",
//     description: `<ul><li><strong>Location:</strong> Victoria</li>
// <li><strong>Overview:</strong> Federation University offers a range of undergraduate and postgraduate programs with a focus on hands-on learning.</li>
// <li><strong>Popular Courses:</strong> Business, Engineering, IT, Nursing, and Education.</li>
// <li><strong>Why Choose?</strong> Affordable tuition fees, strong industry partnerships, and regional campus benefits.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/federation_university_australia_fua.webp",
//   },
//   {
//     title: "Charles Darwin University (CDU)",
//     description: `<ul><li><strong>Location:</strong> Northern Territory</li>
// <li><strong>Overview:</strong> CDU is known for its research-based programs and innovative learning methodologies.</li>
// <li><strong>Popular Courses:</strong> Environmental Science, Indigenous Knowledge, Business, and Nursing.</li>
// <li><strong>Why Choose?</strong> Flexible learning options and a focus on regional and Indigenous education. Also best level 3 universities in Australia for international students.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/charles_darwin_university_cdu.webp",
//   },
//   {
//     title: "University of Southern Queensland (USQ)",
//     description: `<ul><li><strong>Location:</strong> Queensland</li>
// <li><strong>Overview:</strong> USQ provides student-focused learning and career-ready programs.</li>
// <li><strong>Popular Courses:</strong> Aviation, Psychology, Engineering, and Agriculture.</li>
// <li><strong>Why Choose?</strong> Strong online education programs and industry-relevant curriculum.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_of_southern_queensland_usq.webp",
//   },
//   {
//     title: "Central Queensland University (CQU)",
//     description: `<ul><li><strong>Location:</strong> Queensland</li>
// <li><strong>Overview:</strong> CQU has a reputation for providing industry-focused courses with practical training.</li>
// <li><strong>Popular Courses:</strong> Allied Health, IT, Business, and Social Work.</li>
// <li><strong>Why Choose?</strong> High graduate employability rates and affordable tuition.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/central_queensland_university_cqu.webp",
//   },
//   {
//     title: "Southern Cross University (SCU)",
//     description: `<ul><li><strong>Location:</strong> New South Wales & Queensland</li>
// <li><strong>Overview:</strong> SCU offers flexible study options, including online and hybrid programs.</li>
// <li><strong>Popular Courses:</strong> Marine Science, Arts, Business, and Tourism.</li>
// <li><strong>Why Choose?</strong> Emphasis on research excellence and regional campus accessibility.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/southern_cross_university_scu.webp",
//   },
//   {
//     title: "Victoria University (VU)",
//     description: `<ul><li><strong>Location:</strong> Melbourne, Victoria</li>
// <li><strong>Overview:</strong> VU follows a block model of education, ensuring focused learning.</li>
// <li><strong>Popular Courses:</strong> Sports Science, Hospitality, Business, and IT.</li>
// <li><strong>Why Choose?</strong> Strong industry connections and work-integrated learning opportunities.</li></ul>`,
//     url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/victoria_university_vu.webp",
//   },
// ];

const sec3CardData = [
  {
    title: "Research Online",
    description:
      "Visit university websites and check their course offerings, tuition fees, and entry requirements. You can also refer to the list of level 3 universities in Australia shared above.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/research_online_icon.webp",
  },
  {
    title: "Check University Rankings",
    description:
      "While Level 3 Universities may not be in the top global rankings, they still maintain good academic standards and industry recognition.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/check_university_rankings_icon.webp",
  },
  {
    title: "Read Student Reviews",
    description:
      "Check online forums, social media pages, and student testimonials to understand the experiences of past and current students.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/read_student_reviews_icon.webp",
  },
  {
    title: "Consult Education Agents",
    description:
      "Many education consultants specialize in Australian universities and can guide you in choosing the right institution.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/consult_education_agent_icon.webp",
  },
  {
    title: "Use PickMyUni",
    description:
      "PickMyUni is an Australian-based platform dedicated to helping international students choose the right course and college based on their needs and aspirations.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/use_PMU_icon.webp",
  },
];

const accordionData = [
  {
    trigger: "What is Sunshine Coast University Hospital Level 1 Clinic 3?",
    content:
      'Sunshine Coast University Hospital (SCUH) is a major teaching hospital in Birtinya, Queensland. Level 1 includes various clinics, allied health services, and a pharmacy. Specific details about "Clinic 3" are not publicly available—contact the hospital directly for more information.',
  },
  {
    trigger: "Can a Level 3 diploma get you into university?",
    content:
      "Yes, a Level 3 diploma can be a pathway to university, depending on the institution and course. Some universities accept diplomas for direct entry or credit transfer into undergraduate programs.",
  },
  {
    trigger: "What is Level 3 university in Australia?",
    content:
      "Level 3 university is not a standard classification in Australia. However, some sources categorize universities into tiers based on rankings and reputation.",
  },
  {
    trigger: "Do universities accept Level 3?",
    content:
      "Many universities accept Level 3 qualifications, such as diplomas, as entry pathways to undergraduate courses. Requirements vary, so it’s best to check with the specific university.",
  },
  {
    trigger: "What is Level 3 equivalent to in Australia?",
    content:
      "In the Australian Qualifications Framework (AQF), Level 3 corresponds to a Certificate III, which is below a diploma and focuses on vocational skills and education.",
  },
  {
    trigger: "Is Level 3 the same as a degree?",
    content:
      "No, a Level 3 qualification is not the same as a degree. A bachelor's degree is AQF Level 7, requiring more advanced academic and professional knowledge.",
  },
];

export const metadata: Metadata = {
  title: "Level 3 Universities in Australia 2025",
  description:
    "Discover Level 3 Universities in Australia for international students. Affordable tuition, diverse courses, flexible admissions, and quality education. Find your ideal university with PickMyUni.",
  keywords: [
    "Level 3 Universities Australia",
    "Affordable Universities Australia",
    "International Students Australia",
    "Study in Australia 2025",
    "Australian Universities",
    "University Rankings Australia",
    "PickMyUni",
    "Level 3 Colleges Australia",
    "Budget Friendly Universities",
    "Quality Education Australia",
    "Multicultural Universities Australia",
    "Industry Relevant Courses Australia",
  ],
};

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
      <p className="text-brand-primary text-center text-xl font-semibold sm:text-start">
        {data.title}
      </p>
      <p className="text-center text-base font-normal sm:text-start">
        {data.description}
      </p>
    </div>
  );
};

// const sec2Cards = (data: any, idx: number) => {
//   return (
//     <div className="space-y-2">
//       <div className="relative mb-2 h-48 w-full">
//         <Image
//           src={
//             data.url ||
//             "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path1.webp"
//           }
//           alt={data.title}
//           fill
//           className="rounded object-cover"
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
//       </div>
//       <div className="">
//         <p className="text-brand-primary p-4 text-2xl font-semibold">
//           {idx + 1}. {data.title}
//         </p>
//         <div
//           className="p-4 text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6"
//           dangerouslySetInnerHTML={{ __html: data.description }}
//         />
//       </div>
//     </div>
//   );
// };

const sec3Cards = (data: any) => {
  return (
    <div className="flex flex-col items-center space-y-2 sm:items-start">
      <Image
        src={data.url}
        alt={data.title}
        width={100}
        height={100}
        className="size-20"
      />
      <p className="text-brand-primary text-center text-xl font-semibold sm:text-start">
        {data.title}
      </p>
      <p className="text-center text-base font-normal sm:text-start">
        {data.description}
      </p>
    </div>
  );
};

export default async function Level3UniversitiesPage() {
  const colleges = await fetchTopCollegesByLevel("level 3");
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
            src="/globe.png"
            alt="Library with books on shelves"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto pb-8">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Level 3 Universities in Australia​
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Level 3 universities in Australia are one of the most sought-after
            study destinations for international students, offering high-quality
            education and a diverse range of universities to choose from. The
            universities in Australia are categorized based on their academic
            performance, research output, and international reputation. Among
            these, Level 3 Universities provide a balance between affordability
            and quality education, making them an attractive option for many
            students. Suppose you are planning to study in Australia and are
            considering Level 3 Universities. In that case, this guide will
            provide you with all the necessary details, including why to choose
            these institutions, how to find them, and a comprehensive list of
            available options.
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Why Choose Level 3 Universities in{" "}
              <span className="text-brand-secondary">Australia 2025?</span>
            </h2>
            <p className="mb-2 text-center">
              Level 3 Universities in Australia are an excellent choice for
              students who seek quality education at an affordable cost. Here
              are some key reasons why you should consider these universities:
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {sec1CardData.map((data, idx) => (
                <div key={idx} className="flex h-full flex-col bg-[#F6F6F7]">
                  {sec1Cards(data, true)}
                </div>
              ))}
            </div>
          </section>

          <CollegeListSection
            colleges={colleges}
            loading={false}
            error={null}
            title="List of Level 3 Universities in Australia"
            description="Below is a list of some prominent Level 3 Universities in Australia, along with their key features:"
            level="level 3"
          />
        </div>
        <section>
          <div className="bg-brand-secondary py-24">
            <div className="container mx-auto flex flex-col justify-center">
              <h2 className="mb-4 text-center text-4xl font-semibold text-white">
                How to Find the Level 3 Universities <span>in Australia?</span>
              </h2>
              <p className="mb-2 text-center text-white">
                Finding the right university is crucial for a successful
                academic journey. Here’s how you can identify and select the
                best Level 3 Universities in Australia:
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
              How FindMyUni Helps{" "}
              <span className="text-brand-secondary">
                International Students
              </span>
            </h2>
            <p className="mx-auto max-w-[1000px] text-center">
              Choosing the right university can be overwhelming, especially for
              international students unfamiliar with the Australian education
              system. That’s where FindMyUni comes in.
            </p>
          </section>
          <section className="flex flex-col items-center gap-8 lg:flex-row-reverse">
            <div className="flex-1">
              <h2 className="text-brand-primary text-center text-h1 leading-tight md:text-start">
                Why Choose{" "}
                <span className="text-brand-secondary">{"FindMyUni?"}</span>
              </h2>

              <ul className="my-4 list-inside list-disc space-y-1 pl-4">
                <li>
                  <span className="font-bold">Personalized Guidance:</span> We
                  provide tailored assistance based on your academic background,
                  career goals, and financial situation.
                </li>
                <li>
                  <span className="font-bold">Course Comparison:</span> Our
                  platform allows you to compare universities, courses, tuition
                  fees, and rankings.
                </li>
                <li>
                  <span className="font-bold">Application Assistance:</span>{" "}
                  From document preparation to visa applications, we assist you
                  at every step.
                </li>
                <li>
                  <span className="font-bold">Scholarship Information:</span> We
                  help students find scholarships and financial aid options to
                  ease their financial burden.
                </li>
                <li>
                  <span className="font-bold">Internship and Job Support:</span>{" "}
                  We guide students in securing internships and part-time jobs
                  to enhance their practical experience.
                </li>
                <li>
                  <span className="font-bold">
                    OSHC and Accommodation Assistance:
                  </span>{" "}
                  We assist students in finding suitable health insurance (OSHC)
                  and accommodation options in Australia.
                </li>
              </ul>
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
          </section>
          <section className="container flex flex-col items-center gap-8">
            <h2 className="text-brand-primary text-center text-h1 leading-tight">
              FAQs on Level 3 Universities
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
      </div>
    </>
  );
}
