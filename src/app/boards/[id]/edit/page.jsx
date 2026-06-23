import PostForm from "@/components/PostForm";
import { API_BASE_URL, FORM_MODE } from "@/constants/article";

async function getArticle(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다");
  return res.json();
}

export default async function EditBoardPage({ params }) {
  const { id  } = await params;
  const article = await getArticle(id);

  return (
    <PostForm
    mode={FORM_MODE.EDIT}
    articleId={article.id}
    initialData={{ title: article.title, content: article.content }}
   />
  );
}