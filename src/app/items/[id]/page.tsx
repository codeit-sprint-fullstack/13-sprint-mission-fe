import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getProductByIdAction } from "@/lib/actions/products";
import { getAllCommentAction } from "@/lib/actions/productComments";

import PageContainer from "@/components/common/PageContainer";
import ProductInfo from "@/components/products/ProductInfo";
import Comments from "@/components/products/Comment/Comments";

export const metadata = {
  title: "상품 상세 페이지",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = new QueryClient();
  const { id } = await params;

  const product = await getProductByIdAction(id);
  if (!product) notFound();

  /**
   * Prefetching
   * ["product", id] : 상품 상세 데이터
   * ["comments", id] : 댓글 목록 초기 데이터
   */
  await Promise.all([
    queryClient.setQueryData(["product", id], product),
    queryClient.prefetchQuery({
      queryKey: ["comment", id],
      queryFn: () => getAllCommentAction({ productId: id }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <section className='mt-[24px] md:mt-[26px] lg:mt-[34px] mb-[50px] lg:mb-[190px]'>
          {/* 상품 헤더 */}
          <ProductInfo productId={id} />

          {/* 댓글 섹션 */}
          <Comments productId={id} />
        </section>
      </PageContainer>
    </HydrationBoundary>
  );
}
