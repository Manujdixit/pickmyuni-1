import AboutPage from "@/components/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About PickMyUni | Helping Students Find the Right University in Australia",
  description:
    "PickMyUni is an Australian student platform built to guide course transfers, compare universities, and share honest student reviews — helping you make the right move in your education.",
  keywords: [
    "about PickMyUni",
    "Australian university guide",
    "international student services",
    "university search platform",
    "study in Australia",
  ],
  openGraph: {
    title:
      "About PickMyUni | Helping Students Find the Right University in Australia",
    description:
      "PickMyUni is an Australian student platform built to guide course transfers, compare universities, and share honest student reviews — helping you make the right move in your education.",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
