// API: https://panda-market-api-crud.vercel.app
// 미션 6에서 자체 BE URL로 교체 예정
import type {
  Article,
  ArticleCreateInput,
  ArticleListParams,
  ArticleUpdateInput,
  Comment,
  CursorListResponse,
  ListResponse,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://panda-market-api-crud.vercel.app";

// ─── 공통 요청 헬퍼 ───────────────────────────────────────────────────────────

/** 응답 본문 타입을 제네릭으로 받는 공통 fetch 래퍼 */
async function requestApi<T>(
  path: string,
  errorMessage: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(errorMessage);
  // DELETE는 본문 없이 204로 응답할 수 있다
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

function jsonBody(data: unknown): RequestInit {
  return {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

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
export function getMockNickname(id: number): string {
  return NICKNAMES[id % NICKNAMES.length];
}

export function getMockLikeCount(id: number): number {
  return (id * 7 + 3) % 50;
}

export function sortArticlesByLike(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const aLikes = a.likeCount ?? getMockLikeCount(a.id);
    const bLikes = b.likeCount ?? getMockLikeCount(b.id);
    return bLikes - aLikes;
  });
}

// ─── API 함수 ─────────────────────────────────────────────────────────────────

export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ArticleListParams = {}): Promise<ListResponse<Article>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: String(orderBy),
  });
  if (keyword) params.set("keyword", keyword);

  const data = await requestApi<ListResponse<Article>>(
    `/articles?${params}`,
    "게시글 목록을 불러오지 못했습니다.",
  );

  // 현재 CRUD API는 articles의 like 정렬을 지원하지 않아 클라이언트에서 보완한다.
  return {
    ...data,
    list: orderBy === "like" ? sortArticlesByLike(data.list) : data.list,
  };
}

export async function getArticle(id: number | string): Promise<Article> {
  return requestApi<Article>(
    `/articles/${id}`,
    "게시글을 불러오지 못했습니다.",
  );
}

export async function createArticle(
  data: ArticleCreateInput,
): Promise<Article> {
  return requestApi<Article>(`/articles`, "게시글 등록에 실패했습니다.", {
    method: "POST",
    ...jsonBody(data),
  });
}

export async function updateArticle(
  id: number | string,
  data: ArticleUpdateInput,
): Promise<Article> {
  return requestApi<Article>(`/articles/${id}`, "게시글 수정에 실패했습니다.", {
    method: "PATCH",
    ...jsonBody(data),
  });
}

export async function deleteArticle(id: number | string): Promise<void> {
  await requestApi<void>(`/articles/${id}`, "게시글 삭제에 실패했습니다.", {
    method: "DELETE",
  });
}

export async function getArticleComments(
  articleId: number | string,
  { cursor, limit = 10 }: { cursor?: number | string; limit?: number } = {},
): Promise<CursorListResponse<Comment>> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", String(cursor));

  return requestApi<CursorListResponse<Comment>>(
    `/articles/${articleId}/comments?${params}`,
    "댓글을 불러오지 못했습니다.",
  );
}

export async function createArticleComment(
  articleId: number | string,
  { content }: { content: string },
): Promise<Comment> {
  return requestApi<Comment>(
    `/articles/${articleId}/comments`,
    "댓글 등록에 실패했습니다.",
    { method: "POST", ...jsonBody({ content }) },
  );
}

export async function updateArticleComment(
  articleId: number | string,
  commentId: number,
  { content }: { content: string },
): Promise<Comment> {
  return requestApi<Comment>(
    `/articles/${articleId}/comments/${commentId}`,
    "댓글 수정에 실패했습니다.",
    { method: "PATCH", ...jsonBody({ content }) },
  );
}

export async function deleteArticleComment(
  articleId: number | string,
  commentId: number,
): Promise<void> {
  await requestApi<void>(
    `/articles/${articleId}/comments/${commentId}`,
    "댓글 삭제에 실패했습니다.",
    { method: "DELETE" },
  );
}
