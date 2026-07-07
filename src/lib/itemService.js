import { apiFetch } from "./fetchClient";
export const itemService = {
  getItems: (query) => apiFetch(`/products${query ? `?${query}` : ""}`),
  getItem: (itemId) => apiFetch(`/products/${itemId}`),
  deleteItem: (itemId) =>
    apiFetch(`/products/${itemId}`, {
      method: "DELETE",
    }),
};
