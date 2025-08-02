"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react"; // Added Phone, Mail, MapPin
import { Card, CardContent } from "@/components/ui/card";
import { useContact } from "@/hooks/useContact";
import { toast } from "sonner";
import ContactFormWrapper from "./form/contact-form-wrapper";

export default function ContactPage() {
  const { submitContactForm, isLoading, error, success, resetState } =
    useContact();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    resetState();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if phone number is valid (not just country code)
    // Most country codes are 1-3 digits, so we ensure phone is longer than country code + "+"
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 5) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      await submitContactForm(formData);
      toast.success("Request sent successfully!");

      // Success - form will show success state
      setTimeout(() => {
        resetForm();
      }, 2000); // Reset form after 2 seconds
    } catch (error) {
      // Error state will be handled by the hook
      console.error("Failed to submit contact form:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/contact_us_banner.webp"
          alt="Library with books on shelves"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto pb-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      <section className="container mx-auto mt-20 py-12">
        {/* Lets Talk Section */}
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left Text Content */}
          <div className="lg:w-2/5">
            <h2 className="text-brand-primary text-6xl font-normal">
              Let&apos;s Talk About <br />
              <span className="text-brand-primary font-bold">Your</span>{" "}
              <span className="text-brand-secondary font-bold">Concern</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              dictum purus. Nullam non mollis metus. Suspendisse cursus ornare
              ultrices.
            </p>
          </div>

          {/* Right Form Content */}
          <div className="lg:w-3/5">
            <ContactFormWrapper />
          </div>
        </div>

        {/* Contact Cards Section */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="bg-brand-secondary/10 shadow-lg">
            <CardContent className="flex flex-col items-center pt-6 text-center">
              <div className="rounded-full bg-white p-3 shadow">
                <Phone className="text-brand-secondary h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold text-blue-700">CALL US NOW</h3>
              <p className="mt-1 text-gray-700">+61 413 009 922</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </CardContent>
          </Card>

          <Card className="bg-brand-secondary/10 shadow-lg">
            <CardContent className="flex flex-col items-center pt-6 text-center">
              <div className="rounded-full bg-white p-3 shadow">
                <Mail className="text-brand-secondary h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold text-blue-700">
                DROP US AN EMAIL
              </h3>
              <p className="mt-1 text-gray-700">info@pickmyuni.com.au</p>
            </CardContent>
          </Card>

          <Card className="bg-brand-secondary/10 shadow-lg">
            <CardContent className="flex flex-col items-center pt-6 text-center">
              <div className="rounded-full bg-white p-3 shadow">
                <MapPin className="text-brand-secondary h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold text-blue-700">ADDRESS</h3>
              <p className="mt-1 text-gray-700">
                Suite 204, Level 2, 227 Collins Street,
                <br />
                Melbourne, VIC, Australia
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* map section */}
      <section className="relative mt-12 h-[700px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3151.8918603542966!2d144.9623450759323!3d37.816001871975025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDQ4JzU3LjYiTiAxNDTCsDU3JzUzLjciRQ!5e0!3m2!1sen!2sin!4v1750681165613!5m2!1sen!2sinhttps://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d76290.06707997114!2d144.90966104249517!3d-37.82971382058018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDQ4JzU3LjYiUyAxNDTCsDU3JzUzLjciRQ!5e0!3m2!1sen!2sin!4v1750681260928!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
