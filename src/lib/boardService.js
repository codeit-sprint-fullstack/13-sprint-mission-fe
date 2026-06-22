import { defaultFetch } from "./fetchClient";
export const boardService = {
  getArticles: async (query) =>
    await defaultFetch(`/articles${query ? `?${query}` : ""}`),
  getBestArticles: async () => await defaultFetch("/articles/best"),
  getArticleDetail: async (id) => await defaultFetch(`/articles/${id}`),
  postArticle: async (body) =>
    await defaultFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
