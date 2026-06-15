"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getArticle, updateArticle } from "../../../lib/api.js";

export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.articleId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getArticle(articleId);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch {
        setError("게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [articleId]);

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await updateArticle(articleId, {
        title: title.trim(),
        content: content.trim(),
      });
      router.push(`/community/${articleId}`);
    } catch {
      setError("게시글 수정에 실패했습니다. 다시 시도해주세요.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-sm text-secondary-400 py-20">
        불러오는 중...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-secondary-900">게시글 수정</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary-200 disabled:cursor-not-allowed"
        >
          {submitting ? "수정 중..." : "수정"}
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
