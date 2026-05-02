import { z } from "zod";

export const societyStatusEnumZod = z.enum(["active", "inactive"]);

export const createSocietySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Society title must be at least 3 characters long")
    .max(255, "Society title must not exceed 255 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  status: societyStatusEnumZod.optional().default("active"),
});
