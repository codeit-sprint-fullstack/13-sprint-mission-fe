import { fetchInstance } from "@/lib/fetchInstance";
import type {
  Article,
  ArticleRecord,
  ArticleListItem,
  ArticleLikeResult,
  CreateArticlePayload,
  UpdateArticlePayload,
  GetArticlesParams,
} from "@/types/article";
import type { ListResponse, MessageResponse } from "@/types/api";

export async function getArticles(
  { page = 1, pageSize = 10, orderBy = "recent", keyword = "" }: GetArticlesParams = {},
): Promise<ListResponse<ArticleListItem>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  }).toString();
  return fetchInstance<ListResponse<ArticleListItem>>(`/articles?${query}`, {
    next: { revalidate: 60 },
  });
}

export async function getArticle(id: number | string): Promise<Article> {
  return fetchInstance<Article>(`/articles/${id}`);
}

export async function createArticle(payload: CreateArticlePayload): Promise<ArticleRecord> {
  return fetchInstance<ArticleRecord>("/articles", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteArticle(id: number | string): Promise<MessageResponse> {
  return fetchInstance<MessageResponse>(`/articles/${id}`, { method: "DELETE" });
}

export async function updateArticle(
  id: number | string,
  data: UpdateArticlePayload,
): Promise<ArticleRecord> {
  return fetchInstance<ArticleRecord>(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function addArticleLike(id: number | string): Promise<ArticleLikeResult> {
  return fetchInstance<ArticleLikeResult>(`/articles/${id}/like`, { method: "POST" });
}

export async function removeArticleLike(id: number | string): Promise<ArticleLikeResult> {
  return fetchInstance<ArticleLikeResult>(`/articles/${id}/like`, { method: "DELETE" });
}