import { defaultFetch } from "./fetchClient";
export const boardService = {
  getArticles: async () => await defaultFetch("/articles"),
  getBestArticles: async () => await defaultFetch("/articles/best"),
  getArticleDetail: async (id) => await defaultFetch(`/articles/${id}`),
};
