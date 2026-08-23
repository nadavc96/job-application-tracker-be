import { z } from "zod";

export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be atleast 8 charecters."),
});
