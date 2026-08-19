import { cookieFetch } from "./fetchClient";
import { PRODUCT_ENDPOINT } from "@/constants/endpoint";
import { Product, UpdateProductInput } from "@/types";

export const productService = {
  getDetail: (id: number): Promise<{ success: boolean; data: Product }> =>
    cookieFetch(`${PRODUCT_ENDPOINT}/${id}`),

  update: (
    id: number,
    data: UpdateProductInput,
  ): Promise<{ success: boolean; data: Product }> =>
    cookieFetch(`${PRODUCT_ENDPOINT}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    cookieFetch(`${PRODUCT_ENDPOINT}/${id}`, {
      method: "DELETE",
    }),

  like: (id: number): Promise<Product> =>
    cookieFetch(`${PRODUCT_ENDPOINT}/${id}/like`, {
      method: "POST",
    }),

  unlike: (id: number): Promise<Product> =>
    cookieFetch(`${PRODUCT_ENDPOINT}/${id}/like`, {
      method: "DELETE",
    }),
};
