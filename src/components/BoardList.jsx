"use client";

import { useState } from "react";
import Link from "next/link";
import ArticleItem from "@/components/ArticleItem";
import { ORDER, ORDER_OPTIONS } from "@/constants/order";

export default function BoardList({ articles }) {
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState(ORDER.RECENT);

  // 1) 정렬
  const sorted = [...articles].sort((a, b) => {
    if (order === ORDER.RECENT) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  // 2) 베스트 = 최신순 3개
  const bestArticles = sorted.slice(0, 3);

  // 3) 검색 (제목 부분 일치) + 정렬 적용된 전체 목록
  const filtered = sorted.filter((article) =>
    article.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="space-y-10">
      {/* 베스트 게시글*/}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">베스트 게시글</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bestArticles.map((article) => (
            <Link
              href={`/boards/${article.id}`}
              className="block rounded-lg bg-gray-50 px-6 pb-4"
            >
              {/* 메달 뱃지 */}
              <div className="flex items-center gap-1 rounded-b-2xl bg-primary-100 px-[22px] py-1.5 w-fit">
                <img
                  src="/img/main/ic_medal.svg"
                  alt="best"
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold text-white">Best</span>
              </div>

              {/* 제목 + 이미지 */}
              <div className="mt-4 flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
                  {article.title}
                </h3>
                <img
                  src="/img/main/img-laptop.png"
                  alt="게시글 기본 이미지"
                  className="h-[72px] w-[72px] shrink-0 rounded-lg border border-gray-200 bg-white object-contain p-2"
                />
              </div>

              {/* 작성자 · 좋아요 · 날짜 */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">총명한 판다</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    ♡ 9999+
                  </span>
                </div>
                <span className="text-sm text-gray-400">2024. 04. 16</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/*게시글 목록*/}
      <section>
        {/* 제목 + 글쓰기 버튼 */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">게시글</h2>
          <Link
            href="/boards/add"
            className="rounded-lg bg-primary-100 px-4 py-2 text-sm font-semibold text-white md:px-5 md:py-2.5"
          >
            글쓰기
          </Link>
        </div>
        {/* 검색창 + 정렬 드롭다운 */}
        <div className="mb-6 flex gap-3">
          {/* 검색창 */}
          <div className="relative flex-1">
            <img
              src="/img/main/ic_search.svg"
              alt=""
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색할 상품을 입력해주세요"
              className="w-full rounded-xl bg-gray-100 py-3 pl-11 pr-4 text-sm placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {/* 정렬 드롭다운 */}
          <div className="relative">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-5 pr-10 text-sm focus:outline-none"
            >
              {ORDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <img
              src="/img/main/ic_arrow_down.svg"
              alt=""
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
            />
          </div>
        </div>

        {/* 검색·정렬 적용된 목록 */}
        <div className="flex flex-col gap-4">
          {filtered.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
