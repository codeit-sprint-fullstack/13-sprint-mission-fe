"use client";

import { postComment } from "@/app/api/comments";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CommentForm({ onSuccess }) {
  const { articleId } = useParams();
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await postComment(articleId, comment);
    if (!res.ok) return alert("생성 실패");
    onSuccess();
    setComment("");
  };

  return (
    <form className="mt-[40px] flex flex-col gap-[9px]" onSubmit={onSubmit}>
      <label className="text-cool-gray-900 text-[16px] font-[600]">
        댓글달기
      </label>
      <textarea
        className="bg-cool-gray-100 h-[104px] resize-none rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          disabled={!comment}
          className={`text-cool-gray-100 bg-brand-blue disabled:bg-secondary-400 rounded-[8px] border-none px-[23px] py-[12px] text-[16px] font-[600] ${comment ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          등록
        </button>
      </div>
    </form>
  );
}
