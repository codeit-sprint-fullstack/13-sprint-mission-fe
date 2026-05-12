export const ORDER_BY = {
  RECENT: "recent",
  FAVORITE: "favorite",
};

export const PRODUCT_ENDPOINT = "/products";

export const PAGE_SIZE = {
  best: { desktop: 4, tablet: 2, mobile: 1 },
  forSale: { desktop: 10, tablet: 6, mobile: 4 },
};

export const ORDER_OPTIONS = [
  { label: "최신순", value: ORDER_BY.RECENT, className: "dropdown-up" },
];
