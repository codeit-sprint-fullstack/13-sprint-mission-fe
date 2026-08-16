import axios from "./axios";
import type {
  Article,
  ArticleInput,
  Comment,
  CursorPage,
  PageResponse,
  SortOrder,
} from "../types/models";

interface ArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: SortOrder;
  keyword?: string;
}

interface CommentListParams {
  limit?: number;
  cursor?: number;
}

export async function getArticles({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: ArticleListParams = {}): Promise<PageResponse<Article>> {
  const response = await axios.get<PageResponse<Article>>("/articles", {
    params: { page, pageSize, orderBy, keyword },
  });
  return response.data;
}

export async function getArticle(articleId: string | number): Promise<Article> {
  const response = await axios.get<Article>(`/articles/${articleId}`);
  return response.data;
}

export async function createArticle(article: ArticleInput): Promise<Article> {
  const response = await axios.post<Article>("/articles", article);
  return response.data;
}

export async function updateArticle(articleId: string | number, article: Partial<ArticleInput>): Promise<Article> {
  const response = await axios.patch<Article>(`/articles/${articleId}`, article);
  return response.data;
}

export async function deleteArticle(articleId: string | number): Promise<void> {
  await axios.delete(`/articles/${articleId}`);
}

export async function addArticleFavorite(articleId: string | number): Promise<Article> {
  const response = await axios.post<Article>(`/articles/${articleId}/like`);
  return response.data;
}

export async function removeArticleFavorite(articleId: string | number): Promise<Article> {
  const response = await axios.delete<Article>(`/articles/${articleId}/like`);
  return response.data;
}

export async function getArticleComments(
  articleId: string | number,
  { limit = 10, cursor }: CommentListParams = {}
): Promise<CursorPage<Comment>> {
  const response = await axios.get<CursorPage<Comment>>(`/articles/${articleId}/comments`, {
    params: { limit, cursor },
  });
  return response.data;
}

export async function createArticleComment(articleId: string | number, content: string): Promise<Comment> {
  const response = await axios.post<Comment>(`/articles/${articleId}/comments`, { content });
  return response.data;
}
