import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),
  description: z.string().optional(),
  isPublished: z.boolean().default(true),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

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

export type CreateEventInput = z.infer<typeof createSocietyEventSchema>;
