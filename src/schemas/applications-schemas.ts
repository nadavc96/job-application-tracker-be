import { z } from "zod";

export const addApplicationSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  jobTitle: z.string().trim().min(1, "Job title is required."),
  status: z.enum(["applied", "interview", "rejected", "accepted"]),
  jobURL: z.url(),
});

export const deleteApplicationSchema = z.object({
  id: z.uuid(),
});

export const editApplicationSchema = z
  .object({
    status: z.enum(["applied", "interview", "rejected", "accepted"]).optional(),
    jobURL: z.url().optional(),
  })
  .refine((data) => data.status !== undefined || data.jobURL !== undefined, {
    message: "At least one field must be provided.",
  });
