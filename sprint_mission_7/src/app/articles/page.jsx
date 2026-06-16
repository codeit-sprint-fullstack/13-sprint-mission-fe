import Image from "next/image";
import React from "react";

import Btn from "@/components/common/Btn";
import Dropdown from "@/components/common/Dropdown";
import ArticleCard from "./components/ArticleCard";
import { BestArticleCard } from "./components/BestArticleCard";

export default function ArticlePage() {
  const mookArticle = [
    { title: "타이틀", createdAt: "2026.6.15" },
    { title: "타이틀", createdAt: "2026.6.15" },
    { title: "타이틀", createdAt: "2026.6.15" },
    { title: "타이틀", createdAt: "2026.6.15" },
  ];
  return (
    <main className="mt-[86px] mx-auto flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-2lg text-gray-800 font-bold">베스트 게시글</h2>
        {mookArticle.slice(0, 1).map((article, index) => (
          <BestArticleCard
            key={index} // 리액트 반복문에는 고유한 key가 필수!
            title={article.title}
            createdAt={article.createdAt}
          />
        ))}
      </section>
      <section className="flex flex-col gap-4 mb-[90px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2lg text-gray-800 font-bold">게시글</h2>
          <Btn text="글쓰기" />
        </div>
        <div className="flex justify-between">
          <div className="flex rounded-xl bg-gray-100 w-[288px] pr-[20px] pl-[16px] py-[9px]">
            <Image
              alt="검색"
              src="/ic_search.svg"
              width={24}
              height={24}
              className="max-w-none"
            />
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="w-[228px] text-lg text-gray-400"
            />
          </div>
          <Dropdown />
        </div>
        <div className="flex flex-col gap-6">
          {mookArticle.map((article, index) => (
            <ArticleCard
              key={index} // 리액트 반복문에는 고유한 key가 필수!
              title={article.title}
              createdAt={article.createdAt}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
