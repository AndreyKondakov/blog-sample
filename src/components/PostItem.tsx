"use client";
import Link from "next/link";
import { Post } from "@/types/post";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";
import { formatDate } from "utils/dateFormat";

const formatCommentCount = (count: number) => {
  if (count === 0) return "No comments";
  if (count === 1) return "1 comment";
  return `${count} comments`;
};

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const displayDate = post.updatedAt || post.createdAt;
  return (
    <li className="p-2 w-full max-w-[380px]">
      <Link href={`/posts/${post.id}`} className="block w-full">
        <Card className="w-full transition-transform duration-200 hover:scale-[1.02] cursor-pointer">
          <CardHeader className="justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={`https://i.pravatar.cc/150?u=${post.author}`}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-sm font-semibold leading-none text-default-600">
                  {post.author}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  Post author
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-500">
            <h3 className="text-lg font-bold text-default-800 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="line-clamp-3">{post.content}</p>
          </CardBody>
          <CardFooter className="gap-3 justify-between text-xs text-gray-500">
            <span>{formatDate(displayDate)}</span>
            <span>{formatCommentCount(post.commentCount)}</span>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
