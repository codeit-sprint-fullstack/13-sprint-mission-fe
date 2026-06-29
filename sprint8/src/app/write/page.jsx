"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";

export default function WritePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", content: "" });

  const isValid =
    formData.title.trim() !== "" && formData.content.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await createPost({
        title: formData.title,
        content: formData.content,
      });
      alert("게시글이 등록되었습니다!");
      router.push("/");
    } catch (error) {
      alert("등록에 실패했습니다: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">게시글 쓰기</h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`px-8 py-2 rounded-lg text-white transition
            ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          등록
        </button>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">*제목</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="w-full bg-gray-50 border-none rounded-lg p-4 outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">*내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none rounded-lg p-4 h-[400px] outline-none focus:ring-1 focus:ring-blue-400 resize-none"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </div>
    </div>
  );
}
