import { useState } from "react";
// import axios from "axios";

export const useApplicationLead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
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
      const errorMessage = err.message || "Failed to submit application";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    submitApplication,
    isLoading,
    error,
    resetError,
  };
};
