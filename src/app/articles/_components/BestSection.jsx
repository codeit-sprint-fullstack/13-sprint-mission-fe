"use client";
import CardList from "@/app/articles/_components/CardList.jsx";
import { getBestArticles } from "@/lib/api/articles.js";
import useResponsiveLimit from "@/utils/useResponsiveLimit.js";
import clsx from "clsx";
import Link from "next/link.js";
import { useEffect, useState } from "react";

export default function BestSection() {
  const limit = useResponsiveLimit({ mobile: 1, md: 2, lg: 3 });
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (limit === null) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { articles } = await getBestArticles(limit);
        setArticles(articles);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  return (
    <>
      <span
        className={clsx(
          "block text-700-18 md:text-700-20 text-secondary-gray-800 md:text-secondary-gray-900 mb-4 md:mb-6",
        )}
      >
        베스트 게시글
      </span>
      {isLoading ? (
        <div className={clsx("mb-6 lg:mb-10 flex overflow-x-auto gap-12")}>
          {Array.from({ length: limit ?? 3 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "flex-1 min-w-85.75 min-h-49.5 rounded-xl bg-secondary-gray-200 animate-pulse",
              )}
            />
          ))}
        </div>
      ) : (
        <div className={clsx("mb-6 lg:mb-10 flex overflow-x-auto gap-12")}>
          {articles.map((article) => (
            <Link
              className={clsx("flex-1")}
              key={article.id}
              href={`/articles/${article.id}`}
            >
              <CardList
                variant="card"
                title={article.title}
                id={article.id}
                createdAt={article.createdAt}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
