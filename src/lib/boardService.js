import { defaultFetch } from "./fetchClient";
export const boardService = {
  getArticles: async () => await defaultFetch("/articles"),
};
