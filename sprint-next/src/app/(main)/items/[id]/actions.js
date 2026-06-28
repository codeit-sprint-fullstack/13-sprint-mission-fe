"use server";

import { API } from "@/services/apiService";

export async function deleteProduct(productId) {
  return API.delete(`/products/${productId}`);
}

export async function favoriteProduct(productId) {
  return API.post(`/products/${productId}/favorite`, {});
}

export async function unfavoriteProduct(productId) {
  return API.delete(`/products/${productId}/favorite`);
}

export async function createProductComment(productId, content) {
  return API.post(`/products/${productId}/comments`, { content });
}

export async function updateProductComment(commentId, content) {
  return API.patch(`/products/comments/${commentId}`, { content });
}

export async function deleteProductComment(commentId) {
  return API.delete(`/products/comments/${commentId}`);
}
