"use client";
import { createArticle } from "@/api/article";
import ArticleFrom from "@/app/(main-layout)/articles/_components/ArticleFrom";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreatArticlePage() {
  const router = useRouter();

  const handleCreate = async (formData) => {
    try {
      const data = await createArticle(formData);
      if (data.success) {
        router.push("/articles");
      }
    } catch (error) {
      alert("등록 실패: " + err.message);
    }
  };
  return (
    <main className="mt-[86px] mx-auto mb-18 ">
      <ArticleFrom onSubmit={handleCreate} />
    </main>
  );
}
