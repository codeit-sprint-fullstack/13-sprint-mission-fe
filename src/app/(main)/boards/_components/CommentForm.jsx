"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tokenRequest } from "../../../../lib/api";

export default function CommentForm({ articleId }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const isFormValid = content.trim() !== "";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { content };
      await tokenRequest(`/articles/${articleId}/comments`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      setContent("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <form className="flex flex-col gap-4 items-end" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-body-md font-semibold text-gray-800">댓글달기</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="w-full bg-gray-100 rounded-xl px-6 py-4 text-body-md text-gray-800 placeholder:text-gray-400 outline-none resize-none h-[104px]"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`h-[42px] px-6 rounded-lg text-btn text-white ${
            isFormValid ? "bg-brand-blue" : "bg-gray-400"
          }`}
        >
          등록
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-body-sm">{error}</p>}
    </div>
  );
}
