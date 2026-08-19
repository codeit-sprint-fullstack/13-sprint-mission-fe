import type { User } from "./user";
import type { BaseComment } from "./comment";

export type ArticleOwner = Pick<User, "id" | "nickname" | "image">;

export type ArticleComment = BaseComment;
export type ArticleCommentDraft = Omit<ArticleComment, "author">;

export interface ArticleListItem {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  createdAt: string;
  owner: ArticleOwner | null;
  isLiked: boolean;
}

export interface ArticleRecord {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  ownerId: number | null;
  createdAt: string;
  updatedAt: string;
}

export type Article = ArticleRecord & {
  owner: ArticleOwner | null;
  comments: ArticleComment[];
  isLiked: boolean;
};

export interface ArticleLikeResult {
  id: number;
  likeCount: number;
  isLiked: boolean;
}

export interface CreateArticlePayload {
  title: string;
  content: string;
  images: string[];
}

export type UpdateArticlePayload = Partial<CreateArticlePayload>;

export type ArticleOrderBy = "recent" | "like";

export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  orderBy?: ArticleOrderBy;
  keyword?: string;
}