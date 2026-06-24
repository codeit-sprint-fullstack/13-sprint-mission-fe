import { getArticles } from "@/lib/articles";
import BoardList from "@/components/BoardList";

export default async function HomePage() {
  const articles = await getArticles();
  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
      <BoardList articles={safeArticles} />
    </div>
  );
}
