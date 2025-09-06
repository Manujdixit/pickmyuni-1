import PrivacyPage from "@/components/privacypage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PickMyUni - Your Data Protection and Privacy Rights",
  description:
    "Read PickMyUni's privacy policy to understand how we collect, use, and protect your personal information. We're committed to safeguarding your privacy and data security.",
  keywords: [
    "PickMyUni privacy policy",
    "data protection",
    "privacy rights",
    "personal information security",
    "student data privacy",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Privacy Policy | PickMyUni",
    description:
      "Learn about our commitment to protecting your privacy and personal data.",
    type: "website",
  },
};

export default function Page() {
  return <PrivacyPage />;
}
