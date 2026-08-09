import { apiFetch } from "./fetchClient";

import { ProductType, ProductUploadType } from "@/types/product";

export type ItemPostRequestType = {
  itemData: Pick<
    ProductUploadType,
    "name" | "description" | "price" | "images"
  > & {
    tags: string[];
  };
};

export const itemService = {
  getItems: (query: string) => apiFetch(`/products${query ? `?${query}` : ""}`),
  getItem: (itemId: ProductType["id"]) => apiFetch(`/products/${itemId}`),
  deleteItem: (itemId: ProductType["id"]) =>
    apiFetch(`/products/${itemId}`, {
      method: "DELETE",
    }),
  postItem: (formData: FormData) =>
    apiFetch("/products", {
      method: "POST",
      body: formData,
    }),
};
