import { apiFetch } from "./fetchClient";
export const commentService = {
  postComment: async (id, body) =>
    apiFetch(`/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteComment: async (articleId, commentId) =>
    await apiFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "DELETE",
    }),
};
