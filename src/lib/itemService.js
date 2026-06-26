import { tempFetch, tempAuthFetch } from "./fetchClient";
export const itemService = {
  getItems: (query) => tempFetch(`/products${query ? `?${query}` : ""}`),
};
