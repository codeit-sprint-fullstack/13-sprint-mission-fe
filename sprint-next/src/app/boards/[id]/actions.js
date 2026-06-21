"use server";

import { API } from "@/services/apiService";

export async function deleteArticle(articleId) {
  return API.delete(`/articles/${articleId}`);
}

export async function updateArticle(articleId, { title, content }) {
  return API.patch(`/articles/${articleId}`, { title, content });
}

export async function createComment(articleId, content) {
  return API.post(`/articles/${articleId}/comments`, { content });
}

export async function updateComment(commentId, content) {
  return API.patch(`/articles/comments/${commentId}`, { content });
}

export async function deleteComment(commentId) {
  return API.delete(`/articles/comments/${commentId}`);
}
