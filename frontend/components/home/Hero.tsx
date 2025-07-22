import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-brand-primary relative overflow-hidden text-white">
      <Image
        src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/home_banner.webp"
        alt="University campus"
        fill
        priority
        className="object-cover"
        fetchPriority="high"
      />
      <div className="container relative z-10 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="z-10 py-10">
            <h1 className="mb-4 max-w-screen-sm font-anton text-4xl sm:text-[53px] sm:leading-[60px]">
              TRANSFER TO A BETTER UNI IN AUSTRALIA -{" "}
              <span className="text-yellow-400">
                HASSLE-FREE, AFFORDABLE, FAST.
              </span>
            </h1>
            <p className="mb-6 font-plus_jakarta text-sm leading-6 sm:text-lg sm:leading-9">
              Struggling with high fees or course dissatisfaction? <br />
              We&apos;ll help you transfer to the right university.
            </p>
            <Link href="/compare-universities-in-australia">
              <Button
                className="flex items-center"
                variant={"secondary"}
                size={"lg"}
              >
                Compare University
                <Image
                  src="/logo-button.svg"
                  alt="Icon"
                  width={50}
                  height={50}
                  className="-ml-2 h-12 w-12"
                  priority
                />
              </Button>
            </Link>
          </div>
          <div className="relative pt-16">
            <Image
              src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/student_image.webp"
              alt="Student with card"
              width={450}
              height={800}
              className="relative z-10"
              priority
              quality={55}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
