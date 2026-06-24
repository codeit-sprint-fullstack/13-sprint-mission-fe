"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "./api";
import { formatDate, getDisplayMeta } from "./meta";

const defaultImage = "/images/default-product.svg";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const params = new URLSearchParams({ sort, limit: "20" });
      if (query.trim()) {
        params.set("keyword", query.trim());
      }

      const response = await fetch(
        `${apiUrl("/articles")}?${params.toString()}`,
        { cache: "no-store" },
      );
      const data = await response.json();
      setPosts(data.data || []);
      setLoading(false);
    }

    fetchPosts();
  }, [query, sort]);

  useEffect(() => {
    async function fetchBestPosts() {
      const response = await fetch(
        `${apiUrl("/articles")}?sort=latest&limit=3`,
        { cache: "no-store" },
      );
      const data = await response.json();
      setBestPosts(data.data || []);
    }

    fetchBestPosts();
  }, []);

  const emptyMessage = useMemo(() => {
    if (loading) {
      return "게시글을 불러오는 중입니다.";
    }

    return query.trim() ? "검색 결과가 없습니다." : "등록된 게시글이 없습니다.";
  }, [loading, query]);

  return (
    <section>
      <div className="mx-auto max-w-[1040px] px-5 pt-7 pb-16 sm:px-6">
        <section aria-labelledby="best-heading">
          <h2 id="best-heading" className="mb-5 text-xl font-bold">
            베스트 게시글
          </h2>
          <div className="mb-[46px] grid grid-cols-1 gap-[22px] md:grid-cols-3">
            {bestPosts.map((post) => (
              <BestCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section aria-labelledby="posts-heading">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="posts-heading" className="text-xl font-bold">
              게시글
            </h2>
            <Link
              href="/freeboard/new"
              className="inline-flex h-[42px] min-w-[72px] items-center justify-center rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600"
            >
              글쓰기
            </Link>
          </div>

          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_112px]">
            <label className="flex h-[42px] items-center gap-2 rounded-lg bg-gray-100 px-4 text-gray-400">
              <span aria-hidden="true">⌕</span>
              <input
                className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="검색할 상품을 입력해주세요"
              />
            </label>
            <select
              className="h-[42px] rounded-lg border border-gray-200 bg-white px-3 text-gray-900 outline-none"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="게시글 정렬"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>

          <div className="border-b border-gray-200">
            {posts.length > 0 ? (
              posts.map((post) => <PostRow key={post.id} post={post} />)
            ) : (
              <p className="my-7 text-center text-gray-400">{emptyMessage}</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

function BestCard({ post }) {
  const meta = getDisplayMeta(post.id);

  return (
    <Link
      className="relative flex min-h-[136px] flex-col gap-[18px] rounded-lg bg-gray-50 px-5 pt-[42px] pb-[18px]"
      href={`/freeboard/${post.id}`}
    >
      <span className="absolute top-0 left-5 inline-flex h-7 min-w-[82px] items-center justify-center rounded-b-xl bg-blue-500 text-[13px] font-extrabold text-white">
        🏅 Best
      </span>
      <div className="grid grid-cols-[1fr_56px] items-center gap-4">
        <h3 className="text-[17px] leading-[1.55] font-bold">{post.title}</h3>
        <img
          className="size-14 rounded-md border border-gray-200 bg-white object-cover"
          src={post.imageUrl || defaultImage}
          alt=""
        />
      </div>
      <div className="flex items-center gap-2 text-[13px] text-gray-400">
        <span>{meta.nickname}</span>
        <span>❤️ {meta.likes}</span>
        <time className="ml-auto">{formatDate(post.createdAt)}</time>
      </div>
    </Link>
  );
}

function PostRow({ post }) {
  const meta = getDisplayMeta(post.id);

  return (
    <Link
      className="grid min-h-[132px] grid-cols-1 gap-5 border-t border-gray-200 py-[22px] sm:grid-cols-[1fr_88px] sm:gap-6"
      href={`/freeboard/${post.id}`}
    >
      <div className="flex min-w-0 flex-col justify-between gap-5">
        <h3 className="text-[17px] leading-[1.55] font-bold">{post.title}</h3>
        <div className="flex items-center gap-2 text-[13px] text-gray-400">
          <span className="grid size-5 place-items-center rounded-full bg-gray-200 text-xs">
            🐼
          </span>
          <span>{meta.nickname}</span>
          <time>{formatDate(post.createdAt)}</time>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between text-sm text-gray-400 sm:flex-col sm:items-end">
        <img
          className="size-14 rounded-md border border-gray-200 bg-white object-cover"
          src={post.imageUrl || defaultImage}
          alt=""
        />
        <span>❤️ {meta.likes}</span>
      </div>
    </Link>
  );
}
