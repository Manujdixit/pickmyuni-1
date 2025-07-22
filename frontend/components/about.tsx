import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import TestimonialsSection from "./home/testimonials";
import ContactFormWrapper from "@/components/form/contact-form-wrapper";

const whatWeDoData = [
  {
    title: "University & Course Comparisons",
    description:
      "We make it easy to compare universities and courses across Australia, so you can find the perfect fit for your goals and budget.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/university_course_icon.webp",
  },
  {
    title: "Verified Student Reviews",
    description:
      "Get real opinions and experiences from current and past students, giving you a genuine look at life on campus.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/verified_student_icon.webp",
  },
  {
    title: "Scholarship Opportunities",
    description:
      "Explore scholarships that match your situation, helping you fund your studies and achieve your dreams.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/scholarships_opportunities_icon.webp",
  },
  {
    title: "QnA Support",
    description:
      "Have questions? Our expert team is here to answer them and guide you at every step.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/qna_support_icon.webp",
  },
  {
    title: "Transfer Service",
    description:
      "Already studying but thinking of switching courses or universities? We specialise in helping students transfer seamlessly and find the right institution for their future.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/transfer_service_icon.webp",
  },
  {
    title: "Visa Services",
    description:
      "No matter where you are in your education journey, PickMyUni is your reliable partner every step of the way.",
    url: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/visa_services.webp",
  },
];

const trustReasons = [
  {
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/power_track_icon.webp",
    title: "Proven Track Record",
    description:
      "We've helped thousands of students make informed choices, from first-year study plans to transferring to the perfect course.",
  },
  {
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/accurate_relaible_icon.webp",
    title: "Accurate and Reliable Data",
    description:
      "Our information is gathered directly from university websites and official government resources—no guesswork, just real facts.",
  },
  {
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/experience_team.webp",
    title: "Experienced Team",
    description:
      "Our advisors bring decades of experience in student support and university pathways, offering insights and answers you can rely on.",
  },
  {
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/student_first_approch_icon.webp",
    title: "Student-First Approach",
    description:
      "We’re not here to push one university over another. We’re here to help you find the right fit for you.",
  },
  {
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/transparent_support_icon.webp",
    title: "Transparent Support",
    description:
      "From course comparisons to visa advice, we’re upfront and honest about every step of the process—no hidden surprises.*",
  },
];

const AchievementsSection = () => (
  <section className="bg-brand-primary w-full py-20">
    <div className="mx-auto max-w-5xl text-center">
      <h2 className="mb-10 text-4xl font-semibold text-white">
        Achievements & Impact
      </h2>
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <span className="mr-1 h-8 w-2 bg-[#5B7EA6]"></span>
            <span className="h-12 w-2 bg-[#FF8C22]"></span>
            <span className="ml-2 text-3xl font-bold text-[#FF8C22]">500+</span>
          </div>
          <span className="mt-2 text-base text-white">Student Reviews</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <span className="mr-1 h-8 w-2 bg-[#5B7EA6]"></span>
            <span className="h-12 w-2 bg-[#FF8C22]"></span>
            <span className="ml-2 text-3xl font-bold text-[#FF8C22]">100+</span>
          </div>
          <span className="mt-2 text-base text-white">
            Universities Covered
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <span className="mr-1 h-8 w-2 bg-[#5B7EA6]"></span>
            <span className="h-12 w-2 bg-[#FF8C22]"></span>
            <span className="ml-2 text-3xl font-bold text-[#FF8C22]">200+</span>
          </div>
          <span className="mt-2 text-base text-white">
            Scholarship Listings
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-end">
            <span className="mr-1 h-8 w-2 bg-[#5B7EA6]"></span>
            <span className="h-12 w-2 bg-[#FF8C22]"></span>
            <span className="ml-2 text-3xl font-bold text-[#FF8C22]">250+</span>
          </div>
          <span className="mt-2 text-base text-white">Student Transfers</span>
        </div>
      </div>
    </div>
  </section>
);

const ReadyToFindSection = () => (
  <section className="w-full bg-[#FAF4F0] py-20">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
      <div className="flex-1">
        <h2 className="mb-2 text-2xl font-semibold text-[#335B82] md:text-3xl">
          Ready to Find Your{" "}
          <span className="text-[#FF8C22]">Perfect University?</span>
        </h2>
        <p className="mb-5 max-w-lg text-gray-700">
          With PickMyUni, you can explore trusted comparisons, read verified
          student reviews, and discover the right scholarships and courses for
          your goals. Take the first step towards your dream university today.
        </p>
        <Link href="/compare-universities-in-australia" passHref legacyBehavior>
          <a>
            <button className="rounded bg-[#FF8C22] px-5 py-2 font-semibold text-white transition-colors hover:bg-[#e67613]">
              Start Comparing Now
            </button>
          </a>
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <Image
          src="/graduate.svg"
          alt="Graduate Illustration"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/about_us_banner_desktop.webp"
          alt="Library with books on shelves"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Find the Perfect University for Your Future{" "}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-2 py-20">
          <h2 className="text-brand-primary text-4xl font-semibold">
            About PickMyUni{" "}
          </h2>
          <p className="mb-2 text-lg text-gray-600">
            Australia’s trusted platform for comparing universities, courses,
            and scholarships, designed to help you find the right fit for your
            future. Join thousands of students using PickMyUni to make confident
            decisions about their education.
          </p>
          <Link href={"/top-universities-in-australia"}>
            <Button variant={"secondary"}>Explore Universities</Button>
          </Link>
        </div>

        {/* Who we are Section */}
        <section className="my-20">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="md:w-2/3">
              <h2 className="text-brand-primary mb-4 text-4xl font-semibold">
                Who We Are
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                PickMyUni is your trusted Australian-based platform dedicated to
                helping domestic and international students make the best
                decisions for their education. We provide easy-to-use university
                comparisons, real student reviews, and detailed information
                about courses, fees, scholarships, and more.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our team also specialises in university transfer services to
                help students switch to their ideal course or institution with
                confidence. And for international students, we provide reliable
                visa services to make studying in Australia smooth and
                hassle-free. At PickMyUni, it’s all about putting students
                first—always.
              </p>
            </div>
            <div className="md:w-1/3">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/who_we_are.webp"
                alt="Graduate looking at an audience"
                width={500}
                height={350}
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* our mission section */}
        <section className="my-32">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <Card className="border-0 bg-[#F6F6F7] p-6 shadow-sm sm:w-1/2">
              <CardContent className="pt-6">
                <Image
                  src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/mission_icon.webp"
                  alt="Icon"
                  width={90}
                  height={90}
                />
                <h4 className="text-brand-primary mb-3 text-4xl font-semibold">
                  Our Mission
                </h4>
                <p className="text-lg text-gray-600">
                  At PickMyUni, our mission is to provide you with the best
                  university search experience. We strive to make the process of
                  comparing universities and choosing the right fit for your
                  future as easy and stress-free as possible.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-[#F6F6F7] p-6 shadow-sm sm:w-1/2">
              <CardContent className="pt-6">
                <Image
                  src={
                    "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/vision_icon.webp"
                  }
                  alt="Icon"
                  width={90}
                  height={90}
                />
                <h4 className="text-brand-primary mb-3 text-4xl font-semibold">
                  Our Vision
                </h4>
                <p className="text-lg text-gray-600">
                  At PickMyUni, our vision is to become the go-to platform for
                  students looking to find the perfect university for their
                  future. We believe that every student deserves access to the
                  best university experience, and we are committed to making it
                  easy and stress-free.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* what we do section */}
        <section className="mt-20 flex flex-col gap-12">
          <div className="">
            <h2 className="text-brand-primary mb-4 text-center text-4xl font-semibold">
              What We Do
            </h2>
            <p className="text-center text-lg text-gray-600">
              At PickMyUni, we’re committed to providing students with
              everything they need to make the best decisions for their future.
              Here’s how we help:
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whatWeDoData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 rounded-xl bg-[#F6F6F7] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src={item.url}
                  alt="Icon"
                  width={70}
                  height={70}
                  className="size-16"
                />
                <div>
                  <h3 className="text-brand-primary mb-2 text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-base font-normal text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="font-base mb-12 text-center text-lg italic text-gray-600">
            No matter where you are in your education journey, PickMyUni is your
            reliable partner every step of the way.
          </h2>
        </section>

        {/* our expertise section */}
        <section className="my-20">
          <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
            <div className="md:w-2/3">
              <h2 className="text-brand-primary mb-4 text-4xl font-semibold">
                Our Expertise &{" "}
                <span className="text-brand-secondary">Experience</span>
              </h2>
              <p className="mb-4 text-lg font-normal text-gray-600">
                We’re more than just a comparison tool—we’re a team of education
                experts, data specialists, and advisors dedicated to making your
                university journey as smooth as possible.
              </p>
              <ul className="list-inside list-disc space-y-2 text-lg text-gray-600">
                <li>
                  <span className="text-brand-primary font-bold">9+ Years</span>{" "}
                  of experience in education Consulting
                </li>
                <li>
                  <span className="text-brand-primary font-bold">10,000+</span>{" "}
                  course comparisons to date
                </li>
                <li>
                  <span className="text-brand-primary font-bold">
                    Real-time data
                  </span>{" "}
                  from universities and government sources
                </li>
                <li>
                  <span className="text-brand-primary font-bold">500+ </span>
                  student stories
                </li>
                <li>
                  <span className="text-brand-primary font-bold">
                    Trusted support
                  </span>{" "}
                  for both domestic and international students
                </li>
              </ul>
              <p className="mt-4 text-lg text-gray-600">
                Each university has its own eligibility criteria, and your
                application may depend on your previous academic performance,
                the availability of seats, and the university’s credit transfer
                policies.
              </p>
            </div>
            <div className="md:w-1/3">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/who_we_are.webp"
                alt="Graduate looking at an audience"
                width={500}
                height={350}
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
      {/* why trust pickmyuni section */}
      <section className="bg-brand-secondary px-2 py-12 md:px-0">
        <div className="container mx-auto text-center">
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Why Trust PickMyUni?
          </h2>
          <p className="mb-8 text-white">
            Here’s why students across Australia and around the world trust
            PickMyUni:
          </p>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustReasons.slice(0, 3).map((reason, idx) => (
              <div
                key={reason.title}
                className="flex min-h-[180px] flex-col items-start rounded-lg bg-white p-6 text-left shadow-md"
              >
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={70}
                  height={70}
                  className="mb-4"
                />
                <h3 className="mb-2 text-lg font-semibold text-blue-900">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-700">{reason.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mb-6 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {trustReasons.slice(3).map((reason, idx) => (
              <div
                key={reason.title}
                className="flex min-h-[180px] flex-col items-start rounded-lg bg-white p-6 text-left shadow-md"
              >
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={70}
                  height={70}
                  className="mb-4"
                />
                <h3 className="mb-2 text-lg font-semibold text-blue-900">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-700">{reason.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 italic text-white">
            At PickMyUni, we’re all about helping you make the best choice for
            your future—because your future matters.
          </p>
        </div>
      </section>

      <TestimonialsSection />
      <div className="bg-brand-primary">
        <hr className="mx-auto max-w-6xl" />
      </div>
      {/*achievements section */}
      <AchievementsSection />
      <ReadyToFindSection />

      <section className="container mx-auto w-full py-20">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-brand-primary text-4xl font-semibold">
            Have <span className="text-brand-secondary">Questions?</span>
          </h2>
          <p className="my-2 text-gray-700">
            We’d love to hear from you. Reach out to our team or drop your
            question below!
          </p>
        </div>
        <div className="container mx-auto mt-8">
          <ContactFormWrapper />
        </div>
      </section>
    </div>
  );
}
