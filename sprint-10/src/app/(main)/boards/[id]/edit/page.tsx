import { notFound } from "next/navigation";
import { articleApi } from "@/entities/article";
import { PostForm } from "@/features/post-form";

export default async function EditBoardPage({ params }: PageProps<"/boards/[id]/edit">) {
  const { id } = await params;
  const article = await articleApi.getArticle(id).catch(() => null);

  if (!article) notFound();

  return (
    <main className="mx-4 mt-4">
      <PostForm
        articleId={id}
        initialTitle={article.title}
        initialContent={article.content}
        initialImages={article.images}
      />
    </main>
  );
}
