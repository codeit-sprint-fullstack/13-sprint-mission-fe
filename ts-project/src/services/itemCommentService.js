import { apiFetch } from "./fetchClient";
export const itemCommentService = {
  postItemComment: async (productId, body) =>
    await apiFetch(`/products/${productId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteItemComment: async (productId, commentId) =>
    await apiFetch(`/products/${productId}/comments/${commentId}`, {
      method: "DELETE",
    }),
};
