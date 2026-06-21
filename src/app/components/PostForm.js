"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ id = null, initialData = null }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!id;

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const url = isEditMode
        ? `http://localhost:4000/api/articles/${id}`
        : `http://localhost:4000/api/articles`;

      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("요청 실패");

      const result = await response.json();

      const targetId = isEditMode ? id : result.id;
      router.push(`/board/${targetId}`);
    } catch (error) {
      console.error("에러 발생:", error);
      alert(isEditMode ? "수정에 실패했습니다." : "등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">
            {isEditMode ? "게시글 수정하기" : "게시글 쓰기"}
          </h1>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`px-8 py-2 rounded-lg font-medium transition-colors ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isEditMode ? "수정" : "등록"}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold mb-3">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full bg-gray-100 border border-transparent focus:border-blue-500 rounded-xl py-4 px-4 outline-none transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold mb-3">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            className="w-full bg-gray-100 border border-transparent focus:border-blue-500 rounded-xl py-4 px-4 outline-none min-h-[400px] transition-all resize-none"
          />
        </div>
      </form>
    </div>
  );
}
