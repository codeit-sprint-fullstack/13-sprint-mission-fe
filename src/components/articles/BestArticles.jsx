import { getAllArticles } from "@/lib/actions/articles";

import ArticlesTitle from "./ArticlesTitle";
import BestArticleList from "./BestArticleList";

export const revalidate = 60; // ISR: 60초

export default async function BestArticles() {
  const articlesData = await getAllArticles({
    pageSize: 3,
    order: "like",
  });

  return (
    <section className='mb-6 lg:mb-10'>
      <ArticlesTitle title='베스트 게시글' className='mb-[16px] md:mb-[24px]' />

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6'>
        <BestArticleList articles={articlesData} />
      </ul>
    </section>
  );
}
