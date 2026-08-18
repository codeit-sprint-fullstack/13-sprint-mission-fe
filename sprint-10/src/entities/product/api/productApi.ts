import { apiClient, uploadFormData } from "@/shared/api/client";
import type { ApiSuccessResponse } from "@/shared/types/api";
import type {
  GetProductsParams,
  LikeResponse,
  Product,
  ProductInput,
  ProductListResponse,
} from "../model/types";

function fetchProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}: GetProductsParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  });
  return apiClient.get<ProductListResponse>(`/products?${params}`);
}

export const productApi = {
  getProducts: (params?: GetProductsParams) => fetchProducts(params),

  // 백엔드가 좋아요순 정렬(orderBy)을 지원하지 않아, 최신 상품을 넉넉히 가져와 클라이언트에서 정렬한다.
  getBestProducts: async (limit = 4): Promise<Product[]> => {
    const { list } = await fetchProducts({ page: 1, pageSize: 20, orderBy: "recent" });
    return [...list].sort((a, b) => b.favoriteCount - a.favoriteCount).slice(0, limit);
  },

  getProduct: (id: string) => apiClient.get<Product>(`/products/${id}`),

  createProduct: async (data: ProductInput) => {
    const res = await apiClient.post<ApiSuccessResponse<Product>>("/products", data);
    return res.data;
  },

  updateProduct: (id: string, data: Partial<ProductInput>) =>
    apiClient.patch<Product>(`/products/${id}`, data),

  likeProduct: (id: string) => apiClient.post<LikeResponse>(`/products/${id}/like`),

  unlikeProduct: (id: string) => apiClient.delete<LikeResponse>(`/products/${id}/like`),

  deleteProduct: (id: string) => apiClient.delete(`/products/${id}`),

  // 최대 5장, jpg/png/gif/webp, 5MB 이하 (백엔드 제약)
  uploadImages: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const res = await uploadFormData<{ images: string[] }>("/products/images", formData);
    return res.images;
  },
};
