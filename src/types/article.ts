import { SuccessResponse } from "./api";

export type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  favorite: number;
  userName: string;
};

export type ArticlePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type MultipleArticlesResponse = SuccessResponse<Article[]> & {
  pagination: ArticlePagination;
};

export type SingleArticleResponse = SuccessResponse<Article>;
