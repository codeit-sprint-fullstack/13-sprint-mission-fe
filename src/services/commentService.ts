import { apiFetch } from "./fetchClient";

import { UserType } from "@/types/user";
import { PostType } from "@/types/post";
import { CommentType } from "@/types/comment";

export type CommentPostRequestType = {
  userId: UserType["id"];
  content: CommentType["content"];
};

export const commentService = {
  postComment: async (
    id: CommentType["id"],
    body: CommentPostRequestType,
  ): Promise<CommentType> =>
    apiFetch<CommentType>(`/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteComment: async (
    articleId: PostType["id"],
    commentId: CommentType["id"],
  ): Promise<CommentType> =>
    await apiFetch<CommentType>(
      `/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    ),
};
