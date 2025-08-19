import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Title must be at least 10 characters long." })
    .max(300, { message: "Title must be at most 300 characters long." }),
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name must be at least 2 characters long." })
    .max(50, { message: "Author name must be at most 50 characters long." }),
  content: z
    .string()
    .trim()
    .min(100, { message: "Content must be at least 100 characters long." }),
});

export type PostFormData = z.infer<typeof postSchema>;
