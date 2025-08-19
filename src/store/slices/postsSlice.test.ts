import postsReducer, { PostsState, setSearchQuery } from "./postsSlice";
import { Post } from "@/types/post";

describe("postsSlice", () => {
  const initialState: PostsState = {
    posts: [],
    selectedPost: null,
    searchQuery: "",
    status: "idle",
    error: null,
  };

  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSearchQuery", () => {
    const previousState = initialState;
    const newState = postsReducer(previousState, setSearchQuery("react"));

    expect(newState.searchQuery).toEqual("react");
  });

  it("should handle fetchPosts.fulfilled", () => {
    const previousState = initialState;
    const mockPosts: Post[] = [
      {
        id: "1",
        title: "First Post",
        content: "...",
        author: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        commentCount: 2,
      },
    ];

    const action = { type: "posts/fetchPosts/fulfilled", payload: mockPosts };
    const newState = postsReducer(previousState, action);

    expect(newState.status).toEqual("succeeded");
    expect(newState.posts).toEqual(mockPosts);
    expect(newState.error).toBeNull();
  });
});
