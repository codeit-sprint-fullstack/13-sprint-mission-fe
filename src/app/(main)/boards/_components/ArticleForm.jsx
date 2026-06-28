"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tokenRequest } from "../../../../lib/api";

export default function ArticleForm({ id, article }) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [error, setError] = useState("");
  const router = useRouter();

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { title, content };

      const endpoint = id ? `/articles/${id}` : `/articles`;
      const method = id ? "PATCH" : "POST";

      const savedArticle = await tokenRequest(endpoint, {
        method,
        body: JSON.stringify(data),
      });

      setTitle("");
      setContent("");
      router.push(`/boards/${savedArticle.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-page mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-title-md text-gray-800">
          {id ? "게시글 수정" : "게시글 쓰기"}
        </h2>
        <button
          type="submit"
          form="article-form"
          disabled={!isFormValid}
          className={`h-[42px] px-6 rounded-lg text-btn text-white ${
            isFormValid ? "bg-brand-blue" : "bg-gray-400"
          }`}
        >
          {id ? "수정" : "등록"}
        </button>
      </div>
      <form
        id="article-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-title-sm text-gray-800">
            *제목
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-100 rounded-xl px-6 py-4 text-body-md text-gray-800 placeholder:text-gray-400 outline-none h-[56px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="content" className="text-title-sm text-gray-800">
            *내용
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 rounded-xl px-6 py-4 text-body-md text-gray-800 placeholder:text-gray-400 outline-none h-[282px] resize-none"
          />
        </div>
      </form>
      {error && <p className="mt-4 text-red-500 text-body-sm">{error}</p>}
    </div>
  );
}
