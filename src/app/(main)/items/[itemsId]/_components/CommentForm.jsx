"use client";
import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const isValid = content.trim();

  const handleSubmit = () => {
    onSubmit(content);
    setContent(""); //
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 md:text-gray-900">
        문의하기
      </h3>
      <textarea
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-md mt-3 h-26 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-gray-800 placeholder-gray-400 outline-none"
      />
      <div className="mt-4 flex justify-end">
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
