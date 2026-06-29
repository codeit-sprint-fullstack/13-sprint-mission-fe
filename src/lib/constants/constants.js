import facebookIc from "@/app/assets/ic_facebook.svg";
import instagramIc from "@/app/assets/ic_instagram.svg";
import twitterIc from "@/app/assets/ic_twitter.svg";
import youtubeIc from "@/app/assets/ic_youtube.svg";

// Header, Footer 컴포넌트 예외처리
export const WIDTH_HEADER_LIST = ["/signin", "/signup"];

export const NAVIGATION = [
  { link: "/articles", title: "자유게시판" },
  { link: "/items", title: "중고마켓" },
];

// 게시글 리스트 반응형 그리드 사이즈
export const ARTICLE_PAGE_SIZE_CONFIG = {
  md: { mobile: 1, tablet: 2, desktop: 3 },
};

// 상품 필터 옵션
export const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "like", label: "좋아요순" },
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
