import ArticleForm from "@/app/articles/_components/ArticleForm";
import PageContainer from "@/components/common/PageContainer";
import { getArticleById } from "@/lib/services/articleApi";
import React from "react";

export const metadata = {
  title: "자유 게시판 게시글 수정",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function EditArticlePage({ params }) {
  const { id } = await params;
  const article = await getArticleById(id); // 서버에서 초기 데이터 fetch

  return (
    <PageContainer>
      <section className='mt-[16px] lg:mt-[24px] mb-[50px] lg:mb-[190px]'>
        <ArticleForm defaultValue={article.data} articleId={id} />
      </section>
    </PageContainer>
  );
}
