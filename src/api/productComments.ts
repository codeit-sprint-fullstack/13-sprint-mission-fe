import { fetchInstance } from "@/lib/fetchInstance";
import type { ProductComment, ProductCommentDraft } from "@/types/product";
import type { CursorListResponse, MessageResponse } from "@/types/api";

export interface GetProductCommentsParams {
  limit?: number;
  cursor?: number;
}

export async function getProductComments(
  productId: number | string,
  { limit = 10, cursor }: GetProductCommentsParams = {},
): Promise<CursorListResponse<ProductComment>> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append("cursor", String(cursor));
  return fetchInstance<CursorListResponse<ProductComment>>(
    `/products/${productId}/comments?${params.toString()}`,
    { next: { revalidate: 60 } },
  );
}

export async function createProductComment(
  productId: number | string,
  content: string,
): Promise<ProductCommentDraft> {
  return fetchInstance<ProductCommentDraft>(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function updateProductComment(
  commentId: number | string,
  content: string,
): Promise<ProductCommentDraft> {
  return fetchInstance<ProductCommentDraft>(`/products/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export async function deleteProductComment(commentId: number | string): Promise<MessageResponse> {
  return fetchInstance<MessageResponse>(`/products/comments/${commentId}`, {
    method: "DELETE",
  });
}