"use client";

import Link from "next/link";
import DropDown from "./DropDown";
import { useEffect, useState } from "react";
import EmptyState from "../../../../components/EmptyState";
import ArticleItem from "./ArticleItem";
import { getArticles } from "@/app/api/articles";
import { Article } from "@/types/article";

export default function Articles() {
  const [sortValue, setSortValue] = useState<
    "latest" | "oldest" | "favoritest"
  >("latest");
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const data = await getArticles(sortValue, debouncedKeyword);
      setArticles(data);
      setIsLoading(false);
    }
    fetchArticles();
  }, [sortValue, debouncedKeyword]);

  return (
    <section
      className="mt-[40px] flex flex-col gap-[24px]"
      aria-label="게시글 목록"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-cool-gray-900 text-[20px] font-bold">게시글</h1>
        <Link href="/boards/create">
          <button className="cursor-pointer rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] whitespace-nowrap text-white">
            글쓰기
          </button>
        </Link>
      </div>
      <div className="flex w-full gap-[20px]">
        <input
          className="bg-cool-gray-100 w-full rounded-[12px] border-solid px-[16px] py-[9px] focus:outline-none"
          placeholder="🍳 검색할 상품을 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <DropDown onSelect={setSortValue} />
      </div>
      <ul className="flex flex-col gap-[24px]">
        {isLoading ? (
          <EmptyState>게시글 로딩 중...</EmptyState>
        ) : !articles.length ? (
          <EmptyState>
            게시글이 없어요
            <br />
            게시글을 생성해 보세요!
          </EmptyState>
        ) : (
          articles.map((article) => (
            // TODO: 무한스크롤 방식 적용 시도 해보는거 나쁘지 않을듯
            <Link key={article.id} href={`/boards/${article.id}`}>
              <ArticleItem article={article} />
            </Link>
          ))
        )}
      </ul>
    </section>
  );
}
