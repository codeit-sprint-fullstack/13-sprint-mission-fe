import { getArticles } from "@/lib/mockArticles";
import ArticleItem from "@/components/ArticleItem";
import Link from "next/link";

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      {/* 게시글 목록 영역 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">게시글</h2>
          <Link
            href="/boards/add"
            className="rounded-lg bg-primary-100 px-5 py-2 text-sm font-semibold text-white"
          >
            글쓰기
          </Link>
        </div>

        <div className="flex flex-col">
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}