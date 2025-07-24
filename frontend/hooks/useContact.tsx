import { useState } from "react";
// import axios from "axios";

interface ContactData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitContactForm = async (
    data: ContactData,
  ): Promise<ContactResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: data.firstName,
            lname: data.lastName || "",
            email: data.email,
            phn_no: data.phone,
            user_msg: data.message,
          }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          errorData.error ||
          `HTTP error! status: ${res.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      const responseData = await res.json();
      setSuccess(true);
      return {
        success: true,
        message: "Contact form submitted successfully",
        data: responseData,
      };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to submit contact form";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitContactForm,
    isLoading,
    error,
    success,
    resetState,
  };
};
