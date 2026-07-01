"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tokenRequest } from "@/lib/api";

export default function CommentEditForm({ comment, onCancel }) {
  const router = useRouter();
  const [editContent, setEditContent] = useState(comment.content);
  const handleEdit = async (commentId) => {
    try {
      await tokenRequest(`/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify({ content: editContent }),
      });
      onCancel();
      router.refresh();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full bg-gray-100 rounded-xl px-6 py-4 text-body-md text-gray-800 outline-none resize-none h-[80px]"
      />
      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onCancel}
            className="h-[42px] px-5 text-body-lg font-semibold text-gray-500"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => handleEdit(comment.id)}
            className="h-[42px] px-6 bg-brand-blue text-white text-body-lg font-semibold rounded-lg"
          >
            수정 완료
          </button>
        </div>
      </div>
    </>
  );
}
