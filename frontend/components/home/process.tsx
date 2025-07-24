"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "STEP 1",
    description:
      "Search Your Desired Course\nBrowse a wide range of courses tailored for your learning goals",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/Step_1.webp",
    position: "left",
  },
  {
    number: 2,
    title: "STEP 2",
    description:
      "View Course Details Compare course features, reviews, and select the best fit for you.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/Step_2.webp",
    position: "right",
  },
  {
    number: 3,
    title: "STEP 3",
    description:
      "Enroll Online Simple and secure online enrollment within minutes.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/Step_3.webp",
    position: "left",
  },
  {
    number: 4,
    title: "STEP 4",
    description:
      "Start Learning Access your course material and start learning anytime, anywhere.",
    icon: "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/Step_4.webp",
    position: "right",
  },
];

// Memoized step component to avoid re-renders and optimize TBT
const ProcessStep = React.memo(function ProcessStep({
  step,
  index,
  isMobile,
}: {
  step: (typeof steps)[0];
  index: number;
  isMobile: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: isMobile ? "-50px" : "-100px",
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 25 : 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isMobile ? 0.4 : 0.5,
        delay: index * (isMobile ? 0.1 : 0.15),
        ease: "easeOut",
      }}
      className={isMobile ? "relative pl-12" : "relative"}
    >
      {/* Timeline Dot */}
      <div
        className={
          isMobile
            ? "bg-brand-secondary absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 transform rounded-full"
            : "bg-brand-secondary absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
        }
      />

      {isMobile ? (
        <div className="flex flex-col">
          <h3 className="text-brand-primary mb-2 font-bold">{step.title}</h3>
          <p className="mb-4 text-base font-extralight text-gray-600 md:text-xl">
            {step.description}
          </p>
          <div className="flex justify-center">
            <Image
              src={step.icon || "/placeholder.svg"}
              alt={`Step ${step.number}`}
              width={200}
              height={152}
              className="mx-auto"
              loading="lazy"
              priority={false}
            />
          </div>
        </div>
      ) : (
        <div className="grid items-center gap-8 md:grid-cols-2">
          {step.position === "right" ? (
            <>
              <div className="flex flex-col text-right md:pr-12">
                <div className="flex flex-col items-end">
                  <h3 className="text-brand-primary mb-2 font-bold">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-xl font-extralight text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className="ml-10 flex justify-start">
                <Image
                  src={step.icon || "/placeholder.svg"}
                  alt={`Step ${step.number}`}
                  width={282}
                  height={214}
                  loading="lazy"
                  priority={false}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mr-10 flex justify-end">
                <Image
                  src={step.icon || "/placeholder.svg"}
                  alt={`Step ${step.number}`}
                  width={282}
                  height={214}
                  loading="lazy"
                  priority={false}
                />
              </div>
              <div className="md:pl-12">
                <div className="flex flex-col">
                  <h3 className="text-brand-primary mb-2 font-bold">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-xl font-extralight text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
});

export default function ProcessSection() {
  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-semibold leading-tight md:mb-16">
          <span className="text-brand-primary">Our Process 4 Simple</span>{" "}
          <span className="text-brand-secondary">Steps</span>
        </h2>

        {/* Mobile Timeline (visible only on small screens) */}
        <div className="relative mx-auto w-full md:hidden">
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                isMobile={true}
              />
            ))}
          </div>
        </div>

        {/* Desktop Timeline (hidden on small screens) */}
        <div className="relative hidden md:block">
          {/* Vertical Timeline Line */}
          <div className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 transform bg-gray-200" />
          <div className="relative space-y-16">
            {steps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                isMobile={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
