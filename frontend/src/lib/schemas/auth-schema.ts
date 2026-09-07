import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be atleast 8 charecters"),
});

export const signupSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be atleast 8 charecters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
