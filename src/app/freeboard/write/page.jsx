"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const isValid = title.trim() && content.trim();

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    router.push(`/freeboard/${data.id}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">게시글 등록하기</h2>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`btn_small_40 ${!isValid ? "cursor-not-allowed opacity-50" : ""}`}
        >
          등록
        </button>
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-md font-bold text-gray-800 md:text-2lg">
          *제목
        </label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-3 w-full rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
      <div>
        <label className="text-md font-bold text-gray-800 md:text-2lg">
          *내용
        </label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-3 h-70.5 w-full rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  );
}
