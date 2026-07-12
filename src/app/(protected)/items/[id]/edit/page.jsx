import { notFound } from "next/navigation";

import ProductForm from "@/components/products/ProductForm";
import PageContainer from "@/components/common/PageContainer";
import UnauthorizedModal from "@/components/common/Modal/UnauthorizedModal";
import { getProductById } from "@/lib/services/productApi";
import { getCurrentUserId } from "@/lib/actions/auth";

export const metadata = {
  title: "중고마켓 상품 수정",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id); // 서버에서 초기 데이터 fetch

  if (!product) {
    notFound();
  }

  // 등록자 본인이 아니면 수정 페이지 접근 차단
  const userId = await getCurrentUserId();
  if (product.ownerId !== userId) {
    return (
      <UnauthorizedModal
        redirectTo={`/items/${id}`}
        description='본인이 등록한 상품이 아닙니다.'
      />
    );
  }

  return (
    <PageContainer>
      <section className='mt-[16px] lg:mt-[24px] mb-[50px] lg:mb-[190px]'>
        <ProductForm defaultValue={product} productId={id} />
      </section>
    </PageContainer>
  );
}
