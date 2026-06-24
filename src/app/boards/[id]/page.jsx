import { API_BASE_URL } from "@/constants/article";
import ArticleDetail from "@/components/ArticleDetail";

async function getArticle(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다");
  return res.json();
}

export default async function BoardDetailPage({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  return <ArticleDetail article={article} />;
}