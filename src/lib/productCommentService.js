import { apiFetch } from "./fetchClient";
export const productCommentService = {
  postProductComment: async (productId, body) =>
    await apiFetch(`/products/${productId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteProductComment: async (productId, commentId) =>
    await apiFetch(`/products/${productId}/comments/${commentId}`),
};
