import ImgHomeTop from "@/assets/svg/Img_home_top.svg";
import ImgHome01 from "@/assets/svg/Img_home_01.svg";
import ImgHome02 from "@/assets/svg/Img_home_02.svg";
import ImgHome03 from "@/assets/svg/Img_home_03.svg";
import ImgHomeBottom from "@/assets/svg/Img_home_bottom.svg";
import Banner from "./_components/Banner";
import IntroCard from "./_components/IntroCard";

export default function Home() {
  return (
    <>
      <Banner
        title={
          <>
            일상의 모든 물건을
            <br />
            거래해 보세요
          </>
        }
        imageSrc={ImgHomeTop}
        imageAlt="Panda Market banner"
        cta={{ href: "/items", label: "구경하러 가기" }}
      />

      <div className="flex flex-col items-center justify-center">
        <IntroCard
          eyebrow="Hot item"
          title={
            <>
              인기 상품을
              <br />
              확인해 보세요
            </>
          }
          description={
            <>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </>
          }
          imageSrc={ImgHome01}
          imageAlt="인기상품 확인 이미지"
        />

        <IntroCard
          reverse
          eyebrow="Search"
          title={
            <>
              구매를 원하는
              <br />
              상품을 검색하세요
            </>
          }
          description={
            <>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </>
          }
          imageSrc={ImgHome02}
          imageAlt="검색하기 이미지"
        />

        <IntroCard
          eyebrow="Register"
          title={
            <>
              판매를 원하는
              <br />
              상품을 등록하세요
            </>
          }
          description={
            <>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </>
          }
          imageSrc={ImgHome03}
          imageAlt="판매등록 이미지"
        />
      </div>

      <Banner
        title={
          <>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </>
        }
        imageSrc={ImgHomeBottom}
        imageAlt="Panda Market banner"
      />
    </>
  );
}
