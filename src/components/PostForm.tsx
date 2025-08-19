"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormData } from "@/validators/post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/store/slices/postsSlice";
import { useEffect } from "react";
import { Post } from "@/types/post";
import { Button, Input, Textarea } from "@heroui/react";
interface PostFormProps {
  postToEdit?: Post;
}

export function PostForm({ postToEdit }: PostFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.posts);
  const router = useRouter();
  const isEditMode = !!postToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postToEdit?.title || "",
      author: postToEdit?.author || "",
      content: postToEdit?.content || "",
    },
  });

  useEffect(() => {
    if (postToEdit) {
      reset({
        title: postToEdit.title,
        author: postToEdit.author,
        content: postToEdit.content,
      });
    }
  }, [postToEdit, reset]);

  const onSubmit = async (data: PostFormData) => {
    try {
      if (isEditMode && postToEdit) {
        await dispatch(updatePost({ id: postToEdit.id, data })).unwrap();
        router.push(`/posts/${postToEdit.id}`);
      } else {
        const newPost = await dispatch(createPost(data)).unwrap();
        router.push(`/posts/${newPost.id}`);
      }
    } catch (error) {
      console.error("Failed to save the post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <Input
        {...register("title")}
        className="max-w"
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
        label="Title"
        type="text"
        variant="bordered"
      />
      <Input
        {...register("author")}
        className="max-w"
        errorMessage={errors.author?.message}
        isInvalid={!!errors.author}
        label="Author"
        type="text"
        variant="bordered"
      />
      <Textarea
        {...register("content")}
        className="max-w"
        errorMessage={errors.content?.message}
        isInvalid={!!errors.content}
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        variant="bordered"
      />
      <Button color="primary" isDisabled={isSubmitting} type="submit">
        {status === "loading"
          ? "Saving..."
          : isEditMode
          ? "Update Post"
          : "Create Post"}
      </Button>
    </form>
  );
}
