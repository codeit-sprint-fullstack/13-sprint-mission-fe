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
  params.set("limit", String(query.limit ?? 10));
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

export async function getProducts(query = {}) {
  const params = new URLSearchParams();
  if (query.keyword) params.set("search", query.keyword);
  if (query.orderBy) params.set("orderBy", query.orderBy);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("limit", String(query.pageSize));
  const qs = params.toString();
  const res = await publicFetch(`/products${qs ? `?${qs}` : ""}`);
  return { list: res.data, totalCount: res.total };
}

export async function getProduct(productId) {
  return (await authFetch(`/products/${productId}`)).data;
}

export async function createProduct(data) {
  return (
    await authFetch("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  ).data;
}

export async function updateProduct(productId, data) {
  return (
    await authFetch(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  ).data;
}

export function deleteProduct(productId) {
  return authFetch(`/products/${productId}`, { method: "DELETE" });
}

export async function favoriteProduct(productId) {
  return (
    await authFetch(`/products/${productId}/favorite`, { method: "POST" })
  ).data;
}

export async function unfavoriteProduct(productId) {
  return (
    await authFetch(`/products/${productId}/favorite`, { method: "DELETE" })
  ).data;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await authFetch("/images/upload", {
    method: "POST",
    body: formData,
  });
  return res.data.url;
}

export function getProductComments(productId, query = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 10));
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

// ─── Article Comments ─────────────────────────────────────────────────────────

export function updateArticleComment(commentId, content) {
  return authFetch(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export function deleteArticleComment(commentId) {
  return authFetch(`/comments/${commentId}`, { method: "DELETE" });
}

// ─── Product Comments ─────────────────────────────────────────────────────────

export function updateProductComment(commentId, content) {
  return authFetch(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export function deleteProductComment(commentId) {
  return authFetch(`/comments/${commentId}`, { method: "DELETE" });
}
