"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ id, initialTitle, initialContent }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const router = useRouter();

  const isValid = title?.trim() && content.trim();

  const handleSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      },
    );
    const data = await res.json();
    router.push(`/freeboard/${data.id}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">게시물 수정</h2>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="btn_small_40"
        >
          수정
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
          className="mt-3 h-70.5 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  );
}
