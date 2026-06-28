import Link from "next/link";
import { getArticle, getArticleComments } from "@/services/articleService";
import {
  createComment,
  updateComment,
  deleteComment,
} from "./actions";
import ArticleSection from "./components/ArticleSection";
import CommentSection from "@/components/ui/CommentSection";

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;

  const [article, comments] = await Promise.all([
    getArticle(id),
    getArticleComments(id),
  ]);

  return (
    <main className="mx-4 mt-4 flex flex-col gap-6">
      <ArticleSection article={article} />
      <CommentSection
        initialComments={comments}
        createAction={createComment.bind(null, id)}
        updateAction={updateComment}
        deleteAction={deleteComment}
      />

      <div className="flex justify-center pb-10">
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
