"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticleForm } from "../../../../src/hooks/useArticleForm";
import { getArticle, updateArticle } from "../../../../src/api/articleApi";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const {
    title,
    content,
    isValid,
    handleTitleChange,
    handleContentChange,
    getValues,
    setTitle,
    setContent,
  } = useArticleForm();

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await getArticle(articleId);
        // 참고: GET /articles/:id는 { article }로 감싸지 않고 평탄하게 내려준다 (위 articles/[id]/page.tsx 참고)
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        alert("게시글을 불러올 수 없습니다: " + message);
      }
    }
    loadArticle();
  }, [articleId, setTitle, setContent]);

  async function handleSubmit() {
    if (!isValid) return;

    try {
      await updateArticle(articleId, getValues());
      router.push(`/articles/${articleId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert("수정 실패: " + message);
    }
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">게시글 수정</h1>
        <button
          type="button"
          className="rounded-lg bg-panda-primary px-7 py-3 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          수정
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
