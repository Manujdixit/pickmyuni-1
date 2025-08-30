import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import { HelpCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

const sec1CardData = [
  {
    title: "Affordable Tuition Fees",
    description:
      "Level 2 universities often have lower tuition fees compared to Level 1 universities, making them a budget-friendly option for students. This is particularly beneficial for international students who are looking for quality education at an affordable cost.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/affordable_tuition_fees_icon.webp",
  },
  {
    title: "Practical and Industry-Focused Learning",
    description:
      "Many Level 2 universities in Australia 2025 focus on hands-on learning, internships, and industry placements. These universities emphasize skill-based education, ensuring students graduate with practical knowledge that aligns with industry demands.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/practical_and_industry-focused_learning_icon.webp",
  },
  {
    title: "Smaller Class Sizes and Personalized Learning",
    description:
      "Unlike larger universities, many Level 2 institutions provide a more personalized approach to learning, with smaller class sizes that allow students to have better interactions with professors and peers.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/smaller_class_sizes_and_personalized_learning_icon.webp",
  },
  {
    title: "Strong Employment Outcomes",
    description:
      "Graduates from Level 2 universities have excellent job prospects due to the practical nature of their courses. Many institutions have tie-ups with local businesses and industries, increasing job placement opportunities.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/strong_employment_outcomes_icon.webp",
  },
  {
    title: "Diverse Student Community",
    description:
      "Many Level 2 universities attract students from around the world, creating a vibrant multicultural environment where students can build global networks and gain international exposure.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/diverse_student_community_icon.webp",
  },
];

const sec2CardData = [
  {
    title: "Victoria University (VU)",
    description: `Located in Melbourne, Victoria University is known for its strong industry connections and emphasis on practical learning. VU offers a unique block model of learning, where students study one subject at a time, ensuring better retention and understanding. The university is particularly renowned for its business, health sciences, and engineering programs and is also known as one of the best assessment level 2 universities in Australia.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/victoria_university_vu.webp",
  },
  {
    title: "Western Sydney University (WSU)",
    description: `WSU is one of the fastest-growing universities in Australia, offering a diverse range of courses across multiple campuses. The university is known for its strong focus on innovation, research, and industry partnerships. Programs in nursing, IT, and business are highly sought after at WSU.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/western_sydney_university_wsu.webp",
  },
  {
    title: "Charles Sturt University (CSU)",
    description: `Charles Sturt University is recognized for its excellent online learning programs and practical courses in agriculture, environmental science, and policing. It has strong links with industries and provides hands-on training to prepare students for real-world challenges.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/charles_sturt_university_csu.webp",
  },
  {
    title: "Edith Cowan University (ECU)",
    description: `Located in Western Australia, ECU is known for its student-centered approach, modern facilities, and research-driven programs. It excels in areas such as cybersecurity, nursing, and media studies.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/edith_cowan_university_ecu.webp",
  },
  {
    title: "University of Southern Queensland (USQ)",
    description: `USQ offers flexible study options, including online courses, making it an excellent choice for students who require a balance between studies and work. It is well-known for programs in aviation, engineering, and education.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_of_southern_queensland_usq.webp",
  },
  {
    title: "Federation University Australia",
    description: `Federation University provides a personalized learning experience with small class sizes and strong student support. It is highly recognized for its programs in information technology, nursing, and business.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/federation_university_australia_fua.webp",
  },
  {
    title: "CQUniversity (CQU)",
    description: `With multiple campuses across Australia, CQU offers programs that focus on hands-on training and industry placements. It is popular for engineering, health sciences, and hospitality management courses.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/cqUniversity_cqu.webp",
  },
  {
    title: "Southern Cross University (SCU)",
    description: `SCU provides excellent student support services and research-led teaching in fields such as marine science, environmental sustainability, and social work.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/southern_cross_university_scu.webp",
  },
  {
    title: "Griffith University",
    description: `Griffith University is one of the popular level 2 universities in Australia for international students. Located in Queensland (QLD), Griffith University is best known for its UG, PG, PhD courses.`,
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/mask_group-6.webp",
  },
];

const sec3CardData = [
  {
    title: "Check Course Offerings",
    description:
      "Look for universities that offer the courses you are interested in, ensuring they align with your career aspirations.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/check_course_offerings_icon.webp",
  },
  {
    title: "Accreditation and Recognition",
    description:
      "Ensure the university is recognized by Australian education authorities and meets the necessary accreditation standards.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accreditation_and_recognition_icon.webp",
  },
  {
    title: "Industry Connections and Internships",
    description:
      "Research universities that offer internships, placements, and real-world learning experiences.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry_connections_and_internships_icon.webp",
  },
  {
    title: "Student Reviews and Alumni Success",
    description:
      "Read student reviews, check graduate employment rates, and connect with alumni to gain insights into the university experience.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/student_reviews_and_alumni_success_icon.webp",
  },
  {
    title: "Scholarship Opportunities",
    description:
      "Many Level 2 universities offer scholarships and financial aid for international students, reducing the financial burden.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarship_opportunities_icon.webp",
  },
  {
    title: "Support Services for International Students",
    description:
      "Look for universities that offer dedicated support services such as academic assistance, career guidance, and mental health resources.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/support_services_for_international_students_icon.webp",
  },
];

const accordionData = [
  {
    trigger: "Is Torrens University Level 1 or 2?",
    content:
      "Torrens University Australia is generally considered a Level 2 institution. While it offers a range of programs and has industry connections, it does not feature prominently in major global university rankings.",
  },
  {
    trigger:
      "Which are the best Level 1 and Level 2 universities in Australia?",
    content: `<ul><li>Level 1 Universities: These include members of the prestigious Group of Eight (Go8), such as the University of Melbourne, Australian National University, and the University of Sydney, known for their research excellence and high global rankings.</li>
<li>Level 2 Universities: Institutions like Griffith University and Deakin University offer quality education and strong industry links but may not have the same global research intensity as Level 1 universities.</li></ul>`,
  },
  {
    trigger: "Is Victoria University Level 1 or 2?",
    content:
      "Victoria University is generally classified as a Level 2 university. It provides a range of vocational and higher education programs but does not rank among Australia's top research-intensive institutions.",
  },
  {
    trigger: "Is the University of New England Level 1 or 2?",
    content:
      "The University of New England (UNE) is considered a Level 2 institution. It is recognized for its focus on distance education and regional engagement rather than extensive research output.",
  },
  {
    trigger: "Is Western Sydney University Level 1 or 2?",
    content:
      "Western Sydney University is typically categorized as a Level 2 university. It has a strong regional presence and offers diverse programs but does not feature prominently in international rankings.",
  },
  {
    trigger: "Is Charles Sturt University Level 1 or 2?",
    content:
      "Charles Sturt University is generally considered a Level 2 institution. It focuses on practical and industry-aligned courses, particularly in regional areas, but lacks significant global research recognition.",
  },
  {
    trigger: "Is Curtin University Level 1 or 2?",
    content:
      "Curtin University is often regarded as a Level 1 university. It has a strong international presence and is ranked among the top universities globally, reflecting its research and teaching excellence.",
  },
  {
    trigger: "Is La Trobe University Level 1 or 2?",
    content:
      "La Trobe University is typically classified as a Level 2 institution. While it offers quality education and research opportunities, it does not consistently rank among Australia's top-tier universities.",
  },
  {
    trigger: "Is Murdoch University Level 1 or 2?",
    content:
      "Murdoch University is generally considered a Level 2 university. It provides a range of programs and has research strengths in specific areas but lacks broad international recognition.",
  },
  {
    trigger: "Is Southern Cross University Level 1 or 2?",
    content:
      "Southern Cross University is typically categorized as a Level 2 institution. It focuses on regional education and applied research but does not feature prominently in global rankings.",
  },
  {
    trigger: "Is Swinburne University Level 1 or 2?",
    content:
      "Swinburne University of Technology is often regarded as a Level 2 university. It is known for its strong industry connections and technology-focused programs but does not rank among the top research-intensive universities.",
  },
  {
    trigger: "Is the University of Southern Queensland Level 1 or 2?",
    content:
      "The University of Southern Queensland (USQ) is generally considered a Level 2 institution. It emphasizes flexible learning options and regional engagement over extensive research activities.",
  },
  {
    trigger: "Is the University of Tasmania Level 1 or 2?",
    content:
      "The University of Tasmania is typically classified as a Level 2 university. It offers comprehensive programs and has research strengths in specific areas but does not consistently rank among Australia's top-tier institutions.",
  },
];

export const metadata: Metadata = {
  title: "Level 2 Universities in Australia | PickMyUni",
  description:
    "Discover Level 2 universities in Australia for international students. Explore affordable tuition, practical learning, and quality education at Assessment Level 2 universities with PickMyUni.",
  keywords: [
    "level 2 universities Australia",
    "assessment level 2 universities Australia",
    "AL2 universities Australia",
    "affordable universities Australia",
    "practical learning Australia",
    "international students Australia",
    "Australian universities",
    "university comparison",
    "courses in Australia",
    "PickMyUni",
    "scholarships Australia",
    "student resources",
    "PR pathway universities",
    "Australia admission",
    "university rankings Australia",
    "best level 2 universities Australia",
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
        src={data.icon}
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

const sec2Cards = (data: any, idx: number) => {
  return (
    <div className="space-y-2">
      <div className="relative mb-2 h-48 w-full">
        <Image
          src={
            data.icon ||
            "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path1.webp"
          }
          alt={data.title}
          fill
          className="rounded object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="">
        <p className="text-brand-primary p-4 text-2xl font-semibold">
          {idx + 1}. {data.title}
        </p>
        <div
          className="p-4 text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
};

const sec3Cards = (data: any) => {
  return (
    <div className="space-y-2">
      <Image
        src={data.icon}
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
                Level 2 Universities in Australia​
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Australia is one of the most sought-after destinations for
            international students, offering a world-class education system,
            diverse cultural experiences, and excellent career opportunities.
            When choosing a university in Australia, students often come across
            classifications such as Level 1 and Level 2 universities. While
            Level 1 universities are known for their extensive research
            contributions and higher global rankings, Level 2 universities in
            Australia provide an equally valuable education with strong industry
            connections, affordable tuition fees, and a focus on practical
            learning. These universities are an excellent choice for students
            looking for high-quality education without the financial burden of
            top-tier institutions.
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Why Choose Level 2 Universities in{" "}
              <span className="text-brand-secondary">Australia 2025?</span>
            </h2>
            <p className="mb-2 text-center">
              Choosing a Level 2 university in Australia comes with several
              benefits that make them an attractive option for both domestic and
              international students. Here’s why:
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
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              List of Level 2 Universities in{" "}
              <span className="text-brand-secondary">Australia</span>
            </h2>
            <p className="mb-2 text-center">
              Here is a list of well-regarded Level 2 universities in Australia
              that offer high-quality education and excellent career
              opportunities:
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {sec2CardData.map((data, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col items-center bg-[#F6F6F7] shadow hover:shadow-md"
                >
                  {sec2Cards(data, idx)}
                </div>
              ))}
            </div>
          </section>
        </div>
        <section>
          <div className="bg-brand-secondary py-24">
            <div className="container mx-auto flex flex-col justify-center">
              <h2 className="mb-4 text-center text-4xl font-semibold text-white">
                How to Find the Best Level 2 Universities{" "}
                <span>in Australia?</span>
              </h2>
              <p className="mb-2 text-center text-white">
                Finding the right Level 2 university in Australia requires
                thorough research. Here are some steps to help you choose the
                best university for your academic and career goals:
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
              How FindMyUni Helps You Choose the{" "}
              <span className="text-brand-secondary">Right University</span>
            </h2>
            <p className="mx-auto max-w-[1000px] text-center">
              At FindMyUni, we understand that choosing the right university is
              a crucial decision for international students. That’s why we offer
              expert guidance and resources to help students find the perfect
              institution based on their academic goals and budget.
            </p>
          </section>
          <section className="container flex flex-col items-center gap-8 lg:flex-row-reverse">
            <div className="flex-1">
              <h2 className="text-brand-primary text-center text-h1 leading-tight md:text-start">
                Our Services{" "}
                <span className="text-brand-secondary">Include:</span>
              </h2>
              <ul className="my-4 list-inside list-disc space-y-1 pl-4">
                <li>
                  <span className="font-bold">
                    Personalized University Recommendations:
                  </span>{" "}
                  We analyze your academic background and preferences to suggest
                  the best universities in Australia.
                </li>
                <li>
                  <span className="font-bold">Course Comparison Tools:</span>{" "}
                  FindMyUni helps students compare courses across different
                  universities to make informed decisions.
                </li>
                <li>
                  <span className="font-bold">
                    Visa and Admission Assistance:
                  </span>{" "}
                  We provide support for student visa applications and
                  university admissions.
                </li>
                <li>
                  <span className="font-bold">
                    OSHC and Student Support Services:
                  </span>{" "}
                  We assist students with Overseas Student Health Cover (OSHC)
                  and other essential services to make their transition to
                  Australia smooth.
                </li>
                <li>
                  <span className="font-bold">
                    Internship and Career Guidance:
                  </span>{" "}
                  We help students connect with internship opportunities and
                  career counseling to boost their employability.
                </li>
              </ul>
              <p>
                FindMyUni is dedicated to helping international students achieve
                their academic dreams in Australia. Whether you’re looking for a
                Level 1 or Level 2 university, our expert advisors ensure you
                make the best decision for your future.
              </p>
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
              FAQs on Level 2 Universities
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
    </>
  );
}
