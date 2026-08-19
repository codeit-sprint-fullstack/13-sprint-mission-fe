import type { PaginatedResponse, CursorPaginatedResponse } from "../types/pagination";
import type {
  Product,
  ProductDetail,
  ProductListItem,
  ProductSortOption,
  ProductComment,
} from "../types/product";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

// 모든 API 함수가 공유하는 제네릭 fetch 헬퍼
async function request<T>(path: string, options?: RequestInit): Promise<T | null> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "요청에 실패했습니다.");
  }

  return data as T;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const token = getToken();
  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "이미지 업로드에 실패했습니다.");
  }
  return data.urls as string[];
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: ProductSortOption;
}

export async function getProducts({
  page = 1,
  limit = 10,
  keyword = "",
  sort = "recent",
}: GetProductsParams = {}): Promise<PaginatedResponse<ProductListItem> | null> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });
  if (keyword) params.append("keyword", keyword);
  return request<PaginatedResponse<ProductListItem>>(`/products?${params}`);
}

export async function getProduct(id: string | number): Promise<ProductDetail | null> {
  return request<ProductDetail>(`/products/${id}`);
}

// 상품 등록/수정 바디 타입 (Pick + Partial 유틸리티 타입)
export type CreateProductInput = Pick<Product, "name" | "description" | "price"> & {
  tags?: string[];
  images?: string[];
};
export type UpdateProductInput = Partial<CreateProductInput>;

export async function createProduct(
  body: CreateProductInput
): Promise<{ product: Product } | null> {
  return request<{ product: Product }>("/products", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateProduct(
  id: string | number,
  body: UpdateProductInput
): Promise<{ product: Product } | null> {
  return request<{ product: Product }>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteProduct(id: string | number): Promise<null> {
  return request<null>(`/products/${id}`, { method: "DELETE" });
}

export async function favoriteProduct(
  id: string | number
): Promise<(Product & { isLiked: boolean }) | null> {
  return request<Product & { isLiked: boolean }>(`/products/${id}/favorite`, {
    method: "POST",
  });
}

export async function unfavoriteProduct(
  id: string | number
): Promise<(Product & { isLiked: boolean }) | null> {
  return request<Product & { isLiked: boolean }>(`/products/${id}/favorite`, {
    method: "DELETE",
  });
}

export interface GetCommentsParams {
  cursor?: number;
  limit?: number;
}

export async function getProductComments(
  id: string | number,
  { cursor, limit = 10 }: GetCommentsParams = {}
): Promise<CursorPaginatedResponse<ProductComment> | null> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append("cursor", String(cursor));
  return request<CursorPaginatedResponse<ProductComment>>(
    `/products/${id}/comments?${params}`
  );
}

export async function createProductComment(
  id: string | number,
  content: string
): Promise<ProductComment | null> {
  return request<ProductComment>(`/products/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
