"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getArticle, updateArticle } from "@/app/lib/api";
import ArticleForm from "@/app/components/ui/ArticleForm";

export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.articleId);

  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(articleId)
      .then((res) => setInitial(res.data))
      .catch(() => setInitial(null))
      .finally(() => setLoading(false));
  }, [articleId]);

  const handleSubmit = async ({ title, content }) => {
    try {
      await updateArticle(articleId, { title, content });
      router.push(`/community/${articleId}`);
    } catch {
      throw new Error("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-sm text-secondary-400 py-20">
        불러오는 중...
      </p>
    );
  }

  if (!initial) {
    return (
      <p className="text-center text-sm text-secondary-400 py-20">
        게시글을 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <ArticleForm
      pageTitle="게시글 수정"
      submitLabel="수정"
      initialTitle={initial.title}
      initialContent={initial.content}
      onSubmit={handleSubmit}
    />
  );
}
