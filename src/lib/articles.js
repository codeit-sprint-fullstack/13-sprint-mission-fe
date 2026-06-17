// API: https://panda-market-api-crud.vercel.app
// 미션 6에서 자체 BE URL로 교체 예정
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://panda-market-api-crud.vercel.app";

// ─── 프론트엔드 임의값 처리 ────────────────────────────────────────────────────

const NICKNAMES = [
  "판다팬",
  "코드잇러",
  "쇼핑왕",
  "베스트셀러",
  "마켓고수",
  "판다러버",
];

// ID 기반 일관된 임의값 (렌더마다 동일하게 유지)
export function getMockNickname(id) {
  return NICKNAMES[id % NICKNAMES.length];
}

export function getMockLikeCount(id) {
  return (id * 7 + 3) % 50;
}

export function sortArticlesByLike(articles) {
  return [...articles].sort((a, b) => {
    const aLikes = a.likeCount ?? getMockLikeCount(a.id);
    const bLikes = b.likeCount ?? getMockLikeCount(b.id);
    return bLikes - aLikes;
  });
}

// ─── API 함수 ─────────────────────────────────────────────────────────────────

/**
 * @param {{ page?: number, pageSize?: number, keyword?: string, orderBy?: 'recent'|'like' }} options
 * @returns {Promise<{ list: object[], totalCount: number }>}
 */
export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: String(orderBy),
  });
  if (keyword) params.set("keyword", keyword);
  const res = await fetch(`${BASE_URL}/articles?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("게시글 목록을 불러오지 못했습니다.");
  const data = await res.json();

  // 현재 CRUD API는 articles의 like 정렬을 지원하지 않아 클라이언트에서 보완한다.
  return {
    ...data,
    list: orderBy === "like" ? sortArticlesByLike(data.list) : data.list,
  };
}

/**
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export async function getArticle(id) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
}

/**
 * @param {{ title: string, content: string, image?: string }} data
 * @returns {Promise<object>}
 */
export async function createArticle(data) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("게시글 등록에 실패했습니다.");
  return res.json();
}

/**
 * @param {number|string} id
 * @param {{ title?: string, content?: string }} data
 * @returns {Promise<object>}
 */
export async function updateArticle(id, data) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("게시글 수정에 실패했습니다.");
  return res.json();
}

/**
 * @param {number|string} id
 */
export async function deleteArticle(id) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("게시글 삭제에 실패했습니다.");
}

export async function getArticleComments(
  articleId,
  { cursor, limit = 10 } = {},
) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments?${params}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("댓글을 불러오지 못했습니다.");
  return res.json();
}

export async function createArticleComment(articleId, { content }) {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 등록에 실패했습니다.");
  return res.json();
}

export async function updateArticleComment(articleId, commentId, { content }) {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );
  if (!res.ok) throw new Error("댓글 수정에 실패했습니다.");
  return res.json();
}

export async function deleteArticleComment(articleId, commentId) {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error("댓글 삭제에 실패했습니다.");
}
