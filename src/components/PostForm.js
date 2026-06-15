"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "./api";

export default function PostForm({ mode, postId }) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const canSubmit = useMemo(
    () => title.trim() && content.trim() && !saving,
    [title, content, saving],
  );

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    async function fetchPost() {
      const response = await fetch(apiUrl(`/articles/${postId}`), {
        cache: "no-store",
      });

      if (!response.ok) {
        router.replace("/freeboard");
        return;
      }

      const post = await response.json();
      setTitle(post.title);
      setContent(post.content);
    }

    fetchPost();
  }, [isEdit, postId, router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setSaving(true);
    const response = await fetch(
      isEdit ? apiUrl(`/articles/${postId}`) : apiUrl("/articles"),
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      },
    );

    if (response.ok) {
      const post = await response.json();
      router.push(`/freeboard/${post.id}`);
      router.refresh();
      return;
    }

    setSaving(false);
  }

  return (
    <section className="mx-auto max-w-[1040px] px-5 pb-16 pt-7 sm:px-6">
      <form className="mx-auto max-w-[840px]" onSubmit={handleSubmit}>
        <div className="mb-[26px] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-bold">
            {isEdit ? "게시글 수정" : "게시글 쓰기"}
          </h1>
          <button
            className="h-[34px] min-w-[62px] rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600 dissabled:bg-gray-400"
            type="submit"
            disabled={!canSubmit}
          >
            {isEdit ? "수정" : "등록"}
          </button>
        </div>

        <label className="mb-[22px] block text-sm font-extrabold">
          <span className="mb-3 block">*제목</span>
          <input
            className="h-[52px] w-full rounded-lg border-0 bg-gray-100 px-[18px] text-gray-900 outline-none placeholder:text-gray-400"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </label>

        <label className="mb-[22px] block text-sm font-extrabold">
          <span className="mb-3 block">*내용</span>
          <textarea
            className="min-h-[190px] w-full resize-y rounded-lg border-0 bg-gray-100 p-[18px] text-gray-900 outline-none placeholder:text-gray-400"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="내용을 입력해주세요"
          />
        </label>
      </form>
    </section>
  );
}
