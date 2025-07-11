"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNewsletter } from "../hooks/useNewsletter";
import { FormProvider } from "react-hook-form";
import { Check, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const newsletter = useNewsletter();
  const {
    register,
    handleSubmit,
    formState,
    onSubmit,
    loading,
    success,
    error,
  } = newsletter;

  return (
    <div className="rounded-md bg-blue-50 p-4">
      {success ? (
        <div className="mt-4 text-center text-xl text-green-600">
          <div className="flex flex-col items-center justify-center space-x-8">
            <CheckCircle className="size-12" />
            Subscribed successfully!
          </div>
        </div>
      ) : (
        <>
          <span className="text-brand-primary text-xl font-semibold">
            NEWSLETTER
          </span>
          <p className="my-1 text-sm leading-tight">
            Signup our newsletter services for daily news and updates
          </p>
          <FormProvider {...newsletter}>
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Your Name"
                className="border-gray-400 bg-white"
                {...register("name")}
                disabled={loading}
              />
              {formState.errors.name && (
                <div className="text-xs text-red-500">
                  {formState.errors.name.message as string}
                </div>
              )}
              <Input
                placeholder="Email Address"
                className="border-gray-400 bg-white"
                {...register("email")}
                disabled={loading}
              />
              {formState.errors.email && (
                <div className="text-xs text-red-500">
                  {formState.errors.email.message as string}
                </div>
              )}
              <Button
                variant={"secondary"}
                className="w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
              {error && <div className="text-xs text-red-600">{error}</div>}
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
}
