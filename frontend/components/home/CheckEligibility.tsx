"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CheckEligibility() {
  const handleBookNowClick = () => {
    // Trigger the SitePopup bot button click
    const botButton = document.querySelector(
      '[aria-label="chat with ai"]',
    ) as HTMLButtonElement;
    if (botButton) {
      botButton.click();
    }
  };

  return (
    <div className="mb-16 mt-24 flex flex-col items-center justify-between rounded-lg bg-[#FAF4F0] p-8 md:flex-row">
      <div>
        <h3 className="text-brand-primary mb-2 text-[28px] font-semibold leading-tight sm:text-[26px]">
          Book A Free Counselling Session
        </h3>
      </div>
      <div className="mt-4 flex max-h-10 gap-24 sm:items-center sm:gap-0 md:mt-0">
        <Button variant={"secondary"} size={"lg"} onClick={handleBookNowClick}>
          Book Now
        </Button>
        <Image
          src="/logo.svg"
          alt="Graduation cap"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px"
          className="ml-4 h-24 w-24 md:flex md:h-28 md:w-28 lg:h-44 lg:w-44"
          loading="lazy"
        />
      </div>
    </div>
  );
}
