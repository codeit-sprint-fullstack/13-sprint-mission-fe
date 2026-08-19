// 정렬 옵션 (Union 타입)
export type ArticleSortOption = "recent" | "like";

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// GET /articles 목록이 실제로 내려주는 필드만 뽑아낸 타입 (Pick 유틸리티 타입)
export type ArticleListItem = Pick<
  Article,
  "id" | "title" | "content" | "image" | "likeCount" | "createdAt"
> & {
  // 참고: 백엔드가 실제로 내려주지 않는 필드 (panda_fe/src/components/BestArticles.jsx에서 읽음) — 항상 undefined
  writer?: { id: number; nickname: string; image: string | null };
};

export interface ArticleComment {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
}

// 게시글 상세 응답 = 게시글 & 로그인 사용자의 좋아요 여부 (Intersection 타입)
export type ArticleDetail = Article & { isLiked: boolean };
