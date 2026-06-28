import { authFetch } from "./fetchClient";

export const productService = {
  getProducts: () => {
    return authFetch("/products");
  },
  getProductDetail: (id, token) =>
    authFetch(`/products/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }),

  getProductComments: (id, cursor = "", limit = 5) => {
    const cursorQuery = cursor ? `&cursor=${cursor}` : "";
    return authFetch(`/products/${id}/comments?limit=5${cursorQuery}`);
  },

  createComment: (id, content, token) => {
    return authFetch(`/products/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ content }),
    });
  },

  postFavorite: (id, token) => {
    return authFetch(`/products/${id}/favorite`, {
      method: "POST",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
  },

  deleteFavorite: (id, token) => {
    return authFetch(`/products/${id}/favorite`, {
      method: "DELETE",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
  },

  updateComment: (commentId, content, token) => {
    return authFetch(`/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ content }),
    });
  },

  deleteComment: (commentId, token) => {
    return authFetch(`/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
};
