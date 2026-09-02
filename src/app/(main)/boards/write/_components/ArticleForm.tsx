"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

interface ArticleFormProps {
  // articleId가 있으면 수정 모드, 없으면(null) 등록 모드
  articleId?: number | string | null;
  defaultTitle?: string;
  defaultContent?: string;
  heading?: string;
  submitLabel?: string;
}

// 게시글 등록/수정 공용 폼
// articleId가 있으면 수정, 없으면 등록. client에서 직접 API 호출 (토큰은 localStorage에 있으므로)
export default function ArticleForm({
  articleId = null,
  defaultTitle = "",
  defaultContent = "",
  heading = "게시글 쓰기",
  submitLabel = "등록",
}: ArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = title.trim() && content.trim();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = { title: title.trim(), content: content.trim() };
      const article = articleId
        ? await updateArticle(articleId, data)
        : await createArticle(data);
      router.push(`/boards/${article.id}`);
      router.refresh(); // 서버 컴포넌트(목록/상세) 캐시 갱신
    } catch (err) {
      alert(getErrorMessage(err, "저장에 실패했어요."));
      setIsSubmitting(false); // 성공 시엔 페이지 이동하므로 실패 때만 복구
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-11 rounded-lg bg-brand-blue px-6 text-base font-semibold text-white disabled:bg-gray-400"
        >
          {submitLabel}
        </button>
      </div>

      <label className="mb-3 block text-lg font-bold text-gray-900">
        *제목
      </label>
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
        className="mb-6 h-14 w-full rounded-xl bg-gray-100 px-6 text-base text-gray-800 placeholder:text-gray-400"
      />

      <label className="mb-3 block text-lg font-bold text-gray-900">
        *내용
      </label>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력해주세요"
        className="h-72 w-full resize-none rounded-xl bg-gray-100 px-6 py-6 text-base text-gray-800 placeholder:text-gray-400"
      />
    </form>
  );
}
