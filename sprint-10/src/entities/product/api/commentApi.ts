import { apiClient } from "@/shared/api/client";
import type { CursorParams } from "@/shared/types/api";
import type { CommentListResponse } from "@/entities/comment";

export const commentApi = {
  getComments: (productId: string, params: CursorParams = {}) => {
    const query = new URLSearchParams();
    if (params.cursor) query.set("cursor", params.cursor);
    query.set("pageSize", String(params.pageSize ?? 10));
    return apiClient.get<CommentListResponse>(`/products/${productId}/comments?${query}`);
  },

  // 생성/수정 응답에는 목록 조회와 달리 user 정보가 내려오지 않으므로,
  // 반환값을 화면 표시에 바로 쓰지 않고 호출부에서 목록을 다시 불러온다.
  createComment: (productId: string, content: string) =>
    apiClient.post<{ success: boolean }>(`/products/${productId}/comments`, { content }),

  updateComment: (commentId: string, content: string) =>
    apiClient.patch<{ id: string; content: string }>(`/products/comments/${commentId}`, {
      content,
    }),

  deleteComment: (commentId: string) => apiClient.delete(`/products/comments/${commentId}`),
};
