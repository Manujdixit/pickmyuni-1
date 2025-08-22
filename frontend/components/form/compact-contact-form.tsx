import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

interface ContactFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message: string;
}

interface CompactContactFormProps {
  form: UseFormReturn<ContactFormData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function CompactContactForm({
  form,
  handleSubmit,
  isLoading,
  error,
}: CompactContactFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-2 text-red-700">
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          <span className="text-xs">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Input
            placeholder="First Name"
            {...register("firstName")}
            className="h-10 rounded-md border-0 bg-gray-100 text-sm placeholder:text-gray-500"
            disabled={isLoading}
          />
          {errors.firstName && (
            <span className="text-xs text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Input
            placeholder="Last Name"
            {...register("lastName")}
            className="h-10 rounded-md border-0 bg-gray-100 text-sm placeholder:text-gray-500"
            disabled={isLoading}
          />
          {errors.lastName && (
            <span className="text-xs text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Email Address"
          type="email"
          {...register("email")}
          className="h-10 rounded-md border-0 bg-gray-100 text-sm placeholder:text-gray-500"
          disabled={isLoading}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div
              className={`react-international-phone-input-container compact ${
                isLoading ? "disabled" : ""
              }`}
            >
              <PhoneInput
                className="flex-grow"
                defaultCountry="au"
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                placeholder="Phone Number"
                inputProps={{
                  minLength: 8,
                }}
                name="phone"
              />
            </div>
          )}
        />
        {errors.phone && (
          <span className="text-xs text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <Textarea
          placeholder="How may we help you?"
          {...register("message")}
          className="h-16 w-full resize-none rounded-md border-0 bg-gray-100 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message.message}</span>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex h-9 items-center space-x-2 rounded-md px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send</span>
              <Send className="h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default CompactContactForm;
