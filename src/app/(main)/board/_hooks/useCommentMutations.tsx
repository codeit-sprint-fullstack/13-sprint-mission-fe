import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  commentService,
  CommentPostRequestType,
} from "@/services/commentService";
import { UserType } from "@/types/user";
import { PostType } from "@/types/post";
import { CommentType } from "@/types/comment";

interface IUseCommentMutationsProps {
  boardId?: PostType["id"];
}

export default function useCommentMutations({
  boardId,
}: IUseCommentMutationsProps) {
  const queryClient = useQueryClient();

  //Comment POST
  const postCommentMutation = useMutation<
    CommentType,
    Error,
    CommentPostRequestType
  >({
    mutationFn: ({ userId, content }) => {
      return commentService.postComment(boardId!, {
        content,
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
      return commentService.deleteComment(boardId!, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
    },
  });
  return { postCommentMutation, deleteCommentMutation };
}
