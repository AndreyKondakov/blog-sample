import React from "react";
import { render, screen } from "@testing-library/react";
import { PostItem } from "./PostItem";
import { Post } from "@/types/post";
import "@testing-library/jest-dom";

const mockPost: Post = {
  id: "post-1",
  title: "My Awesome Test Post",
  author: "John Doe",
  content: "This is the content of the test post.",
  commentCount: 5,
  createdAt: new Date("2025-08-16T10:00:00Z"),
  updatedAt: new Date("2025-08-16T10:00:00Z"),
  comments: [],
};

describe("PostItem Component", () => {
  it("should render all post details correctly", () => {
    render(<PostItem post={mockPost} />);

    const titleElement = screen.getByText(/My Awesome Test Post/i);
    const authorElement = screen.getByText(/John Doe/i);
    const commentCountElement = screen.getByText(/5 comments/i);
    const dateElement = screen.getByText(/August 16, 2025/i);

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(commentCountElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });
});
