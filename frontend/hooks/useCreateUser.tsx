import { useState } from "react";

export interface CreateUserRequest {
  name?: string;
  email?: string;
  contact_number?: string;
  gender?: string;
  dob?: string;
  iAm?: string;
  college_roll_number?: string;
  user_location?: string;
  user_type?: string;
  referred_by?: string;
}

export interface UserResponse {
  id: number;
  custom_code: string;
  name?: string;
  email?: string;
  contact_number?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserAsync = async (
    userData: CreateUserRequest,
  ): Promise<ApiResponse<UserResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUserAsync,
    isLoading,
    error,
  };
};
