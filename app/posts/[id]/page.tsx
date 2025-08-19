"use client";

import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store/store";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { deletePost, fetchPostById } from "@/store/slices/postsSlice";
import { MainLayout } from "@/layout/MainLayout";
import { formatFullDate } from "utils/dateFormat";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedPost: post,
    status,
    error,
  } = useSelector((state: RootState) => state.posts);
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(id)).unwrap();
        router.push("/");
      } catch (err) {
        console.error("Failed to delete the post:", err);
      }
    }
  };

  if (status === "loading" && !post) {
    return (
      <MainLayout>
        <p className="text-center p-10">Loading post...</p>
      </MainLayout>
    );
  }

  if (status === "failed") {
    return (
      <MainLayout>
        <p className="text-center p-10 text-red-500">Error: {error}</p>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <p className="text-center p-10">Post not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 my-6 border-y py-4">
          <Button
            as={Link}
            href={`/posts/${id}/edit`}
            variant="solid"
            className="text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Edit Post
          </Button>
          <Button variant="ghost" color="danger" onPress={handleDelete}>
            Delete Post
          </Button>
        </div>

        <div className="text-sm text-gray-500 mb-8">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatFullDate(post.createdAt)}</span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <section className="mt-12 border-t pt-8">
        <CommentList postId={id} />
        <CommentForm postId={id} />
      </section>
    </MainLayout>
  );
}
