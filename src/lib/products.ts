// API: https://panda-market-api-crud.vercel.app
import type { ListResponse, Product, ProductListParams } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://panda-market-api-crud.vercel.app";

/** 응답 본문 타입을 제네릭으로 받는 공통 fetch 래퍼 */
async function requestApi<T>(path: string, errorMessage: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(errorMessage);
  return (await res.json()) as T;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ProductListParams = {}): Promise<ListResponse<Product>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    keyword: String(keyword),
    orderBy: String(orderBy),
  });
  return requestApi<ListResponse<Product>>(
    `/products?${params}`,
    "상품 목록을 불러오지 못했습니다.",
  );
}

export async function getProduct(id: number | string): Promise<Product> {
  return requestApi<Product>(`/products/${id}`, "상품을 불러오지 못했습니다.");
}
