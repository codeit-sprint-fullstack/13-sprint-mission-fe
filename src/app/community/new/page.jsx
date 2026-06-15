"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../../lib/api.js";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await createArticle({
        title: title.trim(),
        content: content.trim(),
      });
      router.push(`/community/${res.data.id}`);
    } catch {
      setError("게시글 등록에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-secondary-900">게시글 쓰기</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-blue-500 enabled:hover:bg-blue-600 disabled:cursor-not-allowed"
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-lg font-semibold text-secondary-900 mb-2"
        >
          *제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-lg font-semibold text-secondary-900 mb-2"
        >
          *내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          rows={10}
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}
