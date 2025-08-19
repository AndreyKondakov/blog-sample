import { PostForm } from "@/components/PostForm";
import { MainLayout } from "@/layout/MainLayout";

export default function NewPostPage() {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create a New Post
        </h1>
        <PostForm />
      </div>
    </MainLayout>
  );
}
