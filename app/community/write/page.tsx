"use client";

import { useRouter } from "next/navigation";
import { useArticleForm } from "../../../src/hooks/useArticleForm";
import { createArticle } from "../../../src/api/articleApi";

export default function WritePage() {
  const router = useRouter();

  const {
    title,
    content,
    isValid,
    handleTitleChange,
    handleContentChange,
    getValues,
  } = useArticleForm();

  async function handleSubmit() {
    if (!isValid) return;

    try {
      const result = await createArticle(getValues());
      router.push(`/articles/${result!.article.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert("등록 실패: " + message);
    }
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">게시글 쓰기</h1>
        <button
          type="button"
          className="rounded-lg bg-panda-primary px-7 py-3 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          등록
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-bold text-gray-800" htmlFor="title">*제목</label>
          <input
            id="title"
            className="w-full rounded-xl bg-gray-100 px-6 py-4 text-base outline-none"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-lg font-bold text-gray-800" htmlFor="content">*내용</label>
          <textarea
            id="content"
            className="min-h-[200px] w-full resize-y rounded-xl bg-gray-100 px-6 py-4 text-base outline-none"
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          />
        </div>
      </form>
    </main>
  );
}
