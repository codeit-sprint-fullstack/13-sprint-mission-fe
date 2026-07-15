import ProductForm from "@/components/products/ProductForm";
import PageContainer from "@/components/common/PageContainer";

export const metadata = {
  title: "중고마켓 상품 등록",
  description:
    "판다마켓은 이웃과 함께하는 따뜻한 중고거래 커뮤니티 플랫폼입니다. 단순한 거래를 넘어 사용자들이 소통하고 정보를 나누는 공간을 지향합니다.",
};

export default function CreateProductPage() {
  return (
    <PageContainer>
      <section className='mt-[16px] lg:mt-[24px] mb-[50px] lg:mb-[190px]'>
        <ProductForm />
      </section>
    </PageContainer>
  );
}
