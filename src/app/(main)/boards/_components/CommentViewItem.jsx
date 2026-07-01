"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { tokenRequest } from "@/lib/api";
import CommentKebab from "./CommentKebab";

export default function CommentViewItem({ comment, onEdit }) {
  const router = useRouter();
  const handleDelete = async (commentId) => {
    try {
      await tokenRequest(`/comments/${commentId}`, { method: "DELETE" });
      router.refresh();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="text-body-sm text-gray-800">{comment.content}</p>
        <CommentKebab
          onEdit={onEdit}
          onDelete={() => handleDelete(comment.id)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/images/ic_profile.svg"
          alt="프로필"
          width={32}
          height={32}
        />
        <div className="flex flex-col gap-1">
          <span className="text-body-xs text-gray-600">
            {comment.writer?.nickname}
          </span>
          <span className="text-body-xs text-gray-400">
            {comment.createdAt}
          </span>
        </div>
      </div>
    </>
  );
}
