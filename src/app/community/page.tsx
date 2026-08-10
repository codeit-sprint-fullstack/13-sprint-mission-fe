"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getArticles } from "@/app/lib/api";
import BestArticleCard from "@/app/components/ui/BestArticleCard";
import ArticleListItem from "@/app/components/ui/ArticleListItem";
import SearchBar from "@/app/components/ui/SearchBar";
import SortDropdown from "@/app/components/ui/SortDropdown";
import type { Article } from "@/app/lib/types";

export default function CommunityPage() {
  return (
    <Suspense>
      <CommunityContent />
    </Suspense>
  );
}

function CommunityContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "recent");
  const [loading, setLoading] = useState(true);

  const LIMIT = 10;

  useEffect(() => {
    getArticles({ sort: "recent", limit: 3, page: 1 }).then((res) =>
      setBestArticles(res.list ?? [])
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    getArticles({ search: search || undefined, sort, page, limit: LIMIT }).then(
      (res) => {
        if (!cancelled) {
          setArticles(res.list ?? []);
          setTotalPages(Math.ceil((res.totalCount ?? 0) / LIMIT));
          setLoading(false);
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [search, sort, page]);

  const updateURL = (newSearch: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newSort !== "recent") params.set("sort", newSort);
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`);
  };

  const handleSearch = (v: string) => {
    setLoading(true);
    setSearch(v);
    setPage(1);
    updateURL(v, sort);
  };

  const handleSort = (v: string) => {
    setLoading(true);
    setSort(v);
    setPage(1);
    updateURL(search, v);
  };

  const handlePage = (p: number) => {
    setLoading(true);
    setPage(p);
  };
  // console.log(articles);
  return (
    <div className="max-w-5xl mx-auto">
      {/* ── Best Articles ── */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-secondary-900 mb-4">
          베스트 게시글
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ── Article List ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-secondary-900">게시글</h2>
          <button
            onClick={() => router.push("/community/new")}
            className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg transition-colors"
          >
            글쓰기
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={handleSearch} />
          <SortDropdown value={sort} onChange={handleSort} />
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-secondary-400">
            불러오는 중...
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center text-sm text-secondary-400">
            {search
              ? `"${search}"에 대한 게시글이 없습니다.`
              : "게시글이 없습니다."}
          </div>
        ) : (
          <div>
            {articles.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-secondary-200 rounded-lg disabled:opacity-40 hover:bg-secondary-50 transition-colors"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2
              )
              .reduce<(number | string)[]>((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                typeof p === "string" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-secondary-400 text-sm"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      page === p
                        ? "bg-primary text-white"
                        : "border border-secondary-200 hover:bg-secondary-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() => handlePage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-secondary-200 rounded-lg disabled:opacity-40 hover:bg-secondary-50 transition-colors"
            >
              다음
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
