"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PostList from "./_components/PostList";
import SearchBar from "./_components/searchBar";
import BestPostList from "./_components/BestPostList";
import Link from "next/link";
import { fetchInstance } from "@/lib/fetchInstance";

export default function Freeboard() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const orderBy = searchParams.get("orderBy") || "recent";

  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchInstance(`/articles?page=1&pageSize=3`).then((data) =>
      setBestPosts(data?.list ?? [])
    );
  }, []);

  useEffect(() => {
    fetchInstance(
      `/articles?keyword=${keyword}&orderBy=${orderBy}&page=1&pageSize=10`
    ).then((data) => setPosts(data?.list ?? []));
  }, [keyword, orderBy]);

  const toggleLike = async (id, isLiked) => {
    try {
      const updated = isLiked
        ? await fetchInstance(`/articles/${id}/like`, { method: "DELETE" })
        : await fetchInstance(`/articles/${id}/like`, { method: "POST" });

      const update = (list) =>
        list.map((p) =>
          p.id === id
            ? { ...p, isLiked: !isLiked, likeCount: updated.likeCount }
            : p
        );
      setBestPosts((prev) => update(prev));
      setPosts((prev) => update(prev));
    } catch {}
  };

  return (
    <div>
      <section>
        <h2 className="text-2lg mb-4 font-bold text-gray-900 md:mb-6 md:text-xl">
          베스트 게시글
        </h2>
        <BestPostList posts={bestPosts} onToggleLike={toggleLike} />
      </section>

      <section>
        <div className="mt-6 flex items-center justify-between self-stretch lg:mt-10">
          <h2 className="text-2lg font-bold text-gray-800 md:text-xl">
            게시글
          </h2>
          <Link href="/freeboard/write">
            <button className="btn_small_40">글쓰기</button>
          </Link>
        </div>
        <div className="my-4 md:my-12 xl:my-6">
          <SearchBar keyword={keyword} orderBy={orderBy} />
        </div>
        <div className="h-165 overflow-y-auto md:h-179 xl:h-169">
          <PostList posts={posts} onToggleLike={toggleLike} />
        </div>
      </section>
    </div>
  );
}
