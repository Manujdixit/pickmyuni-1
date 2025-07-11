import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data: { name: string; email: string }) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to subscribe");
      }
      setSuccess(true);
      form.reset();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { ...form, onSubmit, loading, success, error };
}
