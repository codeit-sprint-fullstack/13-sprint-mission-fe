import type { ProductOrderBy } from "@/types";

export const PRODUCT_PAGE_SIZE = 10;

export interface ProductListState {
  keyword: string;
  orderBy: ProductOrderBy;
  page: number;
}

export function parseProductListState(
  searchParams: Pick<URLSearchParams, "get">,
): ProductListState {
  const keyword = (searchParams.get("keyword") ?? "").trim();
  const orderBy = searchParams.get("orderBy") === "favorite" ? "favorite" : "recent";
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return { keyword, orderBy, page };
}

export function createItemsUrl(state: ProductListState): string {
  const params = new URLSearchParams();
  const keyword = state.keyword.trim();

  if (keyword) params.set("keyword", keyword);
  if (state.orderBy !== "recent") params.set("orderBy", state.orderBy);
  if (state.page !== 1) params.set("page", String(state.page));

  const query = params.toString();
  return query ? `/items?${query}` : "/items";
}

export function getTotalPages(
  totalCount: number,
  pageSize: number = PRODUCT_PAGE_SIZE,
): number {
  return Math.ceil(totalCount / pageSize);
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5,
): number[] {
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisible / 2),
      totalPages - maxVisible + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}
