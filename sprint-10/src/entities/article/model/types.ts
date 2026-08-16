import type { PublicUser } from "@/entities/user";
import type { PaginatedResponse, PaginationParams } from "@/shared/types/api";

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

export type ArticleListResponse = PaginatedResponse<Article>;

export type ArticleOrderBy = "recent" | "oldest" | "favorite";

export type GetArticlesParams = PaginationParams<ArticleOrderBy>;

export type ArticleInput = {
  title: string;
  content: string;
  images?: string[];
};
