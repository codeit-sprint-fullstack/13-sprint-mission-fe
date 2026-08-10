export interface User {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
}

export interface AuthResult {
  user: User;
  accessToken?: string;
  refreshToken?: string;
}

export interface Writer {
  id: number;
  nickname: string;
  image?: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  writer?: Writer;
}

export interface CommentListResponse {
  list: Comment[];
  nextCursor?: number | null;
}

export interface CommentQuery {
  limit?: number;
  cursor?: number | string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt?: string;
  writer?: Writer;
  likeCount?: number;
}

export interface ArticleListResponse {
  list: Article[];
  totalCount: number;
}

export interface ArticleQuery {
  keyword?: string;
  search?: string;
  orderBy?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
  limit?: number;
}

export interface ArticlePayload {
  title: string;
  content: string;
}

export interface ProductTag {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: ProductTag[];
  images: string[];
  userId?: number;
  user?: Writer;
  createdAt: string;
  updatedAt?: string;
  isLiked?: boolean;
  _count?: { likes: number };
}

export interface ProductListResponse {
  list: Product[];
  totalCount: number;
}

export interface ProductQuery {
  keyword?: string;
  orderBy?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}
