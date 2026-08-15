import type { PublicUser } from "@/entities/user";

export type Article = {
  id: string;
  title: string;
  content: string;
  images: string[];
  favoriteCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
  user: PublicUser;
};

export type ArticleListResponse = {
  list: Article[];
  totalCount: number;
};

export type ArticleOrderBy = "recent" | "oldest" | "favorite";

export type GetArticlesParams = {
  page?: number;
  pageSize?: number;
  orderBy?: ArticleOrderBy;
  keyword?: string;
};
