import axios from "axios";
import { useState } from "react";
import type { ZodType } from "zod";

export function useAuthForm<T>(
  schema: ZodType<T>,
  onSubmit: (data: T) => Promise<void>,
) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    // console.log(...rawData);

    const result = schema.safeParse(rawData);
    // console.log(result);

    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }

    try {
      await onSubmit(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError("An account with this email already exists.");
        } else if (error.response?.status === 400) {
          setError("Please check your information and try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else if (error instanceof Error) {
        setError(error.message ?? "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return { error, handleSubmit };
}
