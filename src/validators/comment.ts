import { z } from "zod";

export const commentSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  text: z
    .string()
    .trim()
    .min(3, { message: "Comment must be at least 3 characters." }),
});

export type CommentFormData = z.infer<typeof commentSchema>;
