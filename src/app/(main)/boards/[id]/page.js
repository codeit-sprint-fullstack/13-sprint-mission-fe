import ArticleDetail from "../_components/ArticleDetail";

export default async function DetailPage({ params }) {
  const { id } = await params;

  return <ArticleDetail id={id} />;
}
