import { z } from "zod";

export const addApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required."),
  jobTitle: z.string().min(1, "Job title is required."),
  status: z.enum(["applied", "interview", "rejected", "accepted"]),
  jobURL: z.url(),
});
