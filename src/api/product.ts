import { fetchInstance } from "@/lib/fetchInstance";
import type {
  Product,
  ProductRecord,
  ProductListItem,
  ProductLikeResult,
  CreateProductPayload,
  UpdateProductPayload,
  GetProductsParams,
} from "@/types/product";
import type { ListResponse, MessageResponse } from "@/types/api";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}: GetProductsParams = {}): Promise<ListResponse<ProductListItem>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  }).toString();
  return fetchInstance<ListResponse<ProductListItem>>(`/products?${query}`, {
    next: { revalidate: 60 },
  });
}

export async function getProduct(productId: number | string): Promise<Product> {
  return fetchInstance<Product>(`/products/${productId}`, {
    next: { revalidate: 60 },
  });
}

export async function createProducts(payload: CreateProductPayload): Promise<ProductRecord> {
  return fetchInstance<ProductRecord>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(
  productId: number | string,
  payload: UpdateProductPayload,
): Promise<ProductRecord> {
  return fetchInstance<ProductRecord>(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(productId: number | string): Promise<MessageResponse> {
  return fetchInstance<MessageResponse>(`/products/${productId}`, {
    method: "DELETE",
  });
}

export async function addFavorite(productId: number | string): Promise<ProductLikeResult> {
  return fetchInstance<ProductLikeResult>(`/products/${productId}/like`, {
    method: "POST",
  });
}

export async function removeFavorite(productId: number | string): Promise<ProductLikeResult> {
  return fetchInstance<ProductLikeResult>(`/products/${productId}/like`, {
    method: "DELETE",
  });
}