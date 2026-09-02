// 백엔드 응답 스키마와 형태를 맞춘 타입들
// 백엔드가 관계 필드를 평탄화해서 내려주므로 그 형태를 그대로 반영

export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// 로그인/회원가입 응답
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 댓글의 작성자 (백엔드가 user -> writer로 이름을 바꿔 내려줌)
export interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  // 평탄화된 필드들
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  isFavorite: boolean;
  // 상세 조회에만 포함 (목록에는 없음)
  comments?: Comment[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  // 평탄화된 필드들
  ownerId: number;
  nickname: string;
  likeCount: number;
  isLiked: boolean;
}

// 목록 응답 (offset 페이지네이션) - 제네릭으로 상품/게시글 공용
export interface ListResponse<T> {
  list: T[];
  totalCount: number;
}

// 댓글 목록 응답 (cursor 페이지네이션)
export interface CommentListResponse {
  list: Comment[];
  nextCursor: number | null;
}

// 이미지 업로드 응답
export interface UploadResponse {
  url: string;
}

// 목록 조회 쿼리
export interface ListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
}

// 상품 등록/수정 요청 바디 (폼이 정제해서 보내는 값)
export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}
