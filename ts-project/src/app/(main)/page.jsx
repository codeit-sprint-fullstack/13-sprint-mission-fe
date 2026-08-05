import Link from "next/link";

import Hero from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="flex-1">
      <Hero
        text="일상의 모든 물건을 거래해 보세요"
        img={"/images/hero-top.png"}
      >
        <Link href="/items">
          <Button
            variant="circle"
            className="rounded-[40px] bg-primary px-[124px] py-[16px] text-[20px] font-semibold text-secondary-100"
          >
            구경하러 가기
          </Button>
        </Link>
      </Hero>

      <div className="flex flex-col gap-[140px] py-[140px]">
        <Link href="/items">
          <Card
            tag="Hot Item"
            title="인기 상품을 확인해 보세요"
            text="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
            src={"/images/card1.png"}
          />
        </Link>

        <Link href="/items">
          <Card
            tag="Search"
            title="구매를 원하는 상품을 검색하세요"
            text="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
            flip
            src={"/images/card2.png"}
          />
        </Link>

        <Link href="/items/register">
          <Card
            tag="Register"
            title="판매를 원하는 상품을 등록하세요"
            text="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
            src={"/images/card3.png"}
          />
        </Link>
      </div>

      <Hero
        text="믿을 수 있는 판다마켓 중고 거래"
        img={"/images/hero-bottom.png"}
      />
    </div>
  );
}
