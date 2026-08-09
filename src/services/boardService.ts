import { apiFetch } from "./fetchClient";

import { PostType, PostListType } from "@/types/post";

export type BoardPostRequestType = Pick<
  PostType,
  "title" | "content" | "image"
>;
export type BoardPatchRequestType = Partial<BoardPostRequestType>;

export const boardService = {
  getArticles: async (query: URLSearchParams): Promise<PostListType> =>
    await apiFetch<PostListType>(`/articles${query ? `?${query}` : ""}`),
  getBestArticles: async () =>
    await apiFetch<PostListType>(
      "/articles?orderBy=favoriteCount&pageSize=3&page=1",
    ),
  getArticleDetail: async (id: PostType["id"]): Promise<PostType> =>
    await apiFetch<PostType>(`/articles/${id}`),
  postArticle: async (body: BoardPostRequestType) =>
    await apiFetch<PostType>(`/articles`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patchArticle: async (
    id: PostType["id"],
    body: BoardPatchRequestType,
  ): Promise<PostType> =>
    await apiFetch<PostType>(`/articles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteArticle: async (id: PostType["id"]): Promise<PostType> =>
    await apiFetch<PostType>(`/articles/${id}`, {
      method: "DELETE",
    }),
};
