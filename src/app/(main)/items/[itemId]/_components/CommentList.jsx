"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CommentItem from "./CommentItem";

export default function CommentList() {
  const { itemId } = useParams();
  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", itemId],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://panda-market-api.vercel.app/products/${itemId}/comments?limit=4`,
        );
        if (!res.ok) throw new Error("문의 댓글 불러오기 실패");
        const data = await res.json();
        console.log(data);
        return data.list;
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (isPending) return <p>로딩 중...</p>;

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
