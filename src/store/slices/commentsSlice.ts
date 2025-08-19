import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Comment } from "@/types/comment";
import { db } from "@/lib/firebase/config";

type NewCommentData = {
  author: string;
  text: string;
};

interface CommentsState {
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string) => {
    const commentsColRef = collection(db, "posts", postId, "comments");
    const querySnapshot = await getDocs(commentsColRef);
    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() } as Comment);
    });
    return comments;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({
    postId,
    commentData,
  }: {
    postId: string;
    commentData: NewCommentData;
  }) => {
    const commentsColRef = collection(db, "posts", postId, "comments");
    const commentToSave = {
      ...commentData,
      createdAt: serverTimestamp(),
    };
    const newCommentDoc = await addDoc(commentsColRef, commentToSave);

    const postDocRef = doc(db, "posts", postId);

    await updateDoc(postDocRef, {
      commentCount: increment(1),
    });

    return {
      id: newCommentDoc.id,
      ...commentData,
      createdAt: new Date(),
    } as Comment;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.status = "succeeded";
          state.comments = action.payload;
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        }
      );
  },
});

export default commentsSlice.reducer;
