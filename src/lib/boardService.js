import { apiFetch } from "./fetchClient";
export const boardService = {
  getArticles: async (query) =>
    await apiFetch(`/articles${query ? `?${query}` : ""}`),
  getBestArticles: async () =>
    await apiFetch("/articles?orderBy=favoriteCount&pageSize=3&page=1"),
  getArticleDetail: async (id) => await apiFetch(`/articles/${id}`),
  postArticle: async (body) =>
    await apiFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patchArticle: async (id, body) =>
    await apiFetch(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteArticle: async (id) =>
    await apiFetch(`/articles/${id}`, {
      method: "DELETE",
    }),
};
