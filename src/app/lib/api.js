const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * @typedef {Object} Article
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} content
 * @property {number} articleId
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ArticleQuery
 * @property {string} [search]
 * @property {'recent'|'like'} [sort]
 * @property {number} [page]
 * @property {number} [limit]
 */

/**
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

// ─── Articles ────────────────────────────────────────────────────────────────

/**
 * 게시글 목록을 가져옵니다.
 * @param {ArticleQuery} query
 * @returns {Promise<{ data: Article[], totalCount: number }>}
 */
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

/**
 * 게시글 단건을 가져옵니다.
 * @param {number} articleId
 * @returns {Promise<{ data: Article }>}
 */
export function getArticle(articleId) {
  return request(`/articles/${articleId}`, {
    cache: "no-store",
  });
}

/**
 * 게시글을 생성합니다.
 * @param {{ title: string, content: string }} data
 * @returns {Promise<{ data: Article }>}
 */
export function createArticle(data) {
  return request("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * 게시글을 수정합니다.
 * @param {number} articleId
 * @param {{ title?: string, content?: string }} data
 * @returns {Promise<{ data: Article }>}
 */
export function updateArticle(articleId, data) {
  return request(`/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * 게시글을 삭제합니다.
 * @param {number} articleId
 * @returns {Promise<null>}
 */
export function deleteArticle(articleId) {
  return request(`/articles/${articleId}`, { method: "DELETE" });
}

// ─── Comments ────────────────────────────────────────────────────────────────

/**
 * 댓글 목록을 가져옵니다.
 * @param {number} articleId
 * @returns {Promise<{ data: Comment[] }>}
 */
export function getComments(articleId) {
  return request(`/articles/${articleId}/comments`, {
    cache: "no-store",
  });
}

/**
 * 댓글을 생성합니다.
 * @param {number} articleId
 * @param {{ content: string }} data
 * @returns {Promise<{ data: Comment }>}
 */
export function createComment(articleId, data) {
  return request(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ ...data, articleId }),
  });
}

/**
 * 댓글을 수정합니다.
 * @param {number} articleId
 * @param {number} commentId
 * @param {{ content: string }} data
 * @returns {Promise<{ data: Comment }>}
 */
export function updateComment(articleId, commentId, data) {
  return request(`/articles/${articleId}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ ...data, articleId }),
  });
}

/**
 * 댓글을 삭제합니다.
 * @param {number} articleId
 * @param {number} commentId
 * @returns {Promise<null>}
 */
export function deleteComment(articleId, commentId) {
  return request(`/articles/${articleId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
