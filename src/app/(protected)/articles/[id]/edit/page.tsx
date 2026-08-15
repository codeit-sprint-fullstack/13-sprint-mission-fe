import { notFound } from "next/navigation";

import ArticleForm from "@/components/articles/ArticleForm";
import UnauthorizedModal from "@/components/common/Modal/UnauthorizedModal";
import PageContainer from "@/components/common/PageContainer";
import { getArticleById } from "@/lib/actions/articles";
import { getCurrentUserId } from "@/lib/actions/auth";

export const metadata = {
  title: "자유 게시판 게시글 수정",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id); // 서버에서 초기 데이터 fetch

  if (article.notFound) {
    notFound();
  }

  // 작성자 본인이 아니면 수정 페이지 접근 차단
  const userId = await getCurrentUserId();
  if (article.data.ownerId !== userId) {
    return (
      <UnauthorizedModal
        redirectTo={`/articles/${id}`}
        description='본인이 작성한 게시글이 아닙니다.'
      />
    );
  }

  return (
    <PageContainer>
      <section className='mt-[16px] lg:mt-[24px] mb-[50px] lg:mb-[190px]'>
        <ArticleForm defaultValue={article.data} articleId={id} />
      </section>
    </PageContainer>
  );
}
