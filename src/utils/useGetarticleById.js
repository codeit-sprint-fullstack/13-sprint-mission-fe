import { getArticle } from "@/lib/api/articles.js";
import { useEffect, useState } from "react";

export default function useGetarticleById(id) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const { article } = await getArticle(id);
        setArticle(article);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [id]);

  return article;
}
