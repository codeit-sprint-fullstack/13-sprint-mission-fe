"use client";

import React, { useEffect, useState } from "react";
import BestPostCard from "@/components/BestPostcard";
import PostRow from "@/components/PostRow";
import SortDropdown from "@/components/SortDropdown";
import Link from "next/link";

export default function BoardsPage() {
  const [bestPosts, setBestPosts] = useState([]);
  const [normalPosts, setNormalPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [orderBy, setOrderBy] = useState("recent");

  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:4000/articles?page=1&limit=20&sort=${orderBy}&keyword=${searchKeyword}`,
        );
        if (!response.ok) throw new Error("데이터 불러오기 실패");

        const resData = await response.json();
        const allArticles = resData.data || [];

        setBestPosts(allArticles.slice(0, 3));
        setNormalPosts(allArticles.slice(3));
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllPosts();
  }, [orderBy, searchKeyword]);

  const handleSortChange = (selectedText) => {
    if (selectedText === "최신순") {
      setOrderBy("recent");
    } else if (selectedText === "좋아요순") {
      setOrderBy("like");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchKeyword(searchInput);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6">
      <section className="mb-12">
        <h2 className="text-[20px] font-bold mb-6 text-[#111827]">
          베스트 게시글
        </h2>

        {isLoading && bestPosts.length === 0 ? (
          <div className="text-center py-10 ">로딩 중...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestPosts.map((post) => (
              <BestPostCard key={post.id} postData={post} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-[24px]">
          <h2 className="text-[20px] font-bold text-[#1F2937]">게시글</h2>
          <Link href="/boards/new">
            <button className="h-[42px] w-[88px] bg-[#3692FF] text-white text-[16px] rounded-[8px] cursor-pointer">
              글쓰기
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-[16px] w-full mb-[24px]">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              value={searchInput} // 💡 실시간 입력 바인딩
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-[40px] py-[9px] bg-[#F3F4F6] border-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm box-border"
            />
            {/* 돋보기 아이콘 */}
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2 ">
              <img
                src="/ic_search.png"
                alt="search"
                className="w-[24px] h-[24px] shrink-0 object-contain"
              />
            </div>
          </div>

          <SortDropdown onSortChange={handleSortChange} />
        </div>

        <div className="flex flex-col gap-[24px]">
          {isLoading && normalPosts.length === 0 ? (
            <div className="text-center py-10 ">로딩 중...</div>
          ) : normalPosts.length === 0 ? (
            <div className="text-center py-10 ">등록된 게시글이 없습니다.</div>
          ) : (
            normalPosts.map((post) => <PostRow key={post.id} post={post} />)
          )}
        </div>
      </section>
    </div>
  );
}
