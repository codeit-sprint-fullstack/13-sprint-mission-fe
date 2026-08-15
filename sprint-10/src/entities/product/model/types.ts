import type { PublicUser } from "@/entities/user";

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

export type ProductListResponse = {
  list: Product[];
  totalCount: number;
};

export type OrderBy = "recent" | "oldest";

export type GetProductsParams = {
  page?: number;
  pageSize?: number;
  orderBy?: OrderBy;
  keyword?: string;
};

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
