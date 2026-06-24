"use client";

// src/components/PostForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, FORM_MODE } from "@/constants/article";

export default function PostForm({ mode, articleId, initialData }) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모든 input 채워졌을 때만 버튼 활성화
  const isValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (mode === FORM_MODE.CREATE) {
        // 등록: POST
        const res = await fetch(`${API_BASE_URL}/articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        if (!res.ok) throw new Error("등록 실패");
        const created = await res.json();
        router.push(`/boards/${created.id}`); // 등록 후 상세로 이동
      } else {
        // 수정: PATCH
        const res = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        if (!res.ok) throw new Error("수정 실패");
        router.push(`/boards/${articleId}`); // 수정 후 상세로 이동
      }
    } catch (error) {
      console.error(error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      {/* 상단: 제목 + 등록 버튼 */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          {mode === FORM_MODE.CREATE ? "게시글 쓰기" : "게시글 수정"}
        </h1>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold text-white md:px-6 md:py-2 ${
            isValid && !isSubmitting
              ? "bg-primary-100"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          등록
        </button>
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <label className="mb-2 block font-bold text-gray-800">*제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="w-full rounded-xl bg-gray-100 px-6 py-4 text-sm placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {/* 내용 */}
      <div>
        <label className="mb-2 block font-bold text-gray-800">*내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          className="h-40 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-sm placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
