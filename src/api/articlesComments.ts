import { fetchInstance } from "@/lib/fetchInstance";
import type { ArticleComment, ArticleCommentDraft } from "@/types/article";
import type { CursorListResponse, MessageResponse } from "@/types/api";

export interface GetCommentsParams {
  limit?: number;
  cursor?: number;
}

export async function getComments(
  articleId: number | string,
  { limit = 10, cursor }: GetCommentsParams = {},
): Promise<CursorListResponse<ArticleComment>> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.append("cursor", String(cursor));
  return fetchInstance<CursorListResponse<ArticleComment>>(
    `/articles/${articleId}/comments?${params.toString()}`,
  );
}

export async function createComment(
  articleId: number | string,
  content: string,
): Promise<ArticleCommentDraft> {
  return fetchInstance<ArticleCommentDraft>(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function updateComment(
  commentId: number | string,
  content: string,
): Promise<ArticleCommentDraft> {
  return fetchInstance<ArticleCommentDraft>(`/articles/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

export async function deleteComment(commentId: number | string): Promise<MessageResponse> {
  return fetchInstance<MessageResponse>(`/articles/comments/${commentId}`, {
    method: "DELETE",
  });
}