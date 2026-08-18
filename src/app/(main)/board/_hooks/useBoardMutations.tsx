"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  boardService,
  BoardPostRequestType,
  BoardPatchRequestType,
} from "@/services/boardService";
import { PostType } from "@/types/post";

interface IUseBoardMutationsProps {
  boardId?: number;
}

export default function useBoardMutations({
  boardId,
}: IUseBoardMutationsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  //Board POST
  const postPostMutation = useMutation<PostType, Error, BoardPostRequestType>({
    mutationKey: ["board", "create"],
    mutationFn: boardService.postArticle,
    onSuccess: (result) => {
      router.push(`/board/${result.id}`);
    },
  });

  //Board PATCH
  const patchPostMutation = useMutation<
    PostType,
    Error,
    { id: number; data: BoardPatchRequestType }
  >({
    mutationKey: ["board", boardId, "edit"],
    mutationFn: ({ id, data }) => boardService.patchArticle(id, data),
    onSuccess: (result) => {
      router.push(`/board/${result.id}`);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  //Board DELETE
  const deletePostMutation = useMutation<
    PostType,
    Error,
    { id: PostType["id"] }
  >({
    mutationKey: ["board", boardId, "delete"],
    mutationFn: ({ id }) => boardService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
      router.push("/board");
    },
  });

  return {
    postPostMutation,
    patchPostMutation,
    deletePostMutation,
  };
}
