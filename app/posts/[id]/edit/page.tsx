"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { PostForm } from "@/components/PostForm";
import { fetchPostById } from "@/store/slices/postsSlice";
import { MainLayout } from "@/layout/MainLayout";

export default function EditPostPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost: post, status } = useSelector(
    (state: RootState) => state.posts
  );
  const id = params.id as string;

  useEffect(() => {
    if (id && (!post || post.id !== id)) {
      dispatch(fetchPostById(id));
    }
  }, [id, dispatch, post]);

  if (status === "loading") {
    return (
      <MainLayout>
        <p className="text-center p-10">Loading post data...</p>
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
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Post</h1>
        <PostForm postToEdit={post} />
      </div>
    </MainLayout>
  );
}
