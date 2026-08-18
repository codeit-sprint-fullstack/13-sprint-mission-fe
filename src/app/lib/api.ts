import { publicFetch, authFetch } from "./fetchClient";
import type {
  Article,
  ArticleListResponse,
  ArticlePayload,
  ArticleQuery,
  Comment,
  CommentListResponse,
  CommentQuery,
  Product,
  ProductListResponse,
  ProductPayload,
  ProductQuery,
} from "./types";

// ─── Articles ────────────────────────────────────────────────────────────────

export function getArticles(query: ArticleQuery = {}): Promise<ArticleListResponse> {
  const params = new URLSearchParams();
  const keyword = query.keyword ?? query.search;
  const orderBy = query.orderBy ?? query.sort;
  const pageSize = query.pageSize ?? query.limit;
  if (keyword) params.set("keyword", keyword);
  if (orderBy) params.set("orderBy", orderBy);
  if (query.page) params.set("page", String(query.page));
  if (pageSize) params.set("pageSize", String(pageSize));
  const qs = params.toString();
  return publicFetch<ArticleListResponse>(`/articles${qs ? `?${qs}` : ""}`);
}

export function getArticle(articleId: number): Promise<Article> {
  return publicFetch<Article>(`/articles/${articleId}`);
}

export function createArticle(data: ArticlePayload): Promise<Article> {
  return authFetch<Article>("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateArticle(
  articleId: number,
  data: ArticlePayload
): Promise<Article> {
  return authFetch<Article>(`/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteArticle(articleId: number): Promise<null> {
  return authFetch<null>(`/articles/${articleId}`, { method: "DELETE" });
}

export function getArticleComments(
  articleId: number,
  query: CommentQuery = {}
): Promise<CommentListResponse> {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 10));
  if (query.cursor) params.set("cursor", String(query.cursor));
  const qs = params.toString();
  return publicFetch<CommentListResponse>(
    `/articles/${articleId}/comments${qs ? `?${qs}` : ""}`
  );
}

export function createArticleComment(
  articleId: number,
  content: string
): Promise<Comment> {
  return authFetch<Comment>(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(
  query: ProductQuery = {}
): Promise<ProductListResponse> {
  const params = new URLSearchParams();
  if (query.keyword) params.set("search", query.keyword);
  if (query.orderBy) params.set("orderBy", query.orderBy);
  if (query.page) params.set("page", String(query.page));
  if (query.pageSize) params.set("limit", String(query.pageSize));
  const qs = params.toString();
  const res = await publicFetch<{ data: Product[]; total: number }>(
    `/products${qs ? `?${qs}` : ""}`
  );
  return { list: res.data, totalCount: res.total };
}

export async function getProduct(productId: number): Promise<Product> {
  return (await authFetch<{ data: Product }>(`/products/${productId}`)).data;
}

export async function createProduct(data: ProductPayload): Promise<Product> {
  return (
    await authFetch<{ data: Product }>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  ).data;
}

export async function updateProduct(
  productId: number,
  data: ProductPayload
): Promise<Product> {
  return (
    await authFetch<{ data: Product }>(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  ).data;
}

export function deleteProduct(productId: number): Promise<null> {
  return authFetch<null>(`/products/${productId}`, { method: "DELETE" });
}

export async function favoriteProduct(productId: number): Promise<Product> {
  return (
    await authFetch<{ data: Product }>(`/products/${productId}/favorite`, {
      method: "POST",
    })
  ).data;
}

export async function unfavoriteProduct(productId: number): Promise<Product> {
  return (
    await authFetch<{ data: Product }>(`/products/${productId}/favorite`, {
      method: "DELETE",
    })
  ).data;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await authFetch<{ data: { url: string } }>("/images/upload", {
    method: "POST",
    body: formData,
  });
  return res.data.url;
}

export function getProductComments(
  productId: number,
  query: CommentQuery = {}
): Promise<CommentListResponse> {
  const params = new URLSearchParams();
  params.set("limit", String(query.limit ?? 10));
  if (query.cursor) params.set("cursor", String(query.cursor));
  const qs = params.toString();
  return publicFetch<CommentListResponse>(
    `/products/${productId}/comments${qs ? `?${qs}` : ""}`
  );
}

export function createProductComment(
  productId: number,
  content: string
): Promise<Comment> {
  return authFetch<Comment>(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// ─── Article Comments ─────────────────────────────────────────────────────────

export function updateArticleComment(
  commentId: number,
  content: string
): Promise<Comment> {
  return authFetch<Comment>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export function deleteArticleComment(commentId: number): Promise<null> {
  return authFetch<null>(`/comments/${commentId}`, { method: "DELETE" });
}

// ─── Product Comments ─────────────────────────────────────────────────────────

export function updateProductComment(
  commentId: number,
  content: string
): Promise<Comment> {
  return authFetch<Comment>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export function deleteProductComment(commentId: number): Promise<null> {
  return authFetch<null>(`/comments/${commentId}`, { method: "DELETE" });
}
