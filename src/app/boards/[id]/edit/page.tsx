'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getArticle, updateArticle } from '@/lib/articles';
import Header from '@/app/components/Header';
import PostForm, { type PostFormValues } from '@/app/components/PostForm';
import type { Article } from '@/types';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    getArticle(id)
      .then((data) => {
        if (!data) { router.replace('/boards'); return; }
        setArticle(data);
      })
      .catch(() => router.replace('/boards'));
  }, [id, router]);

  async function handleSubmit(values: PostFormValues) {
    await updateArticle(id, values);
    router.push(`/boards/${id}`);
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header active="boards" />
        <p className="py-20 text-center text-sm text-slate-400">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="boards" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="mb-4 text-sm text-slate-400">
          <Link href={`/boards/${id}`} className="transition-colors hover:text-[#3692FF]">← 돌아가기</Link>
        </div>
        <PostForm initial={article} onSubmit={handleSubmit} heading="게시글 수정" submitLabel="수정" />
      </main>
    </div>
  );
}
