import { useState } from "react";
// import axios from "axios";

interface LeadData {
  fname: string;
  lname?: string;
  email: string;
  mobile: string;
  message?: string;
}

export const useLeads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureLead = async (data: LeadData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `HTTP error! status: ${res.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      const responseData = await res.json();
      return responseData;
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    captureLead,
    isLoading,
    error,
  };
};
