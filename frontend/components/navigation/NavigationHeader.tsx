"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

// Lazy load the modal components only when needed
// const LeadWrapper = dynamic(() => import("../modal/lead-wrapper"), {
//   ssr: false,
//   loading: () => null,
// });

const ContactWrapper = dynamic(
  () => import("@/components/modal/contact-wrapper"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-blue-800 font-bold text-xl">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/header_logo.webp"
                alt="Logo"
                width={150}
                height={150}
                className="h-12 w-auto"
              />
            </div>
          </Link>
          <div className="flex gap-10">
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-800">
                Home
              </Link>
              <Link
                href="/compare-universities-in-australia"
                className="text-gray-600 hover:text-blue-800"
              >
                Compare
              </Link>
              <Link
                href="/pr-courses-in-australia"
                className="text-gray-600 hover:text-blue-800"
              >
                PR Courses
              </Link>
              <Link
                href="/transfer-assistance"
                className="text-gray-600 hover:text-blue-800"
              >
                Transfer Assistance
              </Link>
              <Link
                href="/student-resources"
                className="text-gray-600 hover:text-blue-800"
              >
                Student Resources
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden xl:flex items-center space-x-3">
              {/* <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-800 hover:bg-blue-900 text-white"
              >
                Apply Now
              </Button> */}
              <Button
                onClick={() => setIsConsultationModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Request a Free Consultation
              </Button>
            </div>
          </div>
          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button aria-label="menu-toggle">
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64">
                <SheetHeader className="px-6 pt-6 pb-2">
                  <SheetTitle className="text-blue-800 text-xl">
                    PickMyUni
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <nav className="flex flex-col space-y-4 px-6 py-2 flex-1">
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/compare-universities-in-australia"
                      className="text-gray-600 hover:text-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Compare
                    </Link>
                    <Link
                      href="/pr-courses-in-australia"
                      className="text-gray-600 hover:text-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      PR Courses
                    </Link>
                    <Link
                      href="/transfer-assistance"
                      className="text-gray-600 hover:text-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Transfer Assistance
                    </Link>
                    <Link
                      href="/student-resources"
                      className="text-gray-600 hover:text-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Student Resources
                    </Link>
                  </nav>
                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => {
                        setIsConsultationModalOpen(true);
                        setIsOpen(false);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white w-full"
                    >
                      Request a Free Consultation
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Conditionally render modals only when they are opened */}
      {/* {isModalOpen && (
        <LeadWrapper open={isModalOpen} onOpenChange={setIsModalOpen} />
      )} */}
      {isConsultationModalOpen && (
        <ContactWrapper
          open={isConsultationModalOpen}
          onOpenChange={setIsConsultationModalOpen}
        />
      )}
    </div>
  );
}
