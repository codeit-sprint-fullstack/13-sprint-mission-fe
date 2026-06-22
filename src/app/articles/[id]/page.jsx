import BackButton from "@/app/articles/[id]/_components/BackButton.jsx";
import DetailSection from "@/app/articles/[id]/_components/DetailSection.jsx";
import { getArticle } from "@/lib/api/articles.js";
import clsx from "clsx";

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;
  const { article } = await getArticle(id);
  return (
    <>
      <DetailSection article={article} id={id} />
      <BackButton className={clsx("mb-2 flex justify-self-center")} />
    </>
  );
}
