"use client";
import React, { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content);
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-[343px] flex flex-col gap-4">
      <div className="flex flex-col gap-[9px]">
        <h3 className="text-lg font-semibold text-gray-900">댓글달기</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="bg-gray-100 h-[104px] px-6 py-4 rounded-xl resize-none "
        />
      </div>
      <button
        type="submit"
        disabled={!content.trim()}
        className={`w-[76px] h-[42px] rounded-lg text-lg text-white self-end ${content.trim() ? "bg-primary-100 cursor-pointer" : "bg-gray-400 "}`}
      >
        등록
      </button>
    </form>
  );
}
