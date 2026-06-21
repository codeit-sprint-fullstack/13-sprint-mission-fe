"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";

export default function FreeBoardPage() {
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const DEFAULT_IMAGE = "/Frame 2609885.png";
  const MOCK_NICKNAME = "총명한 판다";
  const MOCK_LIKES = "9999+";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/articles");
        if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

        const data = await response.json();


        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.data)) {
          setPosts(data.data);
        } else if (data && Array.isArray(data.list)) {
          setPosts(data.list);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("게시글 로딩 에러:", error);
        setPosts([]); 
    };

    fetchPosts();
  }, []);


  const safePosts = Array.isArray(posts) ? posts : [];


  const filteredPosts = safePosts.filter((post) =>
    post?.title?.toLowerCase().includes(searchKeyword.toLowerCase()),
  );


  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );


  const bestPosts = sortedPosts.slice(0, 3);


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">베스트 게시글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestPosts.map((post) => (
            <Link href={`/board/${post.id}`} key={`best-${post.id}`}>
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative bg-white">
                <div>
                  <div className="leading-none pl-4">
                    <Image
                      src="/img_badge.png"
                      alt="베스트 게시글 배지"
                      width={102}
                      height={30}
                      className="object-contain"
                    />
                  </div>

                  <div className="p-4 pt-3 flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800 line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 ml-4 relative">
                      <Image
                        src={post.image || DEFAULT_IMAGE}
                        alt="게시글 썸네일"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>


                <div className="flex justify-between items-center text-sm text-gray-500 px-4 pb-4 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      {post.author || MOCK_NICKNAME}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-red-400">♡</span>{" "}
                      {post.likeCount || MOCK_LIKES}
                    </span>
                  </div>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">게시글</h2>
          <Link href="/board/write">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              글쓰기
            </button>
          </Link>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="검색할 제목을 입력해주세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-gray-100 border border-transparent focus:border-blue-500 rounded-lg py-3 px-10 outline-none transition-colors"
            />

            <Image
              src="/ic_search.png"
              alt="검색 아이콘"
              width={24}
              height={24}
              className="absolute left-3 top-3.5 opacity-40" 
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 rounded-lg py-3 px-4 outline-none focus:border-blue-500 min-w-[120px]"
          >
            <option value="latest">최신순</option>
          </select>
        </div>

        <div className="border-t border-gray-200 flex flex-col gap-6 pt-2">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <Link href={`/board/${post.id}`} key={post.id}>
                <div className="py-5 border-b border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer px-2 rounded-md">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-11 line-clamp-1">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Image
                        src="/ic_profile.png"
                        alt="작성자 프로필"
                        width={24}
                        height={24}
                      />
                      <span className="font-medium text-gray-700">
                        {post.author || MOCK_NICKNAME}
                      </span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={post.image || DEFAULT_IMAGE}
                        alt="게시글 썸네일"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="text-red-400">♡</span>{" "}
                      {post.likeCount || MOCK_LIKES}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
