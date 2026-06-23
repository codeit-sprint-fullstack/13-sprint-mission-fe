import { publicFetch, authFetch } from "./fetchClient";

// ─── Articles ────────────────────────────────────────────────────────────────

export function getArticles(query = {}) {
  const params = new URLSearchParams();
  const keyword = query.keyword ?? query.search;
  const orderBy = query.orderBy ?? query.sort;
  const pageSize = query.pageSize ?? query.limit;
  if (keyword) params.set("keyword", keyword);
  if (orderBy) params.set("orderBy", orderBy);
  if (query.page) params.set("page", String(query.page));
  if (pageSize) params.set("pageSize", String(pageSize));
  const qs = params.toString();
  return publicFetch(`/articles${qs ? `?${qs}` : ""}`);
}

export function getArticle(articleId) {
  return publicFetch(`/articles/${articleId}`);
}

export function createArticle(data) {
  return authFetch("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateArticle(articleId, data) {
  return authFetch(`/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteArticle(articleId) {
  return authFetch(`/articles/${articleId}`, { method: "DELETE" });
}

export function getArticleComments(articleId, query = {}) {
  const params = new URLSearchParams();
  if (query.limit) params.set("limit", String(query.limit));
  if (query.cursor) params.set("cursor", String(query.cursor));
  const qs = params.toString();
  return publicFetch(`/articles/${articleId}/comments${qs ? `?${qs}` : ""}`);
}

export function createArticleComment(articleId, content) {
  return authFetch(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// ─── Products ────────────────────────────────────────────────────────────────

export function getProducts(query = {}) {
  const params = new URLSearchParams();
  if (query.keyword) params.set("keyword", query.keyword);
  if (query.orderBy) params.set("orderBy", query.orderBy);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("pageSize", String(query.pageSize));
  const qs = params.toString();
  return publicFetch(`/products${qs ? `?${qs}` : ""}`);
}

export function getProduct(productId) {
  return authFetch(`/products/${productId}`);
}

export function updateProduct(productId, data) {
  return authFetch(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(productId) {
  return authFetch(`/products/${productId}`, { method: "DELETE" });
}

export function favoriteProduct(productId) {
  return authFetch(`/products/${productId}/favorite`, { method: "POST" });
}

export function unfavoriteProduct(productId) {
  return authFetch(`/products/${productId}/favorite`, { method: "DELETE" });
}

export function getProductComments(productId, query = {}) {
  const params = new URLSearchParams();
  if (query.limit) params.set("limit", String(query.limit));
  if (query.cursor) params.set("cursor", String(query.cursor));
  const qs = params.toString();
  return publicFetch(
    `/products/${productId}/comments${qs ? `?${qs}` : ""}`
  );
}

export function createProductComment(productId, content) {
  return authFetch(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// 커뮤니티 페이지 하위 호환 별칭
export const getComments = getArticleComments;
export const createComment = createArticleComment;

// ─── Comments ────────────────────────────────────────────────────────────────

export function updateComment(commentId, content) {
  return authFetch(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export function deleteComment(commentId) {
  return authFetch(`/comments/${commentId}`, { method: "DELETE" });
}
