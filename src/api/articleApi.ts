import type { PaginatedResponse, CursorPaginatedResponse } from "../types/pagination";
import type {
  Article,
  ArticleDetail,
  ArticleListItem,
  ArticleSortOption,
  ArticleComment,
} from "../types/article";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function request<T>(path: string, options?: RequestInit): Promise<T | null> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "요청에 실패했습니다.");
  }

  return data as T;
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: ArticleSortOption;
}

export async function getArticles({
  page = 1,
  limit = 10,
  keyword = "",
  sort = "recent",
}: GetArticlesParams = {}): Promise<PaginatedResponse<ArticleListItem> | null> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });
  if (keyword) params.append("keyword", keyword);
  return request<PaginatedResponse<ArticleListItem>>(`/articles?${params}`);
}

export async function getBestArticles(): Promise<PaginatedResponse<ArticleListItem> | null> {
  return request<PaginatedResponse<ArticleListItem>>("/articles?page=1&limit=3&sort=like");
}

export async function getArticle(id: string | number): Promise<ArticleDetail | null> {
  return request<ArticleDetail>(`/articles/${id}`);
}

export type CreateArticleInput = Pick<Article, "title" | "content">;
export type UpdateArticleInput = Partial<CreateArticleInput>;

export async function createArticle(
  body: CreateArticleInput
): Promise<{ article: Article } | null> {
  return request<{ article: Article }>("/articles", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateArticle(
  id: string | number,
  body: UpdateArticleInput
): Promise<{ article: Article } | null> {
  return request<{ article: Article }>(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteArticle(id: string | number): Promise<null> {
  return request<null>(`/articles/${id}`, { method: "DELETE" });
}

export interface GetCommentsParams {
  cursor?: number;
  limit?: number;
}

export async function getComments(
  articleId: string | number,
  { cursor, limit = 10 }: GetCommentsParams = {}
): Promise<CursorPaginatedResponse<ArticleComment> | null> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append("cursor", String(cursor));
  return request<CursorPaginatedResponse<ArticleComment>>(
    `/articles/${articleId}/comments?${params}`
  );
}

export async function createComment(
  articleId: string | number,
  content: string
): Promise<ArticleComment | null> {
  return request<ArticleComment>(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function updateComment(
  commentId: string | number,
  content: string
): Promise<ArticleComment | null> {
  return request<ArticleComment>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export async function deleteComment(commentId: string | number): Promise<null> {
  return request<null>(`/comments/${commentId}`, { method: "DELETE" });
}
