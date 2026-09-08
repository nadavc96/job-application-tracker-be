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

    const result = schema.safeParse(rawData);

    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }

    try {
      await onSubmit(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error ??
            "Something went wrong. Please try again.",
        );
      } else if (error instanceof Error) {
        setError(error.message ?? "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return { error, handleSubmit };
}
