"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContact } from "@/hooks/useContact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from "@/components/form/contact-form";
import CompactContactForm from "@/components/form/compact-contact-form";
import { toast } from "sonner";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  isTooltip?: boolean;
}

interface ContactFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactValidationSchema: yup.ObjectSchema<ContactFormData> = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().optional(),
    email: yup
      .string()
      .required("Email is required")
      .test(
        "email-validation",
        "Please enter a valid email address",
        function (value) {
          if (!value) return false;
          // More strict email validation
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(value);
        },
      ),
    phone: yup
      .string()
      .test(
        "phone-validation",
        "Please enter a valid phone number",
        function (value) {
          if (!value) return false;
          const phoneDigits = value.replace(/\D/g, "");
          return phoneDigits.length >= 8;
        },
      )
      .required("Phone number is required"),
    message: yup.string().required("Message is required"),
  });

export function ConsultationModal({
  open,
  onOpenChange,
  isMobile = false,
  buttonRef,
  isTooltip = false,
}: ConsultationModalProps) {
  const { submitContactForm, isLoading, error, success, resetState } =
    useContact();

  const form = useForm<ContactFormData>({
    resolver: yupResolver(ContactValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const resetForm = () => {
    form.reset();
    resetState();
  };

  const handleSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast.success("Request sent successfully!");
      setTimeout(() => {
        onOpenChange(false);
        resetForm();
      }, 2000);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    }
  };

  const handleModalChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  // If used inside a tooltip, just return the form content
  if (isTooltip) {
    return (
      <>
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-brand-primary mb-2 text-center text-2xl font-semibold">
            Request a Free{" "}
            <span className="text-brand-secondary">Consultation</span>
          </h2>
        </div>

        {/* Content */}
        {success ? (
          <div className="py-6 text-center">
            <div className="mb-2 text-base font-semibold text-green-600">
              ✅ Request sent successfully!
            </div>
            <p className="text-sm text-gray-600">
              We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <CompactContactForm
            form={form}
            handleSubmit={form.handleSubmit(handleSubmit)}
            isLoading={isLoading}
            error={error}
          />
        )}
      </>
    );
  }

  // Use regular Dialog for mobile screens
  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="z-[1005] w-[95%] max-w-lg p-8">
        <DialogHeader>
          <DialogTitle className="text-brand-primary mb-3 text-center text-3xl font-semibold">
            Request a Free{" "}
            <span className="text-brand-secondary">Consultation</span>
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="mb-2 text-lg font-semibold text-green-600">
              ✅ Request sent successfully!
            </div>
            <p className="text-gray-600">We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <ContactForm
            form={form}
            handleSubmit={form.handleSubmit(handleSubmit)}
            isLoading={isLoading}
            error={error}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
