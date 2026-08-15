import { apiClient } from "@/shared/api/client";
import type { Article, ArticleListResponse, GetArticlesParams } from "../model/types";

function fetchArticles({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}: GetArticlesParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  });
  return apiClient.get<ArticleListResponse>(`/articles?${params}`);
}

export const articleApi = {
  getArticles: (params?: GetArticlesParams) => fetchArticles(params),

  getBestArticles: async (limit = 3): Promise<Article[]> => {
    const { list } = await fetchArticles({ page: 1, pageSize: limit, orderBy: "favorite" });
    return list;
  },

  getArticle: (id: string) => apiClient.get<Article>(`/articles/${id}`),

  createArticle: async (title: string, content: string) => {
    const res = await apiClient.post<{ success: boolean; data: Article }>("/articles", {
      title,
      content,
    });
    return res.data;
  },

  updateArticle: (id: string, data: { title: string; content: string }) =>
    apiClient.patch<Article>(`/articles/${id}`, data),

  deleteArticle: (id: string) => apiClient.delete(`/articles/${id}`),
};
