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

export const createSocietyEventSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be 255 characters or less"),

    description: z.string().optional(),

    location: z
      .string()
      .max(255, "Location must be 255 characters or less")
      .optional(),

    startTime: z.string().datetime("Valid start time is required"),

    endTime: z
      .string()
      .datetime("End time must be a valid datetime")
      .optional(),

    status: z
      .enum(["upcoming", "ongoing", "completed", "cancelled"])
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.endTime) return true;
      return new Date(data.endTime) > new Date(data.startTime);
    },
    {
      message: "End time must be greater than start time",
      path: ["endTime"],
    },
  );
