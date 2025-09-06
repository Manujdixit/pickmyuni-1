"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface SuccessScreenProps {
  onReset?: () => void;
  referralCode?: string | null;
}

export function SuccessScreen({ onReset, referralCode }: SuccessScreenProps) {
  // console.log("SuccessScreen received referralCode:", referralCode);

  // const generateReferralUrl = () => {
  //   const code = referralCode;
  //   if (!code) return null;
  //   const baseUrl = window.location.origin;
  //   return `${baseUrl}/review-form?ref=${encodeURIComponent(code)}`;
  // };

  // const handleCopyReferralUrl = async () => {
  //   const referralUrl = generateReferralUrl();
  //   if (referralUrl) {
  //     try {
  //       await navigator.clipboard.writeText(referralUrl);
  //       toast.success("Referral URL copied to clipboard!");
  //     } catch (err) {
  //       console.error("Failed to copy referral URL:", err);
  //       toast.error("Failed to copy referral URL");
  //     }
  //   }
  // };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Card className="p-12 text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Review Submitted Successfully!
            </h1>
            <p className="mb-2 text-lg text-gray-600">
              Thank you for sharing your college experience
            </p>
            <p className="text-gray-500">
              Your review will help future students make informed decisions
              about their education.
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50/20 p-6 dark:border-neutral-800">
            <h3 className="text-brand-primary mb-2 font-semibold">
              What happens next?
            </h3>
            <ul className="text-brand-primary space-y-1 text-left text-sm">
              <li>• Your review will be verified within 24-48 hours</li>
              <li>• You'll receive an email confirmation once approved</li>
              <li>• Your review will be published on our platform</li>
            </ul>
          </div>

          {/* Referral Code Section */}
          {/* {referralCode && (
            <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 p-6">
              <h3 className="mb-2 font-semibold text-teal-800">
                Your Referral Link
              </h3> */}

          {/* Referral URL Section */}
          {/* <div className="mt-4 border-t border-teal-200 pt-4">
                <div className="flex items-center justify-between rounded-md border border-teal-300 bg-white p-3">
                  <span className="mr-2 flex-1 truncate text-sm text-gray-600">
                    {generateReferralUrl()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReferralUrl}
                    className="flex-shrink-0 border-teal-300 text-teal-700 hover:bg-teal-50"
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy URL
                  </Button>
                </div>
              </div> */}

          {/* <p className="mt-3 text-sm text-teal-700">
                Share this link with friends! When they click it, they'll
                automatically get your referral code applied.
              </p> */}
          {/* </div>
          )} */}

          {/* <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            {onReset && (
              <Button
                onClick={onReset}
                className="bg-teal-500 text-white hover:bg-teal-600"
              >
                Go to Home
              </Button>
            )}
          </div> */}

          <Link href="/">
            <Button className="w-full">Go to Home</Button>
          </Link>
          <div className="mt-1 border-t pt-6 text-sm text-gray-500">
            <p>
              Need help? Contact us at{" "}
              <a
                href="mailto:support@truescholar.in"
                className="text-blue-500 hover:underline"
              >
                support@truescholar.in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
