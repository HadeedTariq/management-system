import { z } from "zod";

export const createSocietyPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(255, { message: "Title cannot exceed 255 characters." }),

  description: z
    .string()
    .trim()
    .max(5000, { message: "Description is too long." })
    .optional()
    .or(z.literal("")),

  isPublished: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => {
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val === "true";
      return true;
    }),
});
