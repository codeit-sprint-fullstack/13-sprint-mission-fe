import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentService } from "@/services/commentService";
import { UserType } from "@/types/user";
import { CommentType } from "@/types/comment";

interface IUseCommentMutationsProps {
  boardId?: string;
}

export default function useCommentMutations({
  boardId,
}: IUseCommentMutationsProps) {
  const queryClient = useQueryClient();

  //Comment POST
  const postCommentMutation = useMutation<
    CommentType,
    Error,
    {
      userId: UserType["id"];
      comment: CommentType["content"];
    }
  >({
    mutationFn: ({ userId, comment }) => {
      return commentService.postComment(boardId, {
        content: comment,
        userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
    },
  });

  //Comment DELETE
  const deleteCommentMutation = useMutation<
    CommentType,
    Error,
    { id: CommentType["id"] }
  >({
    mutationFn: ({ id }) => {
      return commentService.deleteComment(boardId, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
    },
  });
  return { postCommentMutation, deleteCommentMutation };
}
