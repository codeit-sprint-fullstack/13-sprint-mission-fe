"use client";
import { useQuery } from "@tanstack/react-query";
import { boardService } from "@/services/boardService";
import { PostType } from "@/types/post";

interface IUseBoardProps {
  boardId: number;
}

export default function useBoard({ boardId }: IUseBoardProps) {
  // Board GET
  const { data: postDetail, isPending: isPostDetailPending } =
    useQuery<PostType>({
      queryKey: ["board", boardId],
      queryFn: () => boardService.getArticleDetail(boardId),
    });

  return {
    postDetail,
    isPostDetailPending,
  };
}
