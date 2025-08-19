import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import commentsReducer from "./slices/commentsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
