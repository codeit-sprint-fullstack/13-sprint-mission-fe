"use client";

import { useState } from "react";

interface ArticleFormProps {
  initialTitle?: string;
  initialContent?: string;
  pageTitle: string;
  submitLabel: string;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
}

export default function ArticleForm({
  initialTitle = "",
  initialContent = "",
  pageTitle,
  submitLabel,
  onSubmit,
}: ArticleFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  async function handleSubmit() {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({ title: title.trim(), content: content.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-secondary-900">{pageTitle}</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary-200 disabled:cursor-not-allowed"
        >
          {submitting ? `${submitLabel} 중...` : submitLabel}
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
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
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
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
        />
      </div>
    </div>
  );
}
