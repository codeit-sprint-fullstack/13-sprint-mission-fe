'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PostCard from '@/app/components/PostCard';
import BestPostCard from '@/app/components/BestPostCard';
import type { Article, ArticleOrderBy } from '@/types';

export default function BoardsPage() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState<ArticleOrderBy>('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getArticles({ pageSize: 3, orderBy: 'recent' })
      .then((data) => setBestArticles(data.list.slice(0, 3)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    let cancelled = false;

    getArticles({ pageSize: 10, keyword, orderBy })
      .then((data) => {
        if (cancelled) return;
        setArticles(data.list);
        setError('');
      })
      .catch((fetchError) => {
        if (cancelled) return;
        console.error(fetchError);
        setError('게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [keyword, orderBy]);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    setKeyword(event.target.value);
  }

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
    setIsLoading(true);
    setOrderBy(event.target.value as ArticleOrderBy);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="boards" />

      <main className="mx-auto max-w-[1120px] px-6 py-8">

        {/* 베스트 게시글 */}
        {bestArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 text-xl font-bold text-[#1F2937]">베스트 게시글</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {bestArticles.map((article, i) => (
                <BestPostCard key={article.id} article={article} rank={i + 1} />
              ))}
            </div>
          </section>
        )}

        {/* 게시글 헤더 */}
        <div className="mb-5 mt-12 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1F2937]">게시글</h2>
          <Link
            href="/boards/write"
            className="flex h-12 w-[88px] items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-blue-600"
          >
            글쓰기
          </Link>
        </div>

        {/* 검색 + 정렬 */}
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="검색할 게시글을 입력해주세요"
              value={keyword}
              onChange={handleKeywordChange}
              className="h-12 w-full rounded-xl border-0 bg-[#F3F4F6] py-3 pl-10 pr-4 text-base text-slate-900 placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
            />
          </div>
          <select
            value={orderBy}
            onChange={handleOrderChange}
            className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-4 text-base font-medium text-[#1F2937] transition focus:border-[#3692FF] focus:outline-none"
          >
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
          </select>
        </div>

        {/* 게시글 목록 */}
        <section className="bg-white">
          {isLoading ? (
            <p className="py-12 text-center text-sm text-slate-400">불러오는 중...</p>
          ) : error ? (
            <p role="alert" className="py-12 text-center text-sm text-rose-500">{error}</p>
          ) : articles.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-400">
              {keyword ? `"${keyword}"에 대한 검색 결과가 없습니다.` : '아직 게시글이 없습니다.'}
            </p>
          ) : (
            articles.map((article) => <PostCard key={article.id} article={article} />)
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
