import facebook from "@/assets/icons/social/facebook-logo.svg";
import instagram from "@/assets/icons/social/instagram-logo.svg";
import twitter from "@/assets/icons/social/twitter-logo.svg";
import youtube from "@/assets/icons/social/youtube-logo.svg";

export const ROUTES = {
  HOME: "/",
  COMMUNITY: {
    BASE: "/community",
    REGISTER: "/community/register",
    DETAIL: (id: number) => `/community/${id}`,
    EDIT: (id: number) => `/community/${id}/edit`,
  },
  ITEM: {
    BASE: "/items",
    DETAIL: (id: number) => `/items/${id}`,
    EDIT: (id: number) => `/items/${id}/edit`,
  },
};

export const NAV_LINKS = [
  { id: 1, href: "/community", label: "자유게시판" },
  { id: 2, href: "/items", label: "중고마켓" },
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    href: "https://www.facebook.com/",
    src: facebook,
    alt: "페이스북",
  },
  { id: 2, href: "https://twitter.com/", src: twitter, alt: "트위터" },
  { id: 3, href: "https://www.youtube.com/", src: youtube, alt: "유튜브" },
  {
    id: 4,
    href: "https://www.instagram.com/",
    src: instagram,
    alt: "인스타그램",
  },
];
