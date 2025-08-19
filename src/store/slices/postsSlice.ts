import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Post } from "@/types/post";
import { addComment } from "./commentsSlice";

export interface PostsState {
  error: string | null;
  posts: Post[];
  searchQuery: string;
  selectedPost: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

type NewPostData = {
  title: string;
  author: string;
  content: string;
};

type UpdatePostData = {
  id: string;
  data: {
    title: string;
    author: string;
    content: string;
  };
};

const initialState: PostsState = {
  error: null,
  posts: [],
  searchQuery: "",
  selectedPost: null,
  status: "idle",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processDoc = (doc: any) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString(),
  } as Post;
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const postsCollectionRef = collection(db, "posts");

  const q = query(postsCollectionRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(processDoc);
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Post;
    } else {
      throw new Error("Post not found");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: NewPostData) => {
    const postToSave = {
      ...newPost,
      createdAt: new Date(),
      updatedAt: new Date(),
      commentCount: 0,
    };

    const docRef = await addDoc(collection(db, "posts"), postToSave);
    return { id: docRef.id, ...postToSave } as Post;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: UpdatePostData) => {
    const postRef = doc(db, "posts", id);
    const updatedData = {
      ...data,
      updatedAt: new Date(),
    };
    await updateDoc(postRef, updatedData);
    return { id, ...updatedData };
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    return postId;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status = "succeeded";
          state.selectedPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Post not found";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create post";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, ...data } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          Object.assign(existingPost, data);
        }
        if (state.selectedPost && state.selectedPost.id === id) {
          Object.assign(state.selectedPost, data);
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const postId = action.meta.arg.postId;
        const postInList = state.posts.find((p) => p.id === postId);
        if (postInList) {
          postInList.commentCount += 1;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.selectedPost = null;
      });
  },
});

export const { setSearchQuery } = postsSlice.actions;

export default postsSlice.reducer;
