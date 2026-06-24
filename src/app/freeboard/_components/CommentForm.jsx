"use client";
import { useState } from "react";

// 댓글 입력 폼 - 공백만 입력된 경우 등록 버튼 비활성화
export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");

  // trim()으로 공백 입력 방지
  const isValid = content.trim();

  const handleSubmit = () => {
    onSubmit(content);
    setContent(""); // 제출 후 입력창 초기화
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">댓글달기</h3>
      <textarea
        placeholder="댓글을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-3 h-26 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 outline-none"
      />
      <div className="mt-4 flex justify-end">
        {/* 내용이 없으면 버튼 비활성화 */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="btn_small_40"
        >
          등록
        </button>
      </div>
    </div>
  );
}
