import { cookieFetch, defaultFetch } from "./fetchClient";
import { PRODUCT_ENDPOINT, COMMENT_ENDPOINT } from "@/constants/endpoint";
import {
  CommentListResponse,
  CreateCommentInput,
  UpdateCommentInput,
  Comment,
} from "@/types";

export const getProductComments = (
  productId: number,
  limit = 10,
  sort?: string,
  lastId?: number,
): Promise<CommentListResponse> => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (sort) params.set("sort", sort);
  if (lastId) params.set("lastId", String(lastId));

  return defaultFetch(
    `${PRODUCT_ENDPOINT}/${productId}${COMMENT_ENDPOINT}?${params.toString()}`,
  );
};

export const createComment = (
  productId: number,
  data: CreateCommentInput,
): Promise<{ success: boolean; data: Comment }> =>
  cookieFetch(`${PRODUCT_ENDPOINT}/${productId}${COMMENT_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateComment = (
  commentId: number,
  data: UpdateCommentInput,
): Promise<{ success: boolean; data: Comment }> =>
  cookieFetch(`${COMMENT_ENDPOINT}/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteComment = (commentId: number) =>
  cookieFetch(`${COMMENT_ENDPOINT}/${commentId}`, {
    method: "DELETE",
  });
