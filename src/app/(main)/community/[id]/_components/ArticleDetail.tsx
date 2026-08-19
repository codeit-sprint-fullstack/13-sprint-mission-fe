"use client";
import type { Post } from "@/lib/PostAPI";
import { useAuth } from "@/providers/providers";
import Image from "next/image";
import PostKebabMenu from "./PostKebabMenu";

export default function ArticleDetail({ post }: { post: Post }) {
  const { user } = useAuth();
  const isOwner = user?.id === post.writer.id;
  return (
    <div className=" pb-4 mb-4">
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold">{post.title}</h1>
          {isOwner && <PostKebabMenu postId={String(post.id)} />}
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 w-88.5 h-10">
          <Image
            src="/images/ic_profile.png"
            alt="profile"
            width={40}
            height={40}
          />
          <span>{post.writer.nickname}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="rounded-[35px] border px-3 py-2 ">
            {" "}
            ♡ {post.likeCount}
          </span>
        </div>
        <div className=" border-b"></div>
      </div>
      <div className="whitespace-pre-line mt-6 ">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
