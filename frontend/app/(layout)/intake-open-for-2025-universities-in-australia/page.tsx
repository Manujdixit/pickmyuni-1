import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Intake2025Table } from "@/components/Intake2025Table";
import IntakeApplicationSteps from "@/components/IntakeApplicationsSteps";
import { Metadata } from "next";

const sec1CardData = [
  {
    title: "More Opportunities to Enroll",
    description: `<ul><li>Students can choose from multiple intakes based on their readiness and application timeline.</li>
      <li>
If a student misses one intake, they can apply for the next available option without waiting an entire year.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/globally-recognized-degrees-icon.webp",
  },
  {
    title: "Better Course Availability",
    description: `<ul>
    <li>February and July intakes offer a wide variety of courses across different fields.</li>
<li>November intake provides opportunities for specific short-term and vocational courses.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/high-quality-education-icon.webp",
  },
  {
    title: "Flexible Admission Process",
    description: `<ul><li>Universities offer different deadlines for each intake, giving students ample time to prepare and apply.</li>
<li>Students have the chance to strengthen their applications if they don’t meet the requirements for one intake.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/advanced-research-opportunities-icon.webp",
  },
  {
    title: "Increased Scholarship Opportunities",
    description: `<ul><li>Many universities offer scholarships in different intakes, increasing the chances of securing financial aid.</li>
<li>Some scholarships are exclusive to certain intakes, providing students with more funding options.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Better Career Planning and Work Opportunities",
    description: `<ul><li>Students can align their academic timeline with industry hiring trends and job opportunities.</li>
<li>More flexibility in planning internships, part-time jobs, and post-study work.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Smoother Visa Processing",
    description: `<ul><li>Students can choose an intake that allows enough time for visa processing and financial preparation.</li>
<li>Avoiding peak application periods can reduce delays in obtaining a student visa.</li></ul>`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
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
      <div
        className="p-4 text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-2"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />{" "}
    </div>
  );
};

const sec2Cards = (data: any, idx: number) => {
  return (
    <div className="space-y-2">
      <div className="relative mb-2 h-48 w-full">
        <Image
          src={
            data.url ||
            "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path1.webp"
          }
          alt={data.title}
          fill
          className="rounded object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="">
        <p className="text-brand-primary p-4 pb-0 text-2xl font-semibold">
          {data.title}
        </p>
        <div
          className="p-4 text-base font-normal [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
};

const accordionData = [
  {
    trigger: "How many intakes does Australia have?",
    content:
      "Australia generally has three main intakes – February (Primary Intake), July (Secondary Intake), and November (Limited Intake). However, availability may vary depending on the university and course.",
  },
  {
    trigger: "Which intake is best for Australia?",
    content:
      "The February intake is the most preferred as it offers the widest range of courses, scholarships, and accommodation options. However, if you miss this, the July intake is also a great option with ample opportunities.",
  },
  {
    trigger: "How much money is required to study in Australia?",
    content: `The cost varies based on the university and course. On average:
      <ul>
      <li><strong>Bachelor’s Degree:</strong> AUD 20,000 – 45,000 per year</li>
      <li><strong>Master’s Degree:</strong> AUD 22,000 – 50,000 per year</li>
      <li><strong>Living Expenses:</strong> Around AUD 24,505 per year (as per visa requirements)</li>
      </ul>`,
  },
  {
    trigger: "Is a gap accepted in Australia?",
    content:
      "Yes! Australian universities accept study gaps, but you may need to provide valid reasons (work experience, medical, or personal reasons). Usually, a gap of up to 2–3 years for bachelor's and 5 years or more for master's is acceptable with proper justification.",
  },
  {
    trigger: "What is the intake for a master’s in Australia?",
    content:
      "Most universities offer master’s programs in February and July. Some may have a November intake, but course availability is limited.",
  },
  {
    trigger: "What is the PhD intake in Australia?",
    content:
      "PhD programs in Australia usually have flexible intakes throughout the year. However, the primary intakes are February and July, depending on the availability of the university and research supervisor.",
  },
];

const tips = [
  {
    description:
      "To increase their chances of securing admission, students should begin their application process at least four to six months in advance.",
  },
  {
    description:
      "Application deadlines for master’s programs can vary. They are often divided into multiple rounds, such as Round 1, Round 2, and Round 3. ",
  },
  {
    description:
      "Some universities may also have separate deadlines for specific courses and scholarship applications, so it’s crucial to check directly with the institution.",
  },
  {
    description:
      "Top business schools, including the University of Sydney and the University of New South Wales, typically follow a round-based application system. Their deadlines generally span from early August to mid-June. ",
  },
  {
    description:
      "Since application timelines can differ across universities and programs, students should always confirm the exact deadlines with their chosen institution.",
  },
];

const tips2 = [
  {
    title: "Academic Requirements",
    description:
      "Completion of the required educational qualifications (varies by course and university).",
  },
  {
    title: "English Proficiency",
    description: "IELTS, TOEFL, or PTE scores as per university guidelines.",
  },
  {
    title: "Visa Requirements",
    description: "A valid student visa (Subclass 500) for Australia.",
  },
  {
    title: "Financial Proof",
    description: "Sufficient funds to cover tuition fees and living expenses.",
  },
  {
    title: "Additional Requirements",
    description:
      "Some universities may require work experience, portfolios (for creative courses), or entrance exams.",
  },
];

const sec2CardData = [
  {
    title: "February Intake (Primary Intake)",
    description: `<ul>
<li>The most preferred intake for international students.</li>
<li>Offers the highest number of courses and scholarships.</li>
<li><strong>Admission deadlines</strong> - typically fall between August and December of the previous year.</li>
<li>Suitable for students who want to start their academic year with a wide range of available courses.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-melbourne-1.webp",
  },
  {
    title: "July Intake (Primary Intake)",
    description: `<ul>
<li>The second-largest intake with a wide range of courses available.</li>
<li>Ideal for students who missed the February intake.</li>
<li><strong>Application deadlines</strong> - usually range from March to May.</li>
<li>Offers a good number of scholarship opportunities and postgraduate programs.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-australian-national-university-anu-2.webp",
  },
  {
    title: "November Intake",
    description: `<ul>
<li>A smaller intake with fewer course options.</li>
<li>Best suited for specific programs and pathway courses.</li>
<li><strong>Application deadlines</strong> - vary depending on the university.</li>
<li>Ideal for students opting for vocational training and short-term diploma courses.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-sydney-3.webp",
  },
];

const descriptionData = [
  {
    title1: "April",
    title2: "Intake Australia",
    description1:
      "The April intake is a lesser-known but valuable opportunity for students looking to start their studies without waiting for the major February or July intakes. Not all universities have an April intake, but those that do typically offer diploma programs, foundation courses, and some postgraduate degrees. This intake is ideal for students who need extra time for visa processing, English proficiency tests, or financial arrangements.",
  },
  {
    title1: "June",
    title2: "Intake Australia",
    description1:
      "The June intake is another great option, especially for students who want to start mid-year but missed the main February intake. Several universities and institutions open admissions for business, IT, and vocational courses in June. This intake allows students to enter the academic cycle smoothly while avoiding the peak application rush. Additionally, starting in June means completing the program earlier than those who join in July.",
  },
  {
    title1: "September",
    title2: "Intake Australia",
    description1:
      "The September intake is growing in popularity among international students. While not as large as the February or July intakes, it provides a solid opportunity for those looking to begin their studies in the second half of the year. Many private colleges, TAFEs, and universities offer courses in fields like business, healthcare, and engineering during this intake. It’s particularly useful for students aligning their studies with visa approvals, financial readiness, or previous academic schedules. Business and Management, Information Technology, Engineering, Health Sciences, Environmental Science, Finance and Accounting are some September intake courses in Australia​.",
  },
];

export const metadata: Metadata = {
  title: "Australia Intake 2025 for International Students | PickMyUni",
  description:
    "Explore Australia Intake 2025 for international students. Learn about February, July, November intakes, deadlines, eligibility criteria, and benefits of studying in Australia with PickMyUni.",
  keywords: [
    "Australia intake 2025",
    "international students Australia",
    "February intake Australia",
    "July intake Australia",
    "November intake Australia",
    "Australia university intakes",
    "study in Australia 2025",
    "Australian universities",
    "university comparison",
    "courses in Australia",
    "PickMyUni",
    "scholarships Australia",
    "student resources",
    "PR pathway universities",
    "international student intake Australia",
    "Australia admission deadlines",
    "Australia visa requirements",
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
                Australia Intake 2025 for International Students{" "}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto space-y-20 py-12 lg:py-16">
          {/* Header Section */}
          <p className="text-lg font-normal">
            Australia is one of the top destinations for international students,
            offering world-class education, a diverse culture, and excellent
            career opportunities. With globally recognized universities,
            innovative courses, and a high standard of living, Australia remains
            a preferred choice for students worldwide. The country is home to
            some of the best academic institutions that provide state-of-the-art
            facilities, industry-oriented programs, and research opportunities
            that enhance students' professional growth.
            <br /> <br /> Australia university intakes differ from those in
            India. The deadlines for undergraduate and graduate courses vary by
            institution and program.
          </p>

          <section className="flex flex-col justify-center">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              Australia{" "}
              <span className="text-brand-secondary">Intake 2025</span>
            </h2>
            <p className="text-center">
              Australia has two major intakes for international students:
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8">
              <div className="flex items-center border-l-[6px] border-[#2C5680] bg-[#EAF0F5] p-4 text-xl font-semibold text-black">
                February and July
              </div>
              <div className="border-l-[6px] border-[#FF882E] bg-[#FFEFE3] p-4 text-xl text-black">
                Additionally, a smaller intake occurs between{" "}
                <strong>September and November</strong>.
              </div>
            </div>
          </section>
        </div>

        <section>
          <div className="pb-24">
            <div className="container flex flex-col items-center gap-8 text-white lg:flex-row">
              <div className="flex-1">
                <h2 className="text-brand-primary text-[26px] font-semibold">
                  Key Deadlines and Timeline Tips for Australia 2025 Intakes
                </h2>
                <br />
                <ul className="space-y-4">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        fill="#FF882E"
                        className="mt-1 h-6 w-6 flex-shrink-0"
                      />
                      <p className="text-base">
                        <span className="text-black">{tip.description}</span>
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

        <section className="container mx-auto flex flex-col justify-center pb-24">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
            Australia Intake 2025:{" "}
            <span className="text-brand-secondary">Key Details</span>
          </h2>
          <p className="mb-2 text-center">
            Australia has multiple intakes for international students, allowing
            flexibility in choosing the right time to begin their academic
            journey. The main Australia intake months ​include:
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

        <section className="bg-brand-secondary py-24">
          <Intake2025Table />
        </section>

        <section className="bg-brand-primary py-24">
          <div className="container">
            <h2 className="mb-4 text-center text-4xl font-semibold text-white">
              Other Australia Intake 2025 for International Students​
            </h2>
            <p className="mb-6 text-center text-white">
              Apart from these intakes, there are some other Intakes available
              in Australia for overseas students.
            </p>
            <div className="space-y-4">
              {descriptionData.map((data, idx) => (
                <div key={idx} className="rounded-2xl bg-[#25476A] p-9">
                  <h3 className="text-[26px] font-semibold text-white">
                    <span className="text-brand-secondary">{data.title1}</span>{" "}
                    {data.title2}
                    <p className="text-body text-white">{data.description1}</p>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto py-24">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
            Advantages of Intakes
            <span className="text-brand-secondary">in Australia​</span>
          </h2>
          <p className="mb-6 text-center text-black">
            Australia's multiple intakes provide flexibility and numerous
            benefits to international students. Some of the key advantages
            include:
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

        <section>
          <div className="pb-24">
            <div className="container flex flex-col items-center gap-8 text-white lg:flex-row-reverse">
              <div className="flex-1">
                <h2 className="text-brand-primary text-[36px] font-semibold">
                  Eligibility Criteria for Australia Intake 2025{" "}
                </h2>
                <p className="mb-2 mt-1 text-black">
                  To apply for the 2025 intake, students must meet the following
                  requirements:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  {tips2.map((tip, idx) => (
                    <li key={idx} className="ml-4 text-black">
                      <strong>{tip.title}:</strong> {tip.description}
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

        <section>
          <div className="bg-brand-secondary py-24">
            <div className="container mx-auto gap-8 text-white">
              <div className="flex-1">
                <h2 className="text-center text-h1 leading-tight text-white">
                  Application Process for Australia Intake 2025
                </h2>
                <IntakeApplicationSteps />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="py-24">
            <div className="container flex flex-col items-center gap-8 text-white lg:flex-row">
              <div className="flex-1">
                <h2 className="text-brand-primary text-[36px] font-semibold">
                  Why Choose Us for Your Application Assistance?{" "}
                </h2>
                <p className="mb-2 mt-1 text-black">
                  Applying for the Australia Intake 2025 can be overwhelming,
                  but we make the process seamless for you. Our expert
                  consultants provide:{" "}
                </p>
                <ul className="list-inside list-disc space-y-1 text-black">
                  <li>Personalized course selection guidance.</li>
                  <li>Assistance with application and documentation. </li>
                  <li>Visa and financial planning support. </li>
                  <li>Pre-departure briefings for a smooth transition. </li>
                  <li>
                    Help with accommodation arrangements and post-arrival
                    support.
                  </li>
                </ul>
                <h3 className="text-brand-secondary mt-6 text-[26px] font-semibold">
                  Get Started Today!{" "}
                </h3>
                <p className="text-black">
                  Plan your studies in Australia with expert guidance. Contact
                  us now to secure your spot for the 2025 intake!
                </p>
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

        <section className="container flex flex-col items-center gap-8 pb-24">
          <h2 className="text-brand-primary text-center text-h1 leading-tight">
            Frequently Ask{" "}
            <span className="text-brand-secondary">Questions</span>
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
