import facebookIc from "@/assets/images/icons/ic_facebook.svg";
import instagramIc from "@/assets/images/icons/ic_instagram.svg";
import twitterIc from "@/assets/images/icons/ic_twitter.svg";
import youtubeIc from "@/assets/images/icons/ic_youtube.svg";
import bottomHeroImage from "@/assets/images/sections/bottom_hero_image.png";
import topHeroImage from "@/assets/images/sections/hero_image.png";
import sectionImage1 from "@/assets/images/sections/section_image_1.png";
import sectionImage2 from "@/assets/images/sections/section_image_2.png";
import sectionImage3 from "@/assets/images/sections/section_image_3.png";

// BASE URL
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 그룹 사이즈 (페이지네이션 넘버링 개수)
export const GROUP_SIZE = 5;

// 상품 리스트 반응형 그리드 사이즈
export const PAGE_SIZE_CONFIG = {
  md: { mobile: 4, tablet: 6, desktop: 10 },
  lg: { mobile: 1, tablet: 2, desktop: 4 },
};

// 상품 필터 옵션
export const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

// 소셜 데이터
export const SOCIAL_CONFIG = [
  {
    id: "facebook",
    name: "Facebook",
    icon: facebookIc,
    url: "https://www.facebook.com",
    alt: "페이스북 공식 페이지로 이동",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: instagramIc,
    url: "https://www.instagram.com/",
    alt: "인스타그램 공식 계정으로 이동",
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    icon: twitterIc,
    url: "https://x.com/",
    alt: "트위터(X) 공식 계정으로 이동",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: youtubeIc,
    url: "https://www.youtube.com/",
    alt: "유튜브 채널로 이동",
  },
];

// 히어로 데이터
export const HERO_DATA = [
  {
    id: "top-hero",
    title: "일상의 모든 물건을 \n거래해 보세요",
    imgUrl: topHeroImage,
  },
  {
    id: "bottom-hero",
    title: "믿을 수 있는 \n판다마켓 중고 거래",
    imgUrl: bottomHeroImage,
  },
];

// 메인 배너 데이터
export const MAIN_BANNER_DATA = [
  {
    id: "section1",
    caption: "Hot item",
    title: "인기 상품을 \n확인해 보세요",
    description: " 가장 HOT한 중고거래 물품을 \n판다 마켓에서 확인해 보세요",
    imgUrl: sectionImage1,
    imgAlt: "인기 상품 배너 이미지",
  },
  {
    id: "section2",
    caption: "Search",
    title: "구매를 원하는 \n상품을 검색하세요",
    description: "구매하고 싶은 물품은 검색해서 \n쉽게 찾아보세요",
    imgUrl: sectionImage2,
    imgAlt: "상품 찾기 이미지",
  },
  {
    id: "section3",
    caption: "register",
    title: "판매를 원하는 \n상품을 등록하세요",
    description: " 어떤 물건이든 판매하고 싶은 \n상품을 쉽게 등록하세요",
    imgUrl: sectionImage3,
    imgAlt: "상품 등록 이미지",
  },
];
