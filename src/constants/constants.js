import facebookIc from "@/assets/ic_facebook.svg";

import instagramIc from "@/assets/ic_instagram.svg";
import twitterIc from "@/assets/ic_twitter.svg";
import youtubeIc from "@/assets/ic_youtube.svg";

// BASE URL
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 그룹 사이즈 (페이지네이션 넘버링 개수)
export const GROUP_SIZE = 5;

// 상품 리스트 반응형 그리드 사이즈
export const PAGE_SIZE_CONFIG = {
  md: { mobile: 4, tablet: 6, desktop: 10 },
  lg: { mobile: 1, tablet: 2, desktop: 4 },
};

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
