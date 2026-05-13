import HeroTop from "../components/landing/HeroTop.jsx";
import FeatureSection from "../components/landing/FeatureSection.jsx";
import HeroBottom from "../components/landing/HeroBottom.jsx";
import section1Image from "../assets/images/Img_home_01.png";
import section2Image from "../assets/images/Img_home_02.png";
import section3Image from "../assets/images/Img_home_03.png";

export default function LandingPage() {
  return (
    <>
      <HeroTop />
      <FeatureSection
        title="Hot item"
        heading={
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
        imgSrc={section1Image}
        imgAlt="섹션1이미지"
      />
      <FeatureSection
        title="Search"
        heading={
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
        imgSrc={section2Image}
        imgAlt="섹션2이미지"
        reverse
      />
      <FeatureSection
        title="Register"
        heading={
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
        imgSrc={section3Image}
        imgAlt="섹션3이미지"
      />
      <HeroBottom />
    </>
  );
}
