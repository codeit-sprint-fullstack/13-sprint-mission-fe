'use client';

import { useRouter } from 'next/navigation';
import { createArticle } from '@/lib/articles';
import Header from '@/app/components/Header';
import PostForm from '@/app/components/PostForm';

export default function WritePage() {
  const router = useRouter();

  async function handleSubmit(values) {
    const article = await createArticle(values);
    router.push(`/boards/${article.id}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="boards" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <PostForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
