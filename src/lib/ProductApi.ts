import { dynamicFetch, tokenFetch, tokenUploadFetch } from "./fetchClient";
import type { Comment, ListResponse } from "./types";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  createdAt: string;
  ownerNickname: string;
  ownerId: number;
  isLiked: boolean;
};

export async function getBestProduct(): Promise<Product[]> {
  const data = await dynamicFetch<ListResponse<Product>>(
    "/products?limit=4&orderBy=favorite",
  );
  return data.list
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);
}

export async function getProducts(
  orderBy = "recent",
  keyword = "",
  page = 1,
): Promise<ListResponse<Product>> {
  const pageSize = 10;

  if (orderBy === "oldest") {
    const params = new URLSearchParams({ orderBy: "recent", pageSize: "9999" });
    if (keyword) params.set("keyword", keyword);
    const data = await dynamicFetch<ListResponse<Product>>(
      `/products?${params.toString()}`,
    );
    const allItems = (data.list ?? []).reverse();
    const start = (page - 1) * pageSize;
    return {
      list: allItems.slice(start, start + pageSize),
      totalCount: data.totalCount ?? 0,
    };
  }

  const apiOrderBy = orderBy === "like" ? "favorite" : orderBy;
  const params = new URLSearchParams({
    orderBy: apiOrderBy,
    pageSize: String(pageSize),
    page: String(page),
  });
  if (keyword) params.set("keyword", keyword);
  const data = await dynamicFetch<ListResponse<Product>>(
    `/products?${params.toString()}`,
  );
  return { list: data.list ?? [], totalCount: data.totalCount ?? 0 };
}

export async function getProductsById(
  id: string,
  token?: string | null,
): Promise<Product> {
  return dynamicFetch<Product>(`/products/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export const uploadProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const { imageUrl } = await tokenUploadFetch<{ imageUrl: string }>(
    "/products/upload",
    formData,
  );
  return imageUrl.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_API_KEY}${imageUrl}`;
};

export const createProduct = ({
  name,
  description,
  images,
  price,
  tags,
}: {
  name: string;
  description: string;
  images: string[];
  price: number;
  tags: string[];
}): Promise<void> =>
  tokenFetch<void>("/products", {
    method: "POST",
    body: JSON.stringify({ name, description, images, price, tags }),
  });

export const updateProduct = (
  productId: string,
  data: Partial<Product>,
): Promise<void> =>
  tokenFetch<void>(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteProduct = (productId: string): Promise<void> =>
  tokenFetch<void>(`/products/${productId}`, { method: "DELETE" });

export const favoriteProduct = (productId: string): Promise<void> =>
  tokenFetch<void>(`/products/${productId}/favorite`, { method: "POST" });

export const unfavoriteProduct = (productId: string): Promise<void> =>
  tokenFetch<void>(`/products/${productId}/favorite`, { method: "DELETE" });

export async function getPcomments(productsId: string): Promise<Comment[]> {
  const data = await dynamicFetch<ListResponse<Comment>>(
    `/products/${productsId}/comments?limit=10`,
  );
  return data.list ?? [];
}

export const createPcomment = (
  productId: string,
  content: string,
): Promise<void> =>
  tokenFetch<void>(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

export const updatePcomment = (
  commentId: string,
  content: string,
): Promise<void> =>
  tokenFetch<void>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

export const deletePcomment = (commentId: string): Promise<void> =>
  tokenFetch<void>(`/comments/${commentId}`, { method: "DELETE" });
