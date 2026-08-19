import { serverFetch } from "@/lib/serverFetch";
import { cookieFetch, defaultFetch } from "./fetchClient";
import {
  COMMENT_ENDPOINT,
  POST_ENDPOINT,
  PRODUCT_ENDPOINT,
} from "@/constants/endpoint";
import {
  CommentListResponse,
  CreateCommentInput,
  UpdateCommentInput,
  Comment,
} from "@/types";

interface GetCommentsParams {
  limit?: number;
  lastId?: number;
  sort?: string;
}

function buildCommentQuery({
  limit = 10,
  lastId,
  sort = "recent",
}: GetCommentsParams) {
  const query = new URLSearchParams({ limit: String(limit), sort });
  if (lastId) query.append("lastId", String(lastId));
  return query.toString();
}

export async function getPostComments(
  articleId: number,
  params: GetCommentsParams = {},
): Promise<CommentListResponse> {
  const query = buildCommentQuery(params);
  return defaultFetch(`${POST_ENDPOINT}/${articleId}/comments?${query}`);
}

export async function getPostCommentsServer(
  articleId: number,
  params: GetCommentsParams = {},
): Promise<CommentListResponse> {
  const query = buildCommentQuery(params);
  return serverFetch(`${POST_ENDPOINT}/${articleId}/comments?${query}`);
}

export async function createPostComment(
  articleId: number,
  data: CreateCommentInput,
): Promise<{ success: boolean; data: Comment }> {
  return cookieFetch(`${POST_ENDPOINT}/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProductComments(
  productId: number,
  params: GetCommentsParams = {},
): Promise<CommentListResponse> {
  const query = buildCommentQuery(params);
  return defaultFetch(`${PRODUCT_ENDPOINT}/${productId}/comments?${query}`);
}

export async function createProductComment(
  productId: number,
  data: CreateCommentInput,
): Promise<{ success: boolean; data: Comment }> {
  return cookieFetch(`${PRODUCT_ENDPOINT}/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateComment(
  commentId: number,
  data: UpdateCommentInput,
): Promise<{ success: boolean; data: Comment }> {
  return cookieFetch(`${COMMENT_ENDPOINT}/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteComment(commentId: number) {
  return cookieFetch(`${COMMENT_ENDPOINT}/${commentId}`, { method: "DELETE" });
}
