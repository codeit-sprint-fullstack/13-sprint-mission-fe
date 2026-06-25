import { defaultFetch, tempFetch, tempAuthFetch } from "./fetchClient";
export const boardService = {
  getArticles: async (query) =>
    await tempFetch(`/articles${query ? `?${query}` : ""}`),
  getBestArticles: async () =>
    await tempFetch("/articles?orderBy=like&pageSize=3"),
  getArticleDetail: async (id) => await tempAuthFetch(`/articles/${id}`),
  postArticle: async (body) =>
    await tempAuthFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patchArticle: async (id, body) =>
    await tempAuthFetch(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteArticle: async (id) =>
    await tempAuthFetch(`/articles/${id}`, {
      method: "DELETE",
    }),
};
