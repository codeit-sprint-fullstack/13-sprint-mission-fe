"use client";
import React, { useState } from "react";

export default function CommentForm({ title, onSubmit, placeholder }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content);
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-[9px]">
        <label className="text-lg font-semibold text-gray-900">{title}</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="bg-gray-100 h-[129px] px-6 py-4 rounded-xl resize-none text-md text-gray-400"
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
