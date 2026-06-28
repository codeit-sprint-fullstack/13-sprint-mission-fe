import Link from "next/link";
import ArticleBestCard from "./_components/ArticleBestCard";
import ArticleCard from "./_components/ArticleCard";
import ArticleSortDropdown from "./_components/ArticleSortDropdown";
import ArticleSearchBar from "./_components/ArticleSearchBar";
import { Suspense } from "react";
import { request } from "../../../lib/api";

export default async function BoardsPage({ searchParams }) {
  const { query = "" } = await searchParams;

  const { list: bestArticles } = await request(
    "/articles?pageSize=3&orderBy=recent",
  );
  const { list: articles } = await request(`/articles?keyword=${query}`);

  return (
    <>
      <section className="w-full">
        <div className="max-w-page mx-auto px-4 md:px-6 py-10">
          <h2 className="text-title-md text-gray-900 mb-6">베스트 게시글</h2>
          <div className="grid grid-cols-3 gap-6">
            {bestArticles.map((article) => (
              <Link href={`/boards/${article.id}`} key={article.id}>
                <ArticleBestCard
                  title={article.title}
                  author={article.writer?.nickname}
                  likeCount={article.likeCount}
                  createdAt={article.createdAt}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="max-w-page mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-md text-gray-800">게시글</h2>
            <Link
              href="/boards/new"
              className="bg-brand-blue text-white text-btn px-6 h-[42px] rounded-lg flex items-center"
            >
              글쓰기
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <Suspense
              fallback={<div className="h-10 animate-pulse bg-gray-100" />}
            >
              <ArticleSearchBar />
              <ArticleSortDropdown />
            </Suspense>
          </div>
          {articles.map((article) => (
            <Link href={`/boards/${article.id}`} key={article.id}>
              <ArticleCard
                title={article.title}
                author={article.writer?.nickname}
                likeCount={article.likeCount}
                createdAt={article.createdAt}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
