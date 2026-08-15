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

export type CommentAuthor = {
  id: string;
  nickname: string;
  image: string | null;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentAuthor;
};

export type CommentListResponse = {
  nextCursor: string | null;
  list: Comment[];
};
