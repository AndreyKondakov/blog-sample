"use client";

import { useDispatch } from "react-redux";
import { addComment } from "@/store/slices/commentsSlice";
import { AppDispatch } from "@/store/store";
import { Button, Input, Textarea } from "@heroui/react";
import { CommentFormData, commentSchema } from "@/validators/comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentFormData) => {
    try {
      await dispatch(addComment({ postId, commentData: data })).unwrap();
      reset();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 p-4 border rounded-lg bg-gray-50"
    >
      <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
      <div className="space-y-4">
        <Input
          {...register("author")}
          className="max-w"
          errorMessage={errors.author?.message}
          isInvalid={!!errors.author}
          label="Your Name"
          type="text"
          variant="bordered"
        />
        <Textarea
          {...register("text")}
          errorMessage={errors.text?.message}
          isInvalid={!!errors.text}
          label="Your Comment"
          placeholder="Enter your comment"
          variant="bordered"
        />
        <Button
          isDisabled={isSubmitting}
          type="submit"
          className="text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
      </div>
    </form>
  );
}
