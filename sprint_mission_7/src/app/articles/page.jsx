"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [debouncedKeyword, sort]);

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

  const fetchArticlesData = useCallback(
    async (pageNum) => {
      try {
        setIsFetching(true);
        const data = await getAllArticles(debouncedKeyword, pageNum, sort);

        if (data && data.success) {
          const { data: listData, pagination } = data;

          if (pageNum === 1) {
            setArticles(listData);
          } else {
            setArticles((prev) => [...prev, ...listData]);
          }

          if (pagination && pagination.page >= pagination.totalPages) {
            setHasMore(false);
          } else if (listData.length < 10) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("게시글 데이터 로딩 실패", error.message);
      } finally {
        setIsFetching(false);
      }
    },
    [debouncedKeyword, sort],
  );

  useEffect(() => {
    fetchArticlesData(page);
  }, [page, fetchArticlesData]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
        {hasMore && articles.length > 0 && (
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className="mt-4 w-full h-11 border border-gray-300 rounded-xl text-md font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer flex justify-center items-center disabled:bg-gray-100"
          >
            {isFetching ? "불러오는 중... " : "게시글 더보기 "}
          </button>
        )}
      </section>
    </main>
  );
}
