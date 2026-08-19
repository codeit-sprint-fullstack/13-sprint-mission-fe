import type { User } from "./user";
import type { BaseComment } from "./comment";

export type ProductOwner = Pick<User, "id" | "nickname" | "image">;

export type ProductComment = BaseComment;
export type ProductCommentDraft = Omit<ProductComment, "author">;

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  images: string[];
  likeCount: number;
  createdAt: string;
  isLiked: boolean;
}

export interface ProductRecord {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  likeCount: number;
  ownerId: number | null;
  createdAt: string;
  updatedAt: string;
}

export type Product = ProductRecord & {
  owner: ProductOwner | null;
  comments: ProductComment[];
  isLiked: boolean;
};

export interface ProductLikeResult {
  id: number;
  likeCount: number;
  isLiked: boolean;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export type ProductOrderBy = "recent" | "like";

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: ProductOrderBy;
  keyword?: string;
}