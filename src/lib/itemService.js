import { apiFetch } from "./fetchClient";
export const itemService = {
  getItems: (query) => apiFetch(`/products${query ? `?${query}` : ""}`),
};
