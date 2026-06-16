import Image from "next/image";
import React from "react";
import { ArticleCard, BestArticleCard } from "./components/BestArticleCard";
import Link from "next/link";
import Btn from "@/components/common/Btn";

export default function ArticlePage() {
  const mookArticle = [{ title: "타이틀", createdAt: "2026.6.15" }];
  return (
    <main className="mt-[86px] mx-auto flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-2lg text-gray-800 font-bold">베스트 게시글</h2>
        {mookArticle.map((article, index) => (
          <BestArticleCard
            key={index} // 리액트 반복문에는 고유한 key가 필수!
            title={article.title}
            createdAt={article.createdAt}
          />
        ))}
      </section>
      <section>
        <div className="flex justify-between">
          <h2 className="text-2lg text-gray-800 font-bold">게시글</h2>
          <Btn text="글쓰기" />
        </div>
        <div>
          <Image alt="검색" src="/"/>
        </div>
      </section>
    </main>
  );
}
