import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Mail } from "lucide-react";
import { getYear } from "@/utils/getYear";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white py-8 md:pt-16 md:pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <Image
                src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/footer_logo.webp"
                alt="Logo"
                width={220}
                height={220}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-sm mx-auto sm:mx-0">
              PickMyUni is the ideal platform for students looking for
              affordable universities in Australia. Students can pick their
              desired universities in Australia with our course and university
              transfer assistance. To accomplish your career goals, feel free to
              consult our team and grab the opportunity to enroll in your dream
              university.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-4 text-lg">Navigations</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/transfer-service"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Transfer Service
                </Link>
              </li>
              <li>
                <Link
                  href="/university"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-4 text-lg">Courses</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Technology & Data
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Business & Finance
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Design & Creativity
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Personal Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Business & Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  And Many More
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-4 text-lg">Legals</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Help
                </Link>
              </li>
            </ul>

            <h4 className="font-bold mt-6 mb-4 text-lg">Social Media</h4>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 pt-6 text-center text-xs sm:text-sm text-gray-400">
          <p>PickMyUni {getYear} © All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
