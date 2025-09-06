import TransferAssistance from "@/components/transfer-assistance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Transfer Courses or Universities in Australia | PickMyUni Transfer Support",
  description:
    "Get help with a course transfer or university transfer in Australia.  PickMyUni offers expert support to make your transfer smooth, fast, and stress-free.",
  keywords: [
    "university transfer Australia",
    "credit transfer assistance",
    "university transfer services",
    "course transfer help",
    "Australian university transfer",
    "academic credit transfer",
    "transfer student support",
  ],
  openGraph: {
    title:
      "Transfer Courses or Universities in Australia | PickMyUni Transfer Support",
    description:
      "Get help with a course transfer or university transfer in Australia.  PickMyUni offers expert support to make your transfer smooth, fast, and stress-free.",
    type: "website",
  },
};

export default function Page() {
  return <TransferAssistance />;
}
