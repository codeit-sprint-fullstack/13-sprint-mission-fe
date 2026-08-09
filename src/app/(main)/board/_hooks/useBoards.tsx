"use client";
import { useQuery } from "@tanstack/react-query";
import { boardService } from "@/services/boardService";
import { PostListType } from "@/types/post";
import { MenuType } from "@/types/menu";

interface IUseBoardsProps {
  input?: string;
  page?: number;
  pageSize?: number;
  selected?: MenuType;
  onError?: (error: Error) => void;
}

export default function useBoards({
  input,
  page,
  pageSize,
  selected,
}: IUseBoardsProps) {
  //Board List GET
  const {
    data: { list: posts = [], totalCount = 0 } = {},
    isPending: isPostsPending,
  } = useQuery<PostListType>({
    queryKey: ["board", input, selected?.type, page, pageSize],
    queryFn: () => {
      const queryParams = new URLSearchParams({
        orderBy: selected?.type ?? "recent",
        pageSize: String(pageSize ?? 10),
        page: String(page ?? 1),
        ...(input && { keyword: input }),
      });
      return boardService.getArticles(queryParams);
    },
  });
  const { data: { list: bestPosts = [] } = {}, isPending: isBestPostsPending } =
    useQuery<PostListType>({
      queryKey: ["board", "best"],
      queryFn: boardService.getBestArticles,
    });

  return {
    posts,
    totalCount,
    bestPosts,
    isPostsPending,
    isBestPostsPending,
  };
}
