import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Mail } from "lucide-react";
import { getYear } from "@/utils/getYear";

export default function Footer() {
  return (
    <footer className="bg-brand-primary py-8 text-white md:pb-8 md:pt-16">
      <div className="container mx-auto">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-12 md:grid-cols-4">
          <div className="text-center sm:text-left">
            <div className="mb-4 flex items-center justify-center sm:justify-start">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/footer_logo.webp"
                alt="Logo"
                width={220}
                height={220}
                className="h-16 w-auto"
              />
            </div>
            <p className="mx-auto mb-4 max-w-sm text-sm text-gray-300 sm:mx-0">
              PickMyUni is the ideal platform for students looking for
              affordable universities in Australia. Students can pick their
              desired universities in Australia with our course and university
              transfer assistance. To accomplish your career goals, feel free to
              consult our team and grab the opportunity to enroll in your dream
              university.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="mb-4 text-lg font-bold">Navigations</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/transfer-service"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Transfer Service
                </Link>
              </li>
              <li>
                <Link
                  href="/top-universities-in-australia"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="mb-4 text-lg font-bold">University Levels</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/level1-universities-in-australia"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Level1 Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/level2-universities-in-australia"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Level2 Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/level3-universities-in-australia"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Level3 Universities
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="mb-4 text-lg font-bold">Legals</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Help
                </Link>
              </li>
            </ul>

            <h4 className="mb-4 mt-6 text-lg font-bold">Social Media</h4>
            <div className="flex justify-center space-x-4 sm:justify-start">
              <Link
                href="#"
                className="rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-6 text-center text-xs text-gray-400 sm:text-sm">
          <p>PickMyUni {getYear} © All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
