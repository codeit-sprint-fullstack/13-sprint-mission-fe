"use client";

import { useRouter } from "next/navigation";
import { createArticle } from "@/app/lib/api";
import ArticleForm from "@/app/components/ui/ArticleForm";

export default function NewArticlePage() {
  const router = useRouter();

  const handleSubmit = async ({ title, content }) => {
    try {
      const res = await createArticle({ title, content });
      router.push(`/community/${res.data.id}`);
    } catch {
      throw new Error("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ArticleForm
      pageTitle="게시글 쓰기"
      submitLabel="등록"
      onSubmit={handleSubmit}
    />
  );
}
