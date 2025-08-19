"use client";

import { PostList } from "@/components/PostList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { MainLayout } from "@/layout/MainLayout";
import { setSearchQuery } from "@/store/slices/postsSlice";
import { Input } from "@heroui/react";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <MainLayout>
      <div className="flex justify-center mb-4 mt-4">
        <Input
          isClearable
          className="max-w-lg"
          defaultValue=""
          placeholder="Search posts by title..."
          type="text"
          variant="bordered"
          onChange={handleSearchChange}
          onClear={() => dispatch(setSearchQuery(""))}
        />
      </div>
      <PostList />
    </MainLayout>
  );
}
