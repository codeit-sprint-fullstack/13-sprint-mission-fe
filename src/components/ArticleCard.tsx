"use client";

import Link from "next/link";
import type { ArticleListItem } from "../types/article";

const NICKNAMES = ["호영", "라라", "아델", "렌", "은월"];

function getFakeData(id: number) {
  const num = typeof id === "number" ? id : String(id).length;
  return {
    nickname: NICKNAMES[num % NICKNAMES.length],
    likes: (num * 7) % 100,
  };
}

export default function ArticleCard({ article }: { article: ArticleListItem }) {
  const { nickname, likes } = getFakeData(article.id);
  const date = new Date(article.createdAt).toLocaleDateString("ko-KR");

  return (
    <Link href={`/articles/${article.id}`} className="block">
      <article className="border-b border-gray-200 py-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-800 md:text-xl">{article.title}</h3>
          <img
            className="h-[72px] w-[72px] shrink-0 rounded-lg bg-gray-200 object-cover"
            src="/image/default-article.png"
            alt=""
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <img
              className="h-6 w-6 rounded-full bg-gray-200"
              src="/image/default-avatar.png"
              alt=""
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
            <span>{nickname}</span>
            <span className="text-gray-400">{date}</span>
          </div>
          <span className="text-sm text-gray-400">♡ {likes}</span>
        </div>
      </article>
    </Link>
  );
}
