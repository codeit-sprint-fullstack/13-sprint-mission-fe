"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Heart, Search } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { articleApi } from "@/lib/api";
import { queryKeys } from "@/lib/queries";
import type { Article, PaginatedResponse, SortOrder } from "@/types/api";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,11120px)]";

interface ArticleCardProps {
  article: Article;
  best?: boolean;
}

function ArticleCard({ article, best = false }: ArticleCardProps) {
  const imageUrl =
    article.imageUrls?.[0] ||
    article.images?.[0] ||
    "https://picsum.photos/seed/panda-board/320/240";

  const href = `/board/${article.id}`;

  if (best) {
    return (
      <Link
        className="grid min-h-[120px] grid-cols-[1fr_72px] gap-3 rounded-lg bg-[#f9fafb] p-4"
        href={href}
      >
        <div className="min-w-0">
          <span className="mb-2 inline-flex rounded bg-[#3692ff] px-2 py-1 text-xs font-bold text-white">
            Best
          </span>
          <strong className="line-clamp-2 block text-[15px] leading-6">
            {article.title}
          </strong>
          <span className="mt-3 block text-xs text-gray-400">
            {article.writer?.nickname || "익명"} .{" "}
            {article.createdAt?.slice(0, 10)}
          </span>
        </div>
        <img
          className="h-[72px] w-[72px] rounded-lg object-cover"
          src={imageUrl}
          alt=""
        />
      </Link>
    );
  }

  return (
    <Link
      className="grid grid-cols-[1fr_72px] gap-4 border-b border-[#e5e7eb] py-5"
      href={href}
    >
      <div className="min-w-0">
        <strong className="line-clamp-2 block text-[17px]">
          {article.title}
        </strong>
        <span className="mt-4 block text-xs text-gray-400">
          {article.writer?.nickname || "익명"} .{" "}
          {article.createdAt?.slice(0, 10)}
        </span>
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-gray-400">
          <Heart size={14} />
          {(article.favoriteCount ?? 0).toLocaleString("ko-KR")}
        </span>
      </div>
      <img
        className="h-[72px] w-[72px] rounded-lg object-cover"
        src={imageUrl}
        alt=""
      />
    </Link>
  );
}

export default function FreeboardPage() {
  const [keyword, setKeyword] = useState("");
  const [draftKeyword, setDraftKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<SortOrder>("recent");

  const bestQuery = useQuery<{ list: Article[] }>({
    queryKey: queryKeys.bestArticles,
    queryFn: () => articleApi.best({ limit: 3 }),
  });
  const articlesQuery = useQuery<PaginatedResponse<Article>>({
    queryKey: queryKeys.articles(1, orderBy, keyword),
    queryFn: () => articleApi.list({ page: 1, pageSize: 20, orderBy, keyword }),
  });

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(draftKeyword.trim());
  };

  return (
    <div className="bg-white text-[#1f2937]">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-170px)] pt-8 pb-[90px]`}
      >
        <section>
          <h1 className="mb-[18px] text-xl font-bold">베스트 게시글</h1>
          <div className="desktop:grid-cols-3 grid gap-5">
            {bestQuery.data?.list?.map((article) => (
              <ArticleCard article={article} best key={article.id} />
            ))}
          </div>
        </section>

        <section className="mt-11">
          <div className="desktop:flex-row desktop:items-center desktop:justify-between mb-[22px] flex flex-col items-stretch gap-4">
            <h2 className="text-xl font-bold">게시글</h2>
            <Link
              className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#3692ff] px-[18px] font-bold text-white"
              href="/board/new"
            >
              글쓰기
            </Link>
          </div>
          <div className="desktop:flex-row desktop:items-center mb-3 flex flex-col items-stretch gap-3">
            <form
              className="desktop:w-[min(520px,52vw)] relative h-[42px] w-full rounded-lg bg-[#f3f4f6] text-gray-400"
              onSubmit={search}
            >
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2"
                size={18}
                aria-hidden="true"
              />
              <input
                className="h-full w-full border-0 bg-transparent pr-3.5 pl-11 text-[15px] leading-[42px] outline-none placeholder:text-gray-400"
                value={draftKeyword}
                onChange={(event) => setDraftKeyword(event.target.value)}
                placeholder="검색할 게시글을 입력해주세요"
              />
            </form>
            <select
              className="h-[42px] rounded-lg border border-[#e5e7eb] bg-white px-4 font-bold"
              value={orderBy}
              onChange={(event) => setOrderBy(event.target.value as SortOrder)}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
          {articlesQuery.isLoading ? (
            <p className="rounded-lg bg-[#f3f4f6] p-[18px] text-[#6b7280]">
              게시글을 불러오는 중...
            </p>
          ) : null}
          {articlesQuery.isError ? (
            <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
              게시글 목록을 불러오지 못했어요.
            </p>
          ) : null}
          <div>
            {articlesQuery.data?.list?.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
