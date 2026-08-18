import type { PublicUser } from "@/entities/user";
import type { PaginatedResponse, PaginationParams } from "@/shared/types/api";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: string[];
  favoriteCount: number;
  isLiked?: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  // 상세 조회(GET /products/{id})에만 내려오고 목록 조회에는 없다.
  user?: PublicUser;
};

export type ProductListResponse = PaginatedResponse<Product>;

export type OrderBy = "recent" | "oldest";

export type GetProductsParams = PaginationParams<OrderBy>;

export type LikeResponse = {
  success: boolean;
  favoriteCount: number;
};

export type ProductInput = {
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: string[];
};
