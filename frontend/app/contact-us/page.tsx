import ContactPage from "@/components/contactpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PickMyUni | Talk to Our Student Support Team",
  description:
    "Have questions about course transfers or comparing universities in Australia? Get in touch with PickMyUni’s support team — we're here to help you make confident study decisions.",
  keywords: [
    "contact PickMyUni",
    "university admission help",
    "study abroad assistance",
    "Australian university guidance",
    "international student support",
    "education consultancy",
  ],
  openGraph: {
    title: "Contact PickMyUni | Talk to Our Student Support Team",
    description:
      "Have questions about course transfers or comparing universities in Australia? Get in touch with PickMyUni’s support team — we're here to help you make confident study decisions.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
