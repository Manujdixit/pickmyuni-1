"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, CheckCircle, Clock, X } from "lucide-react";
import { useFormContext } from "@/components/review-form/form-provider";
// import useOtpApi from "@/hooks/use-otp";
import { toast } from "sonner";

interface OtpVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
  email: string;
  phone: string;
  onResendEmailOtp: () => Promise<void>;
  onResendPhoneOtp: () => Promise<void>;
  canResend: boolean;
  isLimitReached: boolean;
  countdown: number;
}

export function OtpVerificationDialog({
  isOpen,
  onClose,
  onVerificationComplete,
  email,
  phone,
  onResendEmailOtp,
  onResendPhoneOtp,
  canResend = true,
  isLimitReached = false,
  countdown,
}: OtpVerificationDialogProps) {
  const { personalDetailsForm, updateFormData } = useFormContext();
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailCountdown, setEmailCountdown] = useState(0);
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  // const {
  //   loading: otpLoading,
  //   error: otpError,
  //   sendEmailOtp: apiSendEmailOtp,
  //   sendPhoneOtp: apiSendPhoneOtp,
  //   verifyEmailOtp: apiVerifyEmailOtp,
  //   verifyPhoneOtp: apiVerifyPhoneOtp,
  //   isOtpVerified: apiIsOtpVerified,
  // } = useOtpApi();

  // Countdown timers
  useEffect(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(
        () => setEmailCountdown(emailCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [emailCountdown]);

  useEffect(() => {
    if (phoneCountdown > 0) {
      const timer = setTimeout(
        () => setPhoneCountdown(phoneCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [phoneCountdown]);

  // Auto-send OTPs when dialog opens - REMOVED to prevent abuse
  // OTPs are now sent from parent component before showing dialog
  // useEffect(() => {
  //   if (isOpen && !isEmailVerified && !isPhoneVerified) {
  // handleSendEmailOtp();
  // handleSendPhoneOtp();
  //   }
  // }, [isOpen]);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEmailOtp("");
      setPhoneOtp("");
      setIsEmailVerified(false);
      setIsPhoneVerified(false);
      setErrors({ email: "", phone: "" });
    }
  }, [isOpen]);

  const handleSendEmailOtp = async () => {
    if (onResendEmailOtp) {
      setIsLoading(true);
      setErrors((prev) => ({ ...prev, email: "" }));
      try {
        await onResendEmailOtp();
        setEmailCountdown(30);
        // console.log(`Email OTP sent to: ${email}`);
      } catch (err: any) {
        toast.error("Failed to send email OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendPhoneOtp = async () => {
    if (onResendPhoneOtp) {
      setIsLoading(true);
      setErrors((prev) => ({ ...prev, phone: "" }));
      try {
        await onResendPhoneOtp();
        setPhoneCountdown(30);
        // console.log(`Phone OTP sent to: ${phone}`);
      } catch (err: any) {
        toast.error("Failed to send phone OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) return;
    setIsLoading(true);
    setErrors((prev) => ({ ...prev, email: "" }));
    try {
      // await apiVerifyEmailOtp(email, emailOtp);
      setIsEmailVerified(true);
      personalDetailsForm.setValue("isEmailVerified", true);
      updateFormData({ isEmailVerified: true });
      // console.log("Email verified successfully");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        email: err?.message || "Invalid OTP. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) return;
    setIsLoading(true);
    setErrors((prev) => ({ ...prev, phone: "" }));
    try {
      // await apiVerifyPhoneOtp(phone, phoneOtp);
      setIsPhoneVerified(true);
      personalDetailsForm.setValue("isPhoneVerified", true);
      updateFormData({ isPhoneVerified: true });
      // console.log("Phone verified successfully");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        phone: err?.message || "Invalid OTP. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (isEmailVerified && isPhoneVerified) {
      onVerificationComplete();
    }
  };

  const allVerified = isEmailVerified && isPhoneVerified;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Verify Your Contact Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            We've sent OTPs to your email and phone number. Please verify both
            to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Email OTP Verification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="text-brand-primary h-4 w-4" />
              <Label className="text-sm font-medium">Email: {email}</Label>
              {isEmailVerified && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>

            {!isEmailVerified ? (
              <>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={emailOtp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setEmailOtp(value);
                    }}
                    maxLength={6}
                    className="text-center tracking-widest"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={emailOtp.length !== 6 || isLoading}
                    className="bg-brand-primary hover:bg-blue-800"
                  >
                    Verify
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSendEmailOtp}
                    disabled={emailCountdown > 0 || isLoading || !canResend}
                    className="text-brand-primary hover:text-blue-800"
                  >
                    {emailCountdown > 0 ? (
                      <>
                        <Clock className="mr-1 h-4 w-4" />
                        Resend in {emailCountdown}s
                      </>
                    ) : isLimitReached ? (
                      "Resend limit reached"
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                </div>

                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Email verified successfully
                </span>
              </div>
            )}
          </div>

          {/* Phone OTP Verification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="text-brand-primary h-4 w-4" />
              <Label className="text-sm font-medium">Phone: {phone}</Label>
              {isPhoneVerified && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>

            {!isPhoneVerified ? (
              <>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={phoneOtp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setPhoneOtp(value);
                    }}
                    maxLength={6}
                    className="text-center tracking-widest"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyPhoneOtp}
                    disabled={phoneOtp.length !== 6 || isLoading}
                    className="text-brand-primary hover:text-blue-800"
                  >
                    Verify
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleSendPhoneOtp}
                    disabled={phoneCountdown > 0 || isLoading || !canResend}
                    className="text-brand-primary hover:text-blue-800"
                  >
                    {phoneCountdown > 0 ? (
                      <>
                        <Clock className="mr-1 h-4 w-4" />
                        Resend in {phoneCountdown}s
                      </>
                    ) : isLimitReached ? (
                      "Resend limit reached"
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                </div>

                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Phone verified successfully
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {allVerified && (
            <div className="flex gap-3 border-t pt-4">
              <Button
                type="button"
                onClick={handleProceed}
                disabled={!allVerified || isLoading}
                className="bg-brand-primary flex-1 text-white hover:bg-blue-800"
              >
                {"Continue to Next Step"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
