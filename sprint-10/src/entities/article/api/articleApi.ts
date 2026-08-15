import { apiClient, uploadFormData } from "@/shared/api/client";
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

  createArticle: async (title: string, content: string, images: string[] = []) => {
    const res = await apiClient.post<{ success: boolean; data: Article }>("/articles", {
      title,
      content,
      images,
    });
    return res.data;
  },

  updateArticle: (id: string, data: { title: string; content: string; images?: string[] }) =>
    apiClient.patch<Article>(`/articles/${id}`, data),

  deleteArticle: (id: string) => apiClient.delete(`/articles/${id}`),

  // 최대 5장, jpg/png/gif/webp, 5MB 이하 (백엔드 제약)
  uploadImages: async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const res = await uploadFormData<{ images: string[] }>("/articles/images", formData);
    return res.images;
  },
};
