import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DollarSign, RefreshCw, Globe, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckEligibility from "@/components/home/CheckEligibility";
import CitiesSection from "@/components/home/cities";
import Link from "next/link";

const costData = [
  {
    currentUni: "University of Sydney",
    currentCourse: "MBA",
    currentFee: "AUD 57,200",
    suggestedUni: "UBSS",
    suggestedCourse: "MBA",
    suggestedFee: "AUD 28,728",
    savings: "AUD 28,472",
  },
  {
    currentUni: "University of Melbourne",
    currentCourse: "Master of IT",
    currentFee: "AUD 58,976",
    suggestedUni: "Apex Institute of Higher Education",
    suggestedCourse: "Master of IT",
    suggestedFee: "AUD 31,400",
    savings: "AUD 27,576",
  },
  {
    currentUni: "The University of Melbourne",
    currentCourse: "Master of Early Childhood",
    currentFee: "AUD 126,751",
    suggestedUni: "Southern Cross University",
    suggestedCourse: "Master of Early Childhood",
    suggestedFee: "AUD 50,000",
    savings: "AUD 76,751",
  },
  {
    currentUni: "Deakin University",
    currentCourse: "Master of Engineering",
    currentFee: "AUD 92,216",
    suggestedUni: "Southern Cross University",
    suggestedCourse: "Master of Engineering",
    suggestedFee: "AUD 50,000",
    savings: "AUD 42,216",
  },
  {
    currentUni: "Southern Cross Education Institute",
    currentCourse: "Bachelor of Community Services",
    currentFee: "AUD 94,800",
    suggestedUni: "Acknowledge Education",
    suggestedCourse: "Bachelor of Community Services",
    suggestedFee: "AUD 54,200",
    savings: "AUD 40,600",
  },
];

const benefits = [
  {
    title: "Save on Tuition Fees",
    icon: <DollarSign />,
  },
  {
    title: "Easy Credit Transfer Process",
    icon: <RefreshCw />,
  },
  {
    title: "PR Pathway Courses",
    icon: <Globe />,
  },
  {
    title: "Expert Visa Support",
    icon: <FileText />,
  },
];

export default function CostComparisonSection() {
  return (
    <>
      <section className="bg-brand-secondary py-16">
        <div className="container mx-auto mb-12">
          <div className="flex flex-row justify-center md:justify-between">
            <h2 className="text-center text-4xl font-semibold leading-[100%] text-white md:text-start">
              Compare Your Uni Costs
            </h2>
            <Link href="/compare">
              <Button className="hidden md:block">See more savings</Button>
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    colSpan={1}
                    className="text-brand-primary border-x-2 border-b-2 border-[#FF882E] bg-blue-100 text-center text-h3"
                  >
                    Course
                  </TableHead>
                  <TableHead
                    colSpan={2}
                    className="text-brand-primary border-x-2 border-b-2 border-[#FF882E] bg-blue-100 text-center text-h3"
                  >
                    CURRENT UNIVERSITIES COST PER YEAR
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="text-brand-secondary border-x-2 border-b-2 border-[#FF882E] bg-orange-100 text-center text-h3"
                  >
                    UNIVERSITIES SUGGESTION FOR COST SAVING
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border-x-2 border-[#ff882e] bg-blue-100 text-h4 text-gray-600">
                    Course
                  </TableHead>
                  <TableHead className="border-x-2 border-[#ff882e] bg-blue-100 text-h4 text-gray-600">
                    Current Uni
                  </TableHead>

                  <TableHead className="border-x-2 border-[#ff882e] bg-blue-100 text-h4 text-gray-600">
                    Course Fee
                  </TableHead>
                  <TableHead className="border-x-2 border-[#ff882e] bg-orange-100 text-h4 text-gray-600">
                    Suggested Uni
                  </TableHead>
                  {/* <TableHead className="text-h4 bg-orange-100 text-gray-600 border-x-2 border-[#ff882e]">
                    Course
                  </TableHead> */}
                  <TableHead className="border-x-2 border-[#ff882e] bg-orange-100 text-h4 text-gray-600">
                    Course Fee
                  </TableHead>
                  <TableHead className="border-x-2 border-[#ff882e] bg-orange-100 text-h4 font-bold text-green-600">
                    Savings
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={`text-h4 leading-tight hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <TableCell className="border-x-2 border-[#ff882e]">
                      {row.currentCourse}
                    </TableCell>
                    <TableCell className="border-x-2 border-[#ff882e]">
                      {row.currentUni}
                    </TableCell>

                    <TableCell className="border-x-2 border-[#ff882e]">
                      {row.currentFee}
                    </TableCell>
                    <TableCell className="border-x-2 border-[#ff882e]">
                      {row.suggestedUni}
                    </TableCell>
                    {/* <TableCell className="border-x-2 border-[#ff882e]">
                      {row.suggestedCourse}
                    </TableCell> */}
                    <TableCell className="border-x-2 border-[#ff882e]">
                      {row.suggestedFee}
                    </TableCell>
                    <TableCell className="border-x-2 border-[#ff882e] font-bold text-green-600">
                      {row.savings}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Link href="/compare">
              <Button className="md:hidden">See more savings</Button>
            </Link>
          </div>
        </div>
      </section>

      <CitiesSection />

      <section className="container mt-10 flex flex-col">
        <div className="mt-12 flex flex-col items-center justify-center gap-12 md:flex-row">
          <div className="relative w-full md:w-1/3">
            <Image
              src={
                "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/why_choose_us_image.webp"
              }
              alt="Student with laptop"
              width={0}
              height={0}
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 350px, 400px"
              className="mx-auto h-auto w-full max-w-sm md:max-w-none"
            />
          </div>
          <div className="flex flex-col md:w-2/3">
            <h2 className="mb-3 text-center text-4xl font-semibold leading-tight md:text-left">
              <span className="text-brand-primary">Why Choose</span>{" "}
              <br className="md:hidden" />
              <span className="text-brand-secondary">PickMyUni</span>
            </h2>
            <p className="text-brand-primary mb-8 text-center text-xl font-normal md:text-left">
              We’ve helped{" "}
              <span className="font-bold">1000+ international students</span>{" "}
              successfully transfer and save money on education in Australia.”
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <Card className="flex items-start">
                    <CardContent className="flex items-center gap-2">
                      <div className="text-brand-secondary bg-brand-secondary rounded-full p-2 text-white">
                        {benefit.icon}
                      </div>
                      <h3 className="text-brand-primary font-bold">
                        {benefit.title}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CheckEligibility />
      </section>
    </>
  );
}
