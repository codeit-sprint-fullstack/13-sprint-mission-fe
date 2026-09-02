"use client";

import { useState } from "react";
import { createComment } from "@/lib/api";
import type { Comment } from "@/types/api";
import { getErrorMessage } from "@/lib/errors";

interface CommentFormProps {
  articleId: number | string;
  onAdd: (comment: Comment) => void;
}

// 댓글 작성 폼. client에서 직접 API 호출 (토큰은 localStorage에 있으므로)
export default function CommentForm({ articleId, onAdd }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const created = await createComment(articleId, content.trim());
      onAdd(created); // 부모 state에 추가 -> 즉시 화면 반영
      setContent("");
    } catch (err) {
      alert(getErrorMessage(err, "댓글 등록에 실패했어요."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className="h-24 w-full resize-none rounded-lg bg-gray-100 px-6 py-4 text-base text-gray-800 placeholder:text-gray-400"
      />
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="h-11 rounded-lg bg-brand-blue px-6 text-base font-semibold text-white disabled:bg-gray-400"
        >
          등록
        </button>
      </div>
    </form>
  );
}
