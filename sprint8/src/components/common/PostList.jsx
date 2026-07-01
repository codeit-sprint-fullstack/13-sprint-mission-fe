"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { getPosts } from "@/lib/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(async () => {
        const data = await getPosts({ orderBy, pageSize: 10, keyword });
        setPosts(data.list ?? []);
      });
    }, 500); // 0.5초 디바운스

    return () => clearTimeout(timer);
  }, [keyword, orderBy]);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">게시글</h2>
        <Link
          href="/write"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex justify-between items-center mb-3 gap-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 상품을 입력해주세요"
          className="flex-1 bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-500 outline-none focus:ring-1 focus:ring-blue-400"
        />
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-500 outline-none"
        >
          <option value="recent">최신순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>

      {/* 로딩 중에도 기존 목록 유지, 살짝 흐리게만 처리 */}
      <div
        className={`rounded-xl overflow-hidden bg-gray-50 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
      >
        {posts.length === 0 && !isPending ? (
          <p className="text-center text-sm text-gray-400 py-10">
            검색 결과가 없어요
          </p>
        ) : (
          posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <article className="flex justify-between items-center px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {post.title}
                    </h3>
                    <div className="mt-1 text-xs text-gray-400">
                      {post.writer.nickname} |{" "}
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400 flex-shrink-0 ml-4">
                  ❤️{" "}
                  <span>
                    {post.likeCount >= 9999 ? "9999+" : post.likeCount}
                  </span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
