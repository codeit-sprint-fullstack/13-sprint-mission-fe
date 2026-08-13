import { Link } from "react-router-dom";
import styled from "styled-components";
import heroImage from "../../assets/images/home/hero-image.png";
import feature1Image from "../../assets/images/home/feature1-image.png";
import feature2Image from "../../assets/images/home/feature2-image.png";
import feature3Image from "../../assets/images/home/feature3-image.png";
import bottomBannerImage from "../../assets/images/home/bottom-banner-image.png";

const Hero = styled.section`
  background: #cfe5ff;
`;

const HeroInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 72px;
  max-width: 1200px;
  min-height: 540px;
  margin: 0 auto;
  padding: 72px 24px 0;

  img { align-self: flex-end; width: min(58%, 720px); }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    gap: 32px;
    padding-top: 56px;
    text-align: center;
    img { width: 100%; }
  }
`;

const Headline = styled.h1`
  margin-bottom: 28px;
  color: var(--gray-800);
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.4;
`;

const MarketLink = styled(Link)`
  display: inline-block;
  padding: 16px 30px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const Features = styled.div`
  display: grid;
  gap: 80px;
  max-width: 1024px;
  margin: 0 auto;
  padding: 120px 24px;
`;

const Feature = styled.section`
  display: flex;
  align-items: center;
  gap: 64px;
  padding: 0 48px;
  border-radius: 16px;
  background: #fcfcfc;

  &:nth-child(even) { flex-direction: row-reverse; text-align: right; }
  img { width: 55%; }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    &, &:nth-child(even) { flex-direction: column; padding: 32px 24px 0; text-align: left; }
    img { width: 100%; }
  }
`;

const Eyebrow = styled.p`
  margin-bottom: 12px;
  color: var(--blue);
  font-size: 18px;
  font-weight: 700;
`;

const FeatureTitle = styled.h2`
  margin-bottom: 20px;
  color: var(--gray-800);
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.35;
`;

const Description = styled.p`
  color: var(--gray-500);
  font-size: 20px;
  line-height: 1.6;
`;

const BottomBanner = styled.section`
  background: #cfe5ff;
`;

const BottomInner = styled(HeroInner)`
  min-height: 500px;
  padding-top: 48px;
`;

function HomePage() {
  const features = [
    ["Hot item", "인기 상품을 확인해 보세요", "가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요.", feature1Image],
    ["Search", "구매를 원하는 상품을 검색하세요", "구매하고 싶은 물품은 검색해서 빠르게 찾아보세요.", feature2Image],
    ["Register", "판매를 원하는 상품을 등록하세요", "어떤 물건이든 간편하게 등록하고 판매해 보세요.", feature3Image],
  ];

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Headline>일상의 모든 물건을<br />거래해 보세요</Headline>
            <MarketLink to="/items">구경하러 가기</MarketLink>
          </div>
          <img src={heroImage} alt="판다마켓에서 거래하는 사람들" />
        </HeroInner>
      </Hero>
      <Features>
        {features.map(([eyebrow, title, description, image]) => (
          <Feature key={eyebrow}>
            <img src={image} alt="" />
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <FeatureTitle>{title}</FeatureTitle>
              <Description>{description}</Description>
            </div>
          </Feature>
        ))}
      </Features>
      <BottomBanner>
        <BottomInner>
          <Headline>믿을 수 있는<br />판다마켓 중고거래</Headline>
          <img src={bottomBannerImage} alt="판다마켓을 이용하는 사람들" />
        </BottomInner>
      </BottomBanner>
    </>
  );
}

export default HomePage;
