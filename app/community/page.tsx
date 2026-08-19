"use client";

import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getArticles, getBestArticles } from "../../src/api/articleApi";
import ArticleCard from "../../src/components/ArticleCard";
import BestArticles from "../../src/components/BestArticles";
import type { PaginatedResponse } from "../../src/types/pagination";
import type { ArticleListItem, ArticleSortOption } from "../../src/types/article";

export default function CommunityPage() {
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<ArticleSortOption>("recent");

  const { data: bestData } = useQuery<PaginatedResponse<ArticleListItem> | null, Error>({
    queryKey: ["bestArticles"],
    queryFn: getBestArticles,
  });

  const { data, isLoading, isError } = useQuery<PaginatedResponse<ArticleListItem> | null, Error>({
    queryKey: ["articles", keyword, sort],
    queryFn: () => getArticles({ keyword, sort, limit: 10 }),
  });

  const bestArticles = (bestData?.list || []).slice(0, 3);
  const articles = data?.list || [];

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setKeyword(searchText);
    }
  }

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as ArticleSortOption);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-8">
      <BestArticles articles={bestArticles} />

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">게시글</h2>
          <Link
            href="/community/write"
            className="rounded-lg bg-panda-primary px-6 py-3 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active"
          >
            글쓰기
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <div className="flex h-[42px] flex-1 items-center gap-2 rounded-xl bg-gray-100 px-4">
            <span>🔍</span>
            <input
              className="w-full bg-transparent text-[15px] outline-none"
              type="text"
              placeholder="검색할 게시글을 입력해주세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <select
            className="h-[42px] rounded-xl border border-gray-200 bg-white px-4 text-[15px]"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
          </select>
        </div>

        {isLoading ? (
          <div className="py-10 text-center text-gray-400">
            게시글을 불러오는 중입니다...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-red-400">
            게시글을 불러오지 못했습니다.
          </div>
        ) : articles.length > 0 ? (
          <div className="flex flex-col">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400">
            게시글이 없습니다.
          </div>
        )}
      </section>
    </main>
  );
}
