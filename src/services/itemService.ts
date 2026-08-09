import { apiFetch } from "./fetchClient";

import {
  ProductType,
  ProductListType,
  ProductUploadType,
} from "@/types/product";

export type ItemPostRequestType = {
  itemData: Pick<
    ProductUploadType,
    "name" | "description" | "price" | "images"
  > & {
    tags: string[];
  };
};

export const itemService = {
  getItems: (query: URLSearchParams | string): Promise<ProductListType> =>
    apiFetch<ProductListType>(`/products${query ? `?${query}` : ""}`),
  getItem: (itemId: ProductType["id"]): Promise<ProductType> =>
    apiFetch<ProductType>(`/products/${itemId}`),
  deleteItem: (itemId: ProductType["id"]): Promise<ProductType> =>
    apiFetch<ProductType>(`/products/${itemId}`, {
      method: "DELETE",
    }),
  postItem: (formData: FormData): Promise<ProductType> =>
    apiFetch<ProductType>("/products", {
      method: "POST",
      body: formData,
    }),
};
