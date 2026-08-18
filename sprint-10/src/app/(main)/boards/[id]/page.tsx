import Link from "next/link";
import ArticleSection from "./_components/ArticleSection";
import ArticleCommentSection from "./_components/ArticleCommentSection";

export default async function ArticleDetailPage({ params }: PageProps<"/boards/[id]">) {
  const { id } = await params;

  return (
    <main className="mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl mt-6 flex flex-col gap-6 pb-10">
      <ArticleSection articleId={id} />
      <ArticleCommentSection articleId={id} />

      <div className="flex justify-center">
        <Link
          href="/boards"
          className="flex items-center gap-2 bg-primary-100 hover:bg-primary-200 text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          목록으로 돌아가기
          <span>↩</span>
        </Link>
      </div>
    </main>
  );
}
