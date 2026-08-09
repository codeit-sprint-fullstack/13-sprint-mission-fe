import { apiFetch } from "./fetchClient";

import { PostType } from "@/types/post";

export type BoardPostRequestType = Pick<
  PostType,
  "title" | "content" | "image"
>;
export type BoardPatchRequestType = Partial<BoardPostRequestType>;

export const boardService = {
  getArticles: async (query: string) =>
    await apiFetch(`/articles${query ? `?${query}` : ""}`),
  getBestArticles: async () =>
    await apiFetch("/articles?orderBy=favoriteCount&pageSize=3&page=1"),
  getArticleDetail: async (id: PostType["id"]) =>
    await apiFetch(`/articles/${id}`),
  postArticle: async (body: BoardPostRequestType) =>
    await apiFetch(`/articles`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patchArticle: async (id: PostType["id"], body: BoardPatchRequestType) =>
    await apiFetch(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteArticle: async (id: PostType["id"]) =>
    await apiFetch(`/articles/${id}`, {
      method: "DELETE",
    }),
};
