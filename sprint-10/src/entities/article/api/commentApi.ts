import { apiClient } from "@/shared/api/client";
import type { CommentListResponse } from "@/entities/comment";

export const articleCommentApi = {
  getComments: (articleId: string, params: { cursor?: string; pageSize?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.cursor) query.set("cursor", params.cursor);
    query.set("pageSize", String(params.pageSize ?? 10));
    return apiClient.get<CommentListResponse>(`/articles/${articleId}/comments?${query}`);
  },

  // 생성/수정 응답에는 목록 조회와 달리 user 정보가 내려오지 않으므로,
  // 반환값을 화면 표시에 바로 쓰지 않고 호출부에서 목록을 다시 불러온다.
  createComment: (articleId: string, content: string) =>
    apiClient.post<{ success: boolean }>(`/articles/${articleId}/comments`, { content }),

  updateComment: (commentId: string, content: string) =>
    apiClient.patch<{ id: string; content: string }>(`/articles/comments/${commentId}`, {
      content,
    }),

  deleteComment: (commentId: string) => apiClient.delete(`/articles/comments/${commentId}`),
};
