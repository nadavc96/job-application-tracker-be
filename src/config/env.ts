import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
});

const parsedSchema = envSchema.safeParse(process.env);

if (!parsedSchema.success) {
  console.error(parsedSchema.error);
  throw new Error("Failed to parse env variables");
}

export default parsedSchema.data;
