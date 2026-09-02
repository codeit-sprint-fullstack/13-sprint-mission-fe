import { BASE_URL } from "@/lib/config";
import type {
  Article,
  AuthResponse,
  Comment,
  CommentListResponse,
  ListParams,
  ListResponse,
  Product,
  ProductFormValues,
  UploadResponse,
  User,
} from "../types/api";

// fetch 옵션에 우리가 추가로 쓰는 필드를 얹은 타입
interface FetchOptions extends RequestInit {
  parse?: boolean;
  errorMessage?: string;
}

// 본문을 파싱하지 않는 요청용 (DELETE 등) - 반환은 항상 void
interface NoParseOptions extends Omit<FetchOptions, "parse"> {
  parse: false;
}

// parse: false면 본문을 읽지 않으므로 void
async function tokenFetch(path: string, options: NoParseOptions): Promise<void>;
// 그 외에는 호출부가 지정한 T
async function tokenFetch<T>(path: string, options?: FetchOptions): Promise<T>;
// 구현 시그니처 (외부에 노출되지 않음)
async function tokenFetch<T>(
  path: string,
  { parse = true, ...options }: FetchOptions = {},
): Promise<T | void> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const isFormDate = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormDate ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.remove("access_token");
      window.location.href = "/signin";
    }
    throw new Error("인증이 필요해요. 다시 로그인해 주세요.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `요청에 실패했어요. (${res.status})`);
  }

  // 단언이 사라졌다 : parse가 false면 그냥 반환하지 않는다.
  if (!parse) return;
  return res.json();
}

async function apiFetch(path: string, options: NoParseOptions): Promise<void>;
async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T>;
async function apiFetch<T>(
  path: string,
  { errorMessage, parse = true, ...options }: FetchOptions = {},
): Promise<T | void> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body.message ?? errorMessage ?? `요청에 실패했어요. (${res.status})`,
    );
  }

  if (!parse) return;
  return res.json();
}

// JSON 본문 옵션 헬퍼
function jsonBody(method: string, body: unknown): FetchOptions {
  return { method, body: JSON.stringify(body) };
}

// --- 인증 ---

// 로그인. 성공하면 { accessToken, refreshToken, user } 반환
export async function signIn(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/signIn", {
    ...jsonBody("POST", { email, password }),
  });
}

// 회원가입. 성공하면 { accessToken, refreshToken, user } 반환
export async function signUp(
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/signUp", {
    ...jsonBody("POST", { email, nickname, password, passwordConfirmation }),
  });
}

// --- 유저 ---

// 내 정보 조회 (토큰 필요)
export async function getMe(): Promise<User> {
  return tokenFetch<User>("/users/me");
}

// --- 이미지 ---

// 이미지 파일 업로드 (토큰 필요). 서버에 저장된 파일의 URL을 반환
export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("image", file);
  return tokenFetch<UploadResponse>("/images/upload", {
    method: "POST",
    body: formData,
  });
}

// --- 상품 ---

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent", // "recent" | "favorite"
}: ListParams = {}): Promise<ListResponse<Product>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });
  if (keyword) params.set("keyword", keyword);

  // 상품 목록은 비로그인도 볼 수 있어요
  return apiFetch<ListResponse<Product>>(`/products?${params}`, {
    cache: "no-store",
  });
}

// 상품 상세 (비로그인도 조회 가능, 로그인 시 isFavorite 반영)
export async function getProduct(id: number | string): Promise<Product> {
  return tokenFetch<Product>(`/products/${id}`);
}

// 상품 등록 (토큰 필요)
export async function createProduct(data: ProductFormValues): Promise<Product> {
  return tokenFetch<Product>("/products", {
    ...jsonBody("POST", data),
  });
}

// 상품 수정 (토큰 필요)
export async function updateProduct(
  id: number | string,
  data: Partial<ProductFormValues>,
): Promise<Product> {
  return tokenFetch<Product>(`/products/${id}`, {
    ...jsonBody("PATCH", data),
  });
}

// 상품 삭제 (토큰 필요)
export async function deleteProduct(id: number | string): Promise<void> {
  return tokenFetch(`/products/${id}`, {
    method: "DELETE",
    parse: false,
  });
}

// 좋아요 추가 (토큰 필요)
export async function favoriteProduct(id: number | string): Promise<Product> {
  return tokenFetch<Product>(`/products/${id}/favorite`, { method: "POST" });
}

// 좋아요 취소 (토큰 필요)
export async function unfavoriteProduct(id: number | string): Promise<void> {
  return tokenFetch(`/products/${id}/favorite`, {
    method: "DELETE",
    parse: false,
  });
}

// --- 댓글 (상품) ---

// cursor 페이지네이션
export async function getProductComments(
  productId: number | string,
  { cursor, limit = 10 }: { cursor?: number; limit?: number } = {},
): Promise<CommentListResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", String(cursor));

  return tokenFetch<CommentListResponse>(
    `/products/${productId}/comments?${params}`,
  );
}

// 댓글 등록 (토큰 필요)
export async function createProductComment(
  productId: number | string,
  content: string,
): Promise<Comment> {
  return tokenFetch<Comment>(`/products/${productId}/comments`, {
    ...jsonBody("POST", { content }),
  });
}

// 댓글 수정 (토큰 필요)
export async function updateComment(
  commentId: number | string,
  content: string,
): Promise<Comment> {
  return tokenFetch<Comment>(`/comments/${commentId}`, {
    ...jsonBody("PATCH", { content }),
  });
}

// 댓글 삭제 (토큰 필요)
export async function deleteComment(commentId: number | string): Promise<void> {
  return tokenFetch(`/comments/${commentId}`, {
    method: "DELETE",
    parse: false,
  });
}

// --- 게시글 ---

export async function getArticles({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ListParams = {}): Promise<ListResponse<Article>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });
  if (keyword) params.set("keyword", keyword);
  return apiFetch<ListResponse<Article>>(`/articles?${params}`, {
    cache: "no-store",
  });
}

// 베스트 게시글 - 좋아요 많은 순 상위 3개
export async function getBestArticles(): Promise<Article[]> {
  const { list } = await getArticles({ pageSize: 3, orderBy: "like" });
  return list;
}

export async function getArticle(id: number | string): Promise<Article> {
  return apiFetch<Article>(`/articles/${id}`, { cache: "no-store" });
}

export async function createArticle({
  title,
  content,
}: Pick<Article, "title" | "content">): Promise<Article> {
  return tokenFetch<Article>(`/articles`, {
    ...jsonBody("POST", { title, content }),
  });
}

export async function updateArticle(
  id: number | string,
  { title, content }: Partial<Pick<Article, "title" | "content">>,
): Promise<Article> {
  return tokenFetch<Article>(`/articles/${id}`, {
    ...jsonBody("PATCH", { title, content }),
  });
}

export async function deleteArticle(id: number | string): Promise<void> {
  return tokenFetch(`/articles/${id}`, {
    method: "DELETE",
    parse: false,
  });
}

// --- 댓글 (게시글) ---

// 댓글 목록 (cursor 페이지네이션). noStore=false면 client 더보기용(브라우저 fetch).
export async function getComments(
  articleId: number | string,
  {
    cursor,
    limit = 5,
    noStore = true,
  }: { cursor?: number; limit?: number; noStore?: boolean } = {},
): Promise<CommentListResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", String(cursor));
  return apiFetch<CommentListResponse>(
    `/articles/${articleId}/comments?${params}`,
    {
      ...(noStore ? { cache: "no-store" } : {}),
      errorMessage: "댓글을 불러오지 못했어요.",
    },
  );
}

export async function createComment(
  articleId: number | string,
  content: string,
): Promise<Comment> {
  return tokenFetch<Comment>(`/articles/${articleId}/comments`, {
    ...jsonBody("POST", { content }),
  });
}
