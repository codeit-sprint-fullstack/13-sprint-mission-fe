"use client";

import CardList from "@/app/articles/_components/CardList.jsx";
import SearchBox from "@/app/articles/_components/SearchBox.jsx";
import SortMenu from "@/app/articles/_components/SortMenu.jsx";
import ActionButton from "@/components/button/ActionButton.jsx";
import { getArticles } from "@/lib/api/articles.js";
import useResponsiveLimit from "@/utils/useResponsiveLimit.js";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function ListSection() {
  const limit = useResponsiveLimit({ mobile: 3, md: 6, lg: 4 });
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const sort = searchParams.get("sort") ?? "recent";
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (limit === null) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { articles, count } = await getArticles({ keyword, sort, limit }); //count 는 나중을 대비
        setArticles(articles);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyword, sort, limit]);

  return (
    <>
      <div
        className={clsx(
          "mb-4 md:mb-12 lg:mb-6  flex items-center justify-between",
        )}
      >
        <span
          className={clsx("text-700-18 md:text-700-20 text-secondary-gray-800")}
        >
          게시글
        </span>
        <ActionButton href="/articles/create" text="글쓰기" />
      </div>
      <div className={clsx("mb-4 md:mb-10 lg:mb-6 flex justify-between")}>
        <SearchBox />
        <SortMenu />
      </div>
      {isLoading ? (
        <div className={clsx("flex flex-col gap-6")}>
          {Array.from({ length: limit ?? 3 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "h-32 rounded-xl bg-secondary-gray-200 animate-pulse",
              )}
            />
          ))}
        </div>
      ) : (
        <div className={clsx("flex flex-col gap-6")}>
          {articles.map((article) => {
            return (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <CardList
                  variant="list"
                  id={article.id}
                  title={article.title}
                  createdAt={article.createdAt}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
