"use client";

import Link from "next/link";
import type { ArticleListItem } from "../types/article";

export default function BestArticles({
  articles = [],
}: {
  articles?: ArticleListItem[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold text-gray-800">베스트 게시글</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => {
          const date = new Date(article.createdAt).toLocaleDateString("ko-KR");
          return (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className={`${index > 0 ? "hidden md:block" : "block"} ${index > 1 ? "xl:block" : ""} rounded-xl bg-gray-50 px-6 pb-4`}
            >
              <div className="mb-4 inline-block rounded-b-2xl bg-panda-primary px-5 py-1.5 text-sm font-semibold text-white">
                🏅 Best
              </div>
              <div className="flex min-h-20 items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {article.title}
                </h3>
                <img
                  className="h-[72px] w-[72px] shrink-0 rounded-lg bg-gray-200 object-cover"
                  src="/image/default-article.png"
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
              </div>
              <div className="mt-3 flex gap-3 text-sm text-gray-400">
                <span>{article.writer?.nickname || "익명"}</span>
                <span>{date}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
