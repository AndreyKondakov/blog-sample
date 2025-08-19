"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostItem } from "./PostItem";
import { fetchPosts } from "@/store/slices/postsSlice";
import { RootState } from "@/store/store";
import { AppDispatch } from "@/store/store";

export function PostList() {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, status, error, searchQuery } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (status === "idle" || (posts.length === 0 && status !== "loading")) {
      dispatch(fetchPosts());
    }
  }, [status, dispatch, posts.length]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") return <p>Loading posts...</p>;
  if (status === "failed") return <p>Error loading posts: {error}</p>;

  return (
    <>
      {filteredPosts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No posts found matching your search.
        </p>
      )}
    </>
  );
}
