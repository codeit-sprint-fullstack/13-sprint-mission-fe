"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { articleApi, PostCard, type ArticleOrderBy } from "@/entities/article";
import Pagination from "@/shared/ui/Pagination";
import SortDropdown from "@/shared/ui/SortDropdown";
import SearchForm from "@/shared/ui/SearchForm";
import BestArticleSection from "./BestArticleSection";

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "favorite", label: "좋아요순" },
];

export default function BoardsPageClient() {
  const [orderBy, setOrderBy] = useState<ArticleOrderBy>("recent");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, isError } = useQuery({
    queryKey: ["articles", { page: currentPage, orderBy, keyword }],
    queryFn: () =>
      articleApi.getArticles({ page: currentPage, orderBy, pageSize: PAGE_SIZE, keyword }),
    staleTime: 30 * 1000,
  });

  const { data: bestArticles = [] } = useQuery({
    queryKey: ["articles", "best"],
    queryFn: () => articleApi.getBestArticles(3),
    staleTime: 5 * 60 * 1000,
  });

  const articleList = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValue);
    setCurrentPage(1);
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value as ArticleOrderBy);
    setCurrentPage(1);
  };

  return (
    <main className="px-4 md:px-6 lg:px-20 pb-20">
      <BestArticleSection articles={bestArticles} />

      <div className="flex items-center justify-between mt-8 md:mt-10 lg:mt-12">
        <h2 className="font-bold text-base md:text-lg lg:text-xl">게시글</h2>
        <Link
          href="/boards/create"
          className="bg-primary-100 hover:bg-primary-200 text-white font-medium px-4 md:px-5 lg:px-5 py-2 md:py-2.5 lg:py-2.5 rounded-lg transition-colors text-sm md:text-sm lg:text-base"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <SearchForm
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          placeholder="검색할 게시글을 입력해주세요"
        />
        <SortDropdown value={orderBy} onChange={handleOrderByChange} options={SORT_OPTIONS} />
      </div>

      {isPending ? (
        <div className="flex flex-col mt-2 mb-16 md:mb-20 lg:mb-28">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse my-2" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-gray-500 mt-16 mb-16">게시글을 불러오지 못했습니다.</p>
      ) : (
        <div className="flex flex-col mt-2">
          {articleList.map((article) => (
            <PostCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <Pagination
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
