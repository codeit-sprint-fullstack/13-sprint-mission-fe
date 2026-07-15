import { Suspense } from "react";
import Link from "next/link";

import ArticlesTitle from "@/components/articles/ArticlesTitle";
import BestArticles from "@/components/articles/BestArticles";
import ArticlesList from "@/components/articles/ArticlesList";
import FilterBar from "@/components/articles/FilterBar";
import Button from "@/components/common/Button";
import LoadingDisplay from "@/components/ui/LoadingDisplay";
import PageContainer from "@/components/common/PageContainer";
import { getAllArticles } from "@/lib/actions/articles";

export const metadata = {
  title: "자유 게시판",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function ArticlesPage({ searchParams }) {
  const { search = "", order = "recent", page = 1 } = await searchParams;

  const articlesData = await getAllArticles({
    pageSize: 100, // TODO: 페이지네이션 개발 시 데이터 수정 필요
    search,
    order,
    page: Number(page),
  });

  return (
    <PageContainer>
      <section className='mt-[16px] md:mt-[24px] mb-[90px] md:mb-[200px]'>
        {/* 베스트 게시글 */}
        <Suspense fallback={<LoadingDisplay />}>
          <BestArticles className='mb-4 md:mb-6' />
        </Suspense>

        {/* 게시글 */}
        <section>
          <div className='flex justify-between items-center mb-4 md:mb-12 lg:mb-6'>
            <ArticlesTitle title='게시글' />
            <Button as={Link} href='/articles/new'>
              글쓰기
            </Button>
          </div>

          {/* 필터바: 검색 + 정렬 */}
          <FilterBar search={search} order={order} />

          {/* 게시글 */}
          <Suspense fallback={<LoadingDisplay />}>
            <ArticlesList articles={articlesData} />
          </Suspense>
        </section>
      </section>
    </PageContainer>
  );
}
