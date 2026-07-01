import { request } from "@/lib/api";
import ArticleForm from "../../_components/ArticleForm";

export default async function EditPage({ params }) {
  const { id } = await params;

  const article = await request(`/articles/${id}`);
  return (
    <section className="w-full">
      <ArticleForm id={id} article={article} />
    </section>
  );
}
