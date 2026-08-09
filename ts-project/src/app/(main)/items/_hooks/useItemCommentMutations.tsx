import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  itemCommentService,
  ItemPostRequestType,
} from "@/services/itemCommentService";
import { CommentType } from "@/types/comment";

interface IUseItemCommentMutationsProps {
  itemId: number;
}

export default function useItemCommentMutations({
  itemId,
}: IUseItemCommentMutationsProps) {
  const queryClient = useQueryClient();

  const postItemCommentMutation = useMutation<
    CommentType,
    Error,
    ItemPostRequestType
  >({
    mutationKey: ["products", itemId, "comments"],
    mutationFn: ({ comment }) =>
      itemCommentService.postItemComment(itemId, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", itemId],
      });
    },
  });
  const deleteItemCommentMutation = useMutation<
    CommentType,
    Error,
    { commentId: CommentType["id"] }
  >({
    mutationKey: ["products", itemId, "comments"],
    mutationFn: ({ commentId }) =>
      itemCommentService.deleteItemComment(itemId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", itemId],
      });
    },
  });
  return { postItemCommentMutation, deleteItemCommentMutation };
}
