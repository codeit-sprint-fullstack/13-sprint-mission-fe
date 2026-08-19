"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getArticles, addArticleLike, removeArticleLike } from "@/api/articles";
import type { ArticleListItem, ArticleOrderBy } from "@/types/article";
import PostList from "./_components/PostList";
import SearchBar from "./_components/searchBar";
import BestPostList from "./_components/BestPostList";

export default function Freeboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const orderBy: ArticleOrderBy = searchParams.get("orderBy") === "like" ? "like" : "recent";

  const [bestPosts, setBestPosts] = useState<ArticleListItem[]>([]);
  const [posts, setPosts] = useState<ArticleListItem[]>([]);

  useEffect(() => {
    getArticles({ page: 1, pageSize: 3 }).then((data) => setBestPosts(data.list));
  }, []);

  useEffect(() => {
    getArticles({ keyword, orderBy, page: 1, pageSize: 10 }).then((data) => setPosts(data.list));
  }, [keyword, orderBy]);

  const updateSearchParams = (updates: Partial<{ keyword: string; orderBy: ArticleOrderBy }>) => {
    const params = new URLSearchParams(searchParams.toString());
    const next = { keyword, orderBy, ...updates };
    if (next.keyword) params.set("keyword", next.keyword);
    else params.delete("keyword");
    params.set("orderBy", next.orderBy);
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleLike = async (id: number, isLiked: boolean) => {
    try {
      const updated = isLiked ? await removeArticleLike(id) : await addArticleLike(id);

      const update = (list: ArticleListItem[]) =>
        list.map((p) => (p.id === id ? { ...p, isLiked: !isLiked, likeCount: updated.likeCount } : p));
      setBestPosts((prev) => update(prev));
      setPosts((prev) => update(prev));
    } catch {}
  };

  return (
    <div>
      <section>
        <h2 className="text-2lg mb-4 font-bold text-gray-900 md:mb-6 md:text-xl">베스트 게시글</h2>
        <BestPostList posts={bestPosts} onToggleLike={toggleLike} />
      </section>

      <section>
        <div className="mt-6 flex items-center justify-between self-stretch lg:mt-10">
          <h2 className="text-2lg font-bold text-gray-800 md:text-xl">게시글</h2>
          <Link href="/freeboard/write">
            <button className="btn_small_40">글쓰기</button>
          </Link>
        </div>
        <div className="my-4 md:my-12 xl:my-6">
          <SearchBar
            keyword={keyword}
            onKeywordChange={(value) => updateSearchParams({ keyword: value })}
            orderBy={orderBy}
            onOrderChange={(value) => updateSearchParams({ orderBy: value })}
          />
        </div>
        <div className="h-165 overflow-y-auto md:h-179 xl:h-169">
          <PostList posts={posts} onToggleLike={toggleLike} />
        </div>
      </section>
    </div>
  );
}