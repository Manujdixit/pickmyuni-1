import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChartNoAxesCombined,
  FileTextIcon,
  GraduationCapIcon,
  CircleDollarSign,
} from "lucide-react";
import PrApplicationSteps from "@/components/PrApplicationsSteps";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";
import { PRCoursesTable } from "@/components/PrCoursesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Top PR Courses in Australia by PickMyUni | Compare & Choose the Right Path",
  description:
    "Explore the best PR courses in Australia that increase your chances of permanent residency. Compare universities, course durations, and career outcomes with PickMyUni.",
  keywords: [
    "PR pathway courses Australia 2025",
    "permanent residency courses Australia",
    "skilled migration Australia",
    "PR courses Australian universities",
    "immigration pathway courses",
    "skill assessment courses",
    "Regional Occupation List courses",
    "Australian immigration education",
  ],
  openGraph: {
    title: "PR Pathway Courses in Australia 2025 | PickMyUni",
    description:
      "Find the best courses that lead to permanent residency in Australia. Complete guide to PR pathway education in 2025.",
    type: "website",
  },
};

export default function PrPath() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96">
          <Image
            src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path_banner.webp"
            alt="Library with books on shelves"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto pb-8">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Best PR Courses in Australia 2025
              </h1>
            </div>
          </div>
        </div>
        {/* section1 */}
        <div className="container mx-auto flex flex-col gap-y-10 py-12">
          <p className="text-body text-gray-950">
            Australia is one of the top destinations for international students
            seeking quality education and a promising future. Many students aim
            to study PR pathway courses in Australia that provide a strong route
            toward living in Australia. If you are planning to build your career
            here, it is crucial to choose from the PR leading courses in
            Australia 2025 that align with the skills in demand. The Australian
            government plans to significantly increase its annual permanent
            immigration intake from 35,000 to 195,000. This step will increase
            the chances of overseas students to gain permanent residency in
            Australia after completing the PR courses in Australian
            universities.
          </p>

          {/* What Are PR List Courses Section */}
          <div className="flex flex-col items-start gap-8 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-brand-primary mb-6 text-h1">
                What Are PR List Courses in Australia 2025?
              </h2>

              <div className="text-body text-gray-950">
                <p className="mb-4">
                  The Australian Government's Department of Home Affairs website
                  doesn't provide a specific list titled "PR Courses in
                  Australia." Instead, the key to identifying courses that can
                  lead to Permanent Residency (PR) lies in understanding
                  Australia's immigration framework, particularly the Skilled
                  Occupation List (SOL) and the related lists.
                </p>
                <p className="mb-4">
                  These highlight occupations in demand, and studying a course
                  aligned with these occupations can improve your chances of
                  securing PR through pathways like the General Skilled
                  Migration program.
                </p>
                <p className="mb-6">
                  Selecting the right PR leading course in Australia is
                  essential to meet the eligibility criteria for skilled
                  migration. Below is a detailed list of some of the best PR
                  Pathways Courses in Australia 2025 across various industries:
                </p>

                <ul className="ml-5 list-outside list-disc space-y-2">
                  <li>
                    The Skilled Occupation List is split into two main
                    categories:
                  </li>
                  <li>Medium and Long-term Strategic Skills List (MLTSSL)</li>
                  <li>
                    Occupations with long-term demand: Courses tied to these
                    occupations:
                  </li>
                  <li>Short-term Skilled Occupation List (STSOL)</li>
                </ul>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <Image
                  src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path1.webp"
                  alt="PR Courses in Australia"
                  width={500}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* PR Pathways Courses */}
          <div className="mt-10">
            <h2 className="text-brand-primary text-h1">
              Regional Occupation List (ROL)
            </h2>
            <p className="my-6 text-body">Course tied to these occupations:</p>

            <div className="mt-6">
              <PRCoursesTable />
            </div>
          </div>

          {/* What Are PR List Courses Section */}
          <div className="flex flex-col items-start gap-8 py-12 lg:flex-row-reverse">
            <div className="flex-1">
              <h2 className="text-brand-primary mb-6 text-h1">
                Popular Courses for PR in Australia
              </h2>

              <div className="text-body text-gray-950">
                <ol>
                  <li className="text-brand-primary mb-2 text-h2">
                    1. Trade Courses in Australia for PR
                  </li>
                  <p className="mb-4">
                    The Australian Government's Department of Home Affairs
                    website doesn't provide a specific list titled "PR Courses
                    in Australia." Instead, the key to identifying courses that
                    can lead to Permanent Residency (PR) lies in understanding
                    Australia's immigration framework, particularly the Skilled
                    Occupation List (SOL) and the related lists.
                  </p>
                  <li className="text-brand-primary mb-2 text-h2">
                    2. Diploma Courses for PR in Australia
                  </li>
                  <p className="mb-4">
                    Many students opt for diploma courses for PR in Australia as
                    they provide practical training and high employability.
                    These courses include:
                  </p>
                  <ul className="mb-4 ml-5 list-outside list-disc space-y-1">
                    <li>Diploma of Nursing</li>
                    <li>Diploma of Automotive Technology</li>
                    <li>Diploma of Hospitality Management</li>
                  </ul>
                  <li className="text-brand-primary mb-2 text-h2">
                    3. IT & Engineering PR Pathway Courses in Australia
                  </li>
                  <p className="mb-4">
                    Australia requires skilled professionals in IT and
                    engineering fields. Students pursuing PR pathway courses in
                    Australia 2025 in these sectors can apply for PR under the
                    General Skilled Migration (GSM) program.
                  </p>
                </ol>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <Image
                  src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/pr_path2.webp"
                  alt="PR Courses in Australia"
                  width={500}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* How to Apply for PR After Completing Your Course */}
        <PrApplicationSteps />

        {/* Why Study PR Leading Courses in Australia */}
        <div className="bg-blue-50 py-24">
          <div className="container flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-brand-primary mb-8 text-h1 leading-tight">
                Why Study PR Leading Courses in
                <span className="text-brand-secondary"> Australia?</span>
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* High employability */}
                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <ChartNoAxesCombined className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      High employability and
                    </h3>
                    <p className="text-gray-600">career growth</p>
                  </div>
                </div>

                {/* Strong migration pathway */}
                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <FileTextIcon className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      Strong migration pathway
                    </h3>
                    <p className="text-gray-600">System</p>
                  </div>
                </div>

                {/* Quality education */}
                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <GraduationCapIcon className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      Quality education and global
                    </h3>
                    <p className="text-gray-600">recognition</p>
                  </div>
                </div>

                {/* Competitive salary */}
                <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-md">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <CircleDollarSign className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">
                      Competitive salary packages
                    </h3>
                    <p className="text-gray-600">in PR-listed occupations</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  className="inline-flex items-center gap-2 font-semibold"
                  variant={"secondary"}
                >
                  <FileTextIcon className="h-4 w-4" />
                  Download PR List Courses in Australia 2025 PDF
                </Button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>
                  For a detailed list of PR listed courses in Australia 2025,
                  you can download the{" "}
                  <span className="font-semibold">
                    PR list courses in Australia 2025 PDF
                  </span>{" "}
                  from the official Australian Government website or consult
                  with a migration agent for up-to-date information.
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

        <div className="container py-24">
          {" "}
          <div className="flex-1">
            <h2 className="text-brand-primary mb-6 text-h1">Final Thoughts </h2>

            <div className="text-body text-gray-950">
              <p className="mb-4">
                Choosing the best courses for PR in Australia is crucial for a
                successful career and migration pathway. Whether you opt for
                trade courses in Australia for PR, IT, nursing, or engineering,
                ensuring that your occupation is in demand can significantly
                boost your PR prospects.
              </p>
              <p className="mb-4">
                If you need assistance in selecting the right PR pathway courses
                in Australia, our team is here to guide you throughout the
                process. Contact us today for expert study assistance and PR
                pathway planning!
              </p>
            </div>
          </div>
        </div>

        <div className="container pb-24">
          <div className="flex-1">
            <h2 className="text-brand-primary mb-6 text-center text-h1">
              FAQs on Best PR Courses in Australia 2025
            </h2>

            <div className="mx-auto max-w-4xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What are the best PR courses in Australia for 2025?
                  </AccordionTrigger>
                  <AccordionContent>
                    The best PR courses in Australia for 2025 include Nursing,
                    Engineering, Information Technology, Accounting, Teaching,
                    Social Work, and various trade courses like Plumbing and
                    Electrical work. These courses are aligned with Australia's
                    skilled occupation lists and offer strong pathways to
                    permanent residency.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How long does it take to get PR after completing a course in
                    Australia?
                  </AccordionTrigger>
                  <AccordionContent>
                    The time to obtain PR varies depending on your course,
                    points score, and visa category. Generally, it can take
                    12-24 months after graduation, provided you meet all
                    requirements including work experience, English proficiency,
                    and skills assessment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Do I need work experience to apply for PR after studying in
                    Australia?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, most PR pathways require relevant work experience. The
                    amount varies by occupation - typically 1-3 years of skilled
                    work experience in your field of study. Some occupations may
                    have specific requirements, so it's important to check the
                    current skilled occupation lists.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    What is the minimum points score required for Australian PR?
                  </AccordionTrigger>
                  <AccordionContent>
                    The minimum points score for SkillSelect is 65 points, but
                    competitive scores are typically higher (80-90+ points)
                    depending on your occupation. Points are awarded for age,
                    English proficiency, educational qualifications, work
                    experience, and other factors.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Are trade courses good for PR in Australia?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, trade courses are excellent for PR in Australia.
                    Occupations like plumbing, electrical work, carpentry, and
                    automotive trades are in high demand. Trade courses are
                    shorter in duration, cost-effective, and offer good
                    employment prospects with competitive salaries.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Can I apply for PR while studying in Australia?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can prepare your PR application while studying, but you
                    typically need to complete your qualification first. You'll
                    need to complete skills assessment, gather required
                    documents, and ensure you meet all criteria before
                    submitting your Expression of Interest (EOI).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
