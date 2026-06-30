import { notFound } from "next/navigation";
import { getArticle } from "@/services/articleService";
import PostForm from "@/app/(main)/boards/create/components/PostForm";

export default async function EditBoardPage({ params }) {
  const { id } = await params;
  const article = await getArticle(id).catch(() => null);

  if (!article) notFound();

  return (
    <main className="mx-4 mt-4">
      <PostForm
        articleId={id}
        initialTitle={article.title}
        initialContent={article.content}
      />
    </main>
  );
}
