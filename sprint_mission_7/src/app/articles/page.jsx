"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Btn from "@/components/common/Btn";
import Dropdown from "@/components/common/SortDropdown";
import ArticleCard from "./components/ArticleCard";
import { BestArticleCard } from "./components/BestArticleCard";
import { getAllArticles } from "@/api/article";
import Link from "next/link";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);
  useEffect(() => {
    async function fetchBestArticles() {
      try {
        const data = await getAllArticles("", 1, "latest");
        if (data && data.success && data.data.length > 0) {
          setBestArticles(data.data);
        }
      } catch (error) {
        console.error("베스트 데이터 로딩 실패", error.message);
      }
    }
    fetchBestArticles();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllArticles(debouncedKeyword, 1, sort);

        if (data && data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("게시글 데이터 로딩 실패", error.message);
      }
    }
    fetchData();
  }, [debouncedKeyword, sort]);
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <main className="mt-[86px] mx-auto flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-2lg text-gray-800 font-bold">베스트 게시글</h2>
        {bestArticles.slice(0, 1).map((article, index) => (
          <BestArticleCard
            key={index}
            id={article.id}
            title={article.title.replace(/\.$/, "")}
            createdAt={new Date(article.createdAt)
              .toLocaleDateString()
              .replace(/\.$/, "")}
          />
        ))}
      </section>
      <section className="flex flex-col gap-4 mb-[90px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2lg text-gray-800 font-bold">게시글</h2>
          <Link href="/articles/new">
            <Btn text="글쓰기" />
          </Link>
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
              value={keyword}
              onChange={handleSearchChange}
              placeholder="검색할 상품을 입력해주세요"
              className="w-[228px] text-lg text-gray-400"
            />
          </div>
          <Dropdown onSortChange={setSort} />
        </div>
        <div className="flex flex-col gap-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              id={article.id}
              title={article.title.replace(/\.$/, "")}
              createdAt={new Date(article.createdAt)
                .toLocaleDateString()
                .replace(/\.$/, "")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
