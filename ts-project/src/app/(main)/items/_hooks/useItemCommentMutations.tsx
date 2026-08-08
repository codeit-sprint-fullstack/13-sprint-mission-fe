import { useMutation, useQueryClient } from "@tanstack/react-query";

import { itemCommentService } from "@/services/itemCommentService";
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
    { comment: string }
  >({
    mutationKey: ["products", itemId, "comments"],
    mutationFn: ({ comment }) =>
      itemCommentService.postItemComment(itemId, { content: comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", itemId],
      });
    },
  });
  const deleteItemCommentMutation = useMutation<
    CommentType,
    Error,
    { commentId: number }
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
