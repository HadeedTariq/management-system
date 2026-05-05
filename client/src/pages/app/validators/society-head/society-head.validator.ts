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
