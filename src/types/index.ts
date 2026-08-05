// 판다마켓 API(https://panda-market-api-crud.vercel.app) 응답 도메인 타입

export interface Writer {
  id: number;
  nickname: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  likeCount?: number;
  createdAt: string;
  updatedAt?: string;
  writer?: Writer;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
  images?: string[];
  favoriteCount?: number;
  ownerId?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  writer?: Writer;
}

// 게시글·상품 목록 응답 공통 형태
export interface ListResponse<T> {
  list: T[];
  totalCount: number;
}

// 댓글은 커서 기반 페이지네이션을 사용한다
export interface CursorListResponse<T> {
  list: T[];
  nextCursor: number | null;
}

export type ArticleOrderBy = "recent" | "like";
export type ProductOrderBy = "recent" | "favorite";

export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: ArticleOrderBy;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: ProductOrderBy;
}

export interface ArticleCreateInput {
  title: string;
  content: string;
  image?: string;
}

export type ArticleUpdateInput = Partial<ArticleCreateInput>;
