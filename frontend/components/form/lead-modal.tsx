"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, Send, Calendar, ArrowLeft } from "lucide-react";
import { useApplicationLead } from "@/hooks/useApplicationLead";
import { toast } from "sonner";
import { PhoneInput } from "react-international-phone";
import dynamic from "next/dynamic";
import "react-international-phone/style.css";

// @ts-expect-error: react-datepicker has no types for dynamic import in Next.js
const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

// Form data interface
interface ApplicationFormData {
  first_name: string;
  last_name?: string;
  email: string;
  phn_no: string;
  course_preference: string;
  gender: string;
  dob: Date | null;
  preffered_intake: string;
  preffered_state: string;
  english_test: string;
  visa: string;
}

// Complete form schema - merge both schemas
const completeSchema: yup.ObjectSchema<ApplicationFormData> = yup
  .object()
  .shape({
    first_name: yup.string().required("First name is required").trim(),
    last_name: yup.string().trim(),
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
    phn_no: yup
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
    course_preference: yup.string().required("Course preference is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.date().nullable().required("Date of birth is required"),
    preffered_intake: yup.string().required("Preferred intake is required"),
    preffered_state: yup.string().required("Preferred state is required"),
    english_test: yup.string().required("English test is required"),
    visa: yup.string().required("Visa status is required"),
  });

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationModal({
  open,
  onOpenChange,
}: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const { submitApplication, isLoading, error, resetError } =
    useApplicationLead();

  // Initialize React Hook Form with the complete schema
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(completeSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phn_no: "",
      course_preference: "",
      gender: "",
      dob: null,
      preffered_intake: "",
      preffered_state: "",
      english_test: "",
      visa: "",
    },
  });

  // Validation functions for each step
  const isStep1Complete = async () => {
    const result = await trigger([
      "first_name",
      "last_name",
      "email",
      "phn_no",
      "course_preference",
    ]);
    return result;
  };

  const handleNext = async () => {
    const isValid = await isStep1Complete();
    if (isValid) {
      setStep(2);
      resetError();
    }
  };

  const handleBack = () => {
    setStep(1);
    resetError();
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Format the data for submission
      const submissionData = {
        ...data,
        dob: data.dob ? data.dob.toISOString().split("T")[0] : "", // Format as YYYY-MM-DD
      };
      await submitApplication(submissionData);
      toast.success(
        "Application submitted successfully! We'll contact you soon."
      );
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        reset(); // Reset form using React Hook Form
      }, 500);
    } catch (error) {
      console.error("Failed to submit application:", error);
      // Error is handled by the hook
    }
  };

  const SelectField = ({
    placeholder,
    value,
    onChange,
    options = [],
  }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 bg-gray-100 border-0 rounded-md text-gray-700 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-8">
        <DialogHeader className="">
          <DialogTitle className="text-4xl font-semibold text-center text-brand-primary mb-4">
            Apply Now
          </DialogTitle>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <button
                onClick={resetError}
                className="ml-2 text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex items-center">
            <div className="flex items-center relative">
              {/* Step 1 */}
              <div
                onClick={handleBack}
                className={`relative z-10 px-6 py-1 rounded cursor-pointer text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                  step === 1
                    ? "bg-orange-400 text-white"
                    : "bg-orange-300 text-white"
                }`}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)",
                  minWidth: "0px",
                  textAlign: "center",
                }}
              >
                STEP 1
              </div>
              {/* Step 2 */}
              <div
                onClick={handleNext}
                className={`relative z-10 px-4 rounded py-1 text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                  step === 2
                    ? "bg-orange-400 text-white"
                    : "bg-orange-300 text-white"
                }`}
                style={{
                  clipPath:
                    "polygon(20px 0,100% 0,100% 50%,100% 100%,20px 100%, 30% 50%",
                  marginLeft: "-32px",
                  minWidth: "112px",
                  textAlign: "right",
                }}
              >
                STEP 2
              </div>
            </div>
          </div>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    {...field}
                    className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="phn_no"
              control={control}
              render={({ field }) => (
                <div
                  className={`flex flex-col-reverse react-international-phone-input-container ${
                    isLoading ? "disabled" : ""
                  }`}
                >
                  {errors.phn_no && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phn_no.message}
                    </p>
                  )}
                  <PhoneInput
                    defaultCountry="au"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    placeholder="Phone Number"
                    inputProps={{
                      required: true,
                      minLength: 8,
                    }}
                    name="phone"
                  />
                </div>
              )}
            />

            <Controller
              name="course_preference"
              control={control}
              render={({ field }) => (
                <div>
                  <SelectField
                    placeholder="Course preference"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      "Computer Science",
                      "Business Administration",
                      "Engineering",
                      "Medicine",
                      "Arts & Humanities",
                      "Other",
                    ]}
                  />
                  {errors.course_preference && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.course_preference.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="disabled:bg-gray-400 disabled:cursor-not-allowed"
                size={"lg"}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div>
                    <SelectField
                      placeholder="Select Gender"
                      value={field.value}
                      onChange={field.onChange}
                      options={["Male", "Female", "Other", "Prefer not to say"]}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="react-datepicker-wrapper">
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Date of Birth"
                        showYearDropdown
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                        maxDate={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() - 16
                            )
                          )
                        }
                        minDate={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() - 100
                            )
                          )
                        }
                        className="w-full h-12 px-4 bg-gray-100 border-0 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500"
                        wrapperClassName="w-full"
                      />
                    </div>
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <Controller
              name="preffered_intake"
              control={control}
              render={({ field }) => (
                <div>
                  <SelectField
                    placeholder="Preferred Intake"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      "Fall 2025",
                      "Spring 2026",
                      "Summer 2026",
                      "Fall 2026",
                    ]}
                  />
                  {errors.preffered_intake && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preffered_intake.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="preffered_state"
              control={control}
              render={({ field }) => (
                <div>
                  <SelectField
                    placeholder="Preferred State"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      "New South Wales (NSW)",
                      "Victoria (VIC)",
                      "Queensland (QLD)",
                      "Western Australia (WA)",
                      "South Australia (SA)",
                      "Tasmania (TAS)",
                      "Australian Capital Territory (ACT)",
                      "Northern Territory (NT)",
                      "Other",
                    ]}
                  />
                  {errors.preffered_state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preffered_state.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="english_test"
              control={control}
              render={({ field }) => (
                <div>
                  <SelectField
                    placeholder="English Test"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      "IELTS",
                      "TOEFL",
                      "PTE",
                      "Duolingo",
                      "Not taken yet",
                    ]}
                  />
                  {errors.english_test && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.english_test.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="visa"
              control={control}
              render={({ field }) => (
                <div>
                  <SelectField
                    placeholder="Do you hold any Visa"
                    value={field.value}
                    onChange={field.onChange}
                    options={["Yes", "No", "Applied", "Planning to apply"]}
                  />
                  {errors.visa && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.visa.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Submitting..." : "Send"}</span>
                {!isLoading && <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
