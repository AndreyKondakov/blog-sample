"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Comment } from "@/types/comment";
import { fetchComments } from "@/store/slices/commentsSlice";
import { formatDate } from "utils/dateFormat";

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, status, error } = useSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  if (status === "loading") return <p className="mt-8">Loading comments...</p>;
  if (status === "failed")
    return <p className="mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-6">
          {comments.map((comment: Comment) => (
            <li key={comment.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-center mb-2">
                <p className="font-semibold text-gray-800">{comment.author}</p>
                <span className="mx-2 text-gray-400">•</span>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
