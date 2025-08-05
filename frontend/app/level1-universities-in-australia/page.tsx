import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import { url } from "inspector";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

const sec1CardData = [
  {
    title: "Globally Recognized Degrees",
    description:
      "Graduating from a Level 1 university enhances your career prospects, as degrees from these institutions are recognized and respected worldwide. Employers and industries value graduates from these universities due to their academic rigor and industry-focused learning approach.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/globally-recognized-degrees-icon.webp",
  },
  {
    title: "High-Quality Education",
    description:
      "These universities maintain high academic standards, ensuring that students receive a top-notch education. With cutting-edge curriculum designs, well-structured programs, and expert faculty members, Level 1 universities provide students with a strong academic foundation.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/high-quality-education-icon.webp",
  },
  {
    title: "Advanced Research Opportunities",
    description:
      "Australia’s top-tier universities are known for their extensive research initiatives. Students can engage in innovative research projects, work with industry leaders, and contribute to groundbreaking discoveries.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/advanced-research-opportunities-icon.webp",
  },
  {
    title: "Excellent Campus Facilities",
    description:
      "From modern libraries to advanced laboratories, Assessment Level 1 universities provide state-of-the-art infrastructure to support students’ academic and extracurricular pursuits. These institutions focus on creating a conducive learning environment for both local and international students.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/excellent-campus-facilities-icon.webp",
  },
  {
    title: "Enhanced Career Opportunities",
    description:
      "Graduating from a top-ranked university increases your chances of securing employment with leading multinational companies. Many of these universities have strong ties with industries, offering internships, placements, and networking opportunities for students.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/enhanced-career-opportunities-icon.webp",
  },
  {
    title: "Scholarships and Financial Assistance",
    description:
      "Many Level 1 universities in Australia offer scholarships, grants, and financial aid to deserving international students. These scholarships help ease the financial burden and make quality education more accessible.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarships-and-financial-assistance-icon.webp",
  },
];

const sec2CardData = [
  {
    title: "The University of Melbourne",
    description: `<ul>
  <li>The University of Melbourne is among the top level 1 universities in Melbourne.</li>
  <li>Ranked among the top universities globally.</li>
  <li>Known for its research excellence and diverse student body.</li>
  <li>Offers a wide range of undergraduate and postgraduate programs.</li>
  <li>Best level 1 university in Melbourne.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-melbourne-1.webp",
  },
  {
    title: "The Australian National University (ANU)",
    description: `<ul>
  <li>Located in Canberra, ANU is Australia’s premier research institution.</li>
  <li>Strong focus on science, humanities, and international relations.</li>
  <li>Highly ranked globally for its academic programs and faculty.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-australian-national-university-anu-2.webp",
  },
  {
    title: "The University of Sydney",
    description: `<ul>
  <li>One of Australia’s oldest and most prestigious universities.</li>
  <li>Strong reputation in business, law, medicine, and engineering.</li>
  <li>Provides world-class facilities and industry connections.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-sydney-3.webp",
  },
  {
    title: "The University of Queensland (UQ)",
    description: `<ul>
  <li>Renowned for research in biotechnology, environmental sciences, and medicine.</li>
  <li>Offers excellent scholarships and career opportunities.</li>
  <li>Home to some of the best research centers in Australia.</li>
  <li>Known as one of the top-notch level 1 universities in Sydney.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-queensland-uq-4.webp",
  },
  {
    title: "Monash University",
    description: `<ul>
  <li>A member of the Group of Eight, known for its innovative teaching methods.</li>
  <li>Strong industry partnerships with leading global firms.</li>
  <li>Extensive international student support and exchange programs.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/monash-university-5.webp",
  },
  {
    title: "The University of New South Wales (UNSW Sydney)",
    description: `<ul>
  <li>Specializes in engineering, technology, and business disciplines.</li>
  <li>High employability rate for graduates.</li>
  <li>Strong focus on entrepreneurship and innovation.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-new-south-wales-unsw-sydney-6.webp",
  },
  {
    title: "The University of Western Australia (UWA)",
    description: `<ul>
  <li>Research-driven university known for excellence in the sciences and humanities.</li>
  <li>Located in Perth, offering a beautiful campus and a high quality of life.</li>
  <li>Provides various student support programs and scholarships.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-western-australia-uwa-7.webp",
  },
  {
    title: "The University of Adelaide",
    description: `<ul>
  <li>One of the oldest universities in Australia with a rich academic heritage.</li>
  <li>Known for agricultural sciences, health, and engineering programs.</li>
  <li>Offers extensive research facilities and industry collaborations.</li>
  <li>Popular Assessment level 1 universities in Australia for international students.</li>
</ul>
`,
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/the-university-of-adelaide-8.webp",
  },
];

const sec3CardData = [
  {
    title: "University Rankings",
    description:
      "Check global rankings such as QS World University Rankings and Times Higher Education Rankings to identify the top universities in Australia.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_rankings_icon.webp",
  },
  {
    title: "Accreditation & Reputation",
    description:
      "Ensure the university is accredited by Australian educational authorities and has a strong academic reputation.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accreditation-Reputation-icon.webp",
  },
  {
    title: "Course Offerings",
    description:
      "Select a university that offers programs aligning with your career goals and interests.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/course-offerings-icon.webp",
  },
  {
    title: "Industry Partnerships",
    description:
      "Look for universities with strong industry collaborations and internship opportunities.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/industry-partnerships-icon.webp",
  },
  {
    title: "Alumni Success",
    description:
      "Research the achievements of alumni and their career paths post-graduation.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/alumni-success-icon.webp",
  },
  {
    title: "Student Reviews & Experience",
    description:
      "Connect with current students or alumni to understand their experience at the university.",
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
              Level 1 Universities in Australia​
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto space-y-20 py-12 lg:py-16">
        {/* Header Section */}
        <p className="text-lg font-normal">
          Australia is renowned for its world-class education system, attracting
          thousands of international students each year. With globally
          recognized universities, state-of-the-art research facilities, and a
          strong emphasis on academic excellence, Australia has become a top
          destination for higher education. Among these institutions, Assessment
          Level 1 universities in Australia hold a prestigious position,
          offering high-quality education, excellent faculty, and superior
          infrastructure. If you are an international student aiming for a
          top-tier education in Australia, choosing a Level 1 university can be
          the best decision for your academic and professional growth.
        </p>

        <section className="flex flex-col justify-center">
          <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
            Why Choose Level 1 Universities in{" "}
            <span className="text-brand-secondary">Australia 2025?</span>
          </h2>
          <p className="mb-2 text-center">
            Level 1 universities in Australia are the most reputable and highly
            ranked institutions in the country. These universities provide
            exceptional benefits to students, making them the preferred choice
            for those seeking excellence in higher education.
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
            List of Level 1 Universities in{" "}
            <span className="text-brand-secondary">Australia</span>
          </h2>
          <p className="mb-2 text-center">
            Below is a list of some of the most prestigious Level 1 universities
            in Australia, known for their academic excellence and outstanding
            research contributions:
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
