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
  isLiked?: boolean;
  createdAt: string;
  updatedAt?: string;
  writer?: Writer;
}

// 자체 백엔드(imageUrl·likeCount)와 실습용 CRUD API(images·favoriteCount)
// 응답 형태가 달라 두 필드를 모두 optional로 열어두고 화면에서 fallback 처리한다.
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
  images?: string[];
  imageUrl?: string | null;
  favoriteCount?: number;
  likeCount?: number;
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

export interface ProductCreateInput {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  imageUrl?: string | null;
}

export type ProductUpdateInput = Partial<ProductCreateInput>;

export interface UploadedImage {
  imageUrl: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
