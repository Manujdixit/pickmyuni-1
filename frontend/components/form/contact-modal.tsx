"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContact } from "@/hooks/useContact";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContactForm from "@/components/form/contact-form";

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
        }
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
        }
      )
      .required("Phone number is required"),
    message: yup.string().required("Message is required"),
  });

export function ConsultationModal({
  open,
  onOpenChange,
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

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="max-w-lg w-full p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-3 font-semibold text-center text-brand-primary">
            Request a Free{" "}
            <span className="text-brand-secondary">Consultation</span>
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-lg font-semibold mb-2">
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
