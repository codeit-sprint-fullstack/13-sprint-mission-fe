const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Articles ────────────────────────────────────────────────────────────────

export function getArticles(query = {}) {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  const qs = params.toString();
  return request(`/articles${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });
}

export function getArticle(articleId) {
  return request(`/articles/${articleId}`, {
    cache: "no-store",
  });
}

export function createArticle(data) {
  return request("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateArticle(articleId, data) {
  return request(`/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteArticle(articleId) {
  return request(`/articles/${articleId}`, { method: "DELETE" });
}

// ─── Comments ────────────────────────────────────────────────────────────────

export function getComments(articleId) {
  return request(`/articles/${articleId}/comments`, {
    cache: "no-store",
  });
}

export function createComment(articleId, data) {
  return request(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateComment(articleId, commentId, data) {
  return request(`/articles/${articleId}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteComment(articleId, commentId) {
  return request(`/articles/${articleId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
