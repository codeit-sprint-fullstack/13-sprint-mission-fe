import { BestCard, type Article } from "@/entities/article";

const BEST_ITEM_CLASS = ["", "hidden md:block", "hidden lg:block"];

export default function BestArticleSection({ articles }: { articles: Article[] }) {
  return (
    <div>
      <h2 className="font-bold text-base md:text-lg lg:text-xl">베스트 게시글</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {articles.map((article, index) => (
          <div key={article.id} className={BEST_ITEM_CLASS[index]}>
            <BestCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
