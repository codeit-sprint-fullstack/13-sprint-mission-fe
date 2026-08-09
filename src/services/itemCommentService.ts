import { apiFetch } from "./fetchClient";

import { ProductType } from "@/types/product";
import { CommentType } from "@/types/comment";

export type ItemPostRequestType = { content: string };

export const itemCommentService = {
  postItemComment: async (
    productId: ProductType["id"],
    body: ItemPostRequestType,
  ): Promise<CommentType> =>
    await apiFetch<CommentType>(`/products/${productId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteItemComment: async (
    productId: ProductType["id"],
    commentId: CommentType["id"],
  ): Promise<CommentType> =>
    await apiFetch<CommentType>(
      `/products/${productId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    ),
};
