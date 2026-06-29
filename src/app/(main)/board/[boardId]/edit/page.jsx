"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";

import PostForm from "../../PostForm";
import { boardService } from "@/lib/boardService";

export default function EditPostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const boardId = pathname.split("/")[2];
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const { data: boardData } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => boardService.getArticleDetail(boardId),
  });
  const { mutate: patchArticle } = useMutation({
    mutationKey: ["board", boardId, "edit"],
    mutationFn: ({ id, data }) => boardService.patchArticle(id, data),
    onSuccess: (result) => {
      router.push(`/board/${result.id}`);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  useEffect(() => {
    if (!boardData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      title: boardData.title ?? "",
      content: boardData.content ?? "",
    });
  }, [boardData]);

  return (
    <PostForm
      data={data}
      setData={setData}
      onSubmit={(e) => {
        e.preventDefault();
        patchArticle({
          id: boardId,
          data: {
            ...data,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
          },
        });
      }}
    />
  );
}
