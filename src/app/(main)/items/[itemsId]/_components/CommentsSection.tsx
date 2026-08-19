"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductComments,
  createProductComment,
  updateProductComment,
  deleteProductComment,
} from "@/api/productComments";
import { getMe } from "@/api/user";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";

interface CommentsSectionProps {
  productId: string;
}

export default function CommentsSection({ productId }: CommentsSectionProps) {
  const queryClient = useQueryClient();
  const queryKey = ["productComments", productId];
  const [myId, setMyId] = useState<number | null>(null);

  useEffect(() => {
    getMe()
      .then((me) => setMyId(me?.id ?? null))
      .catch(() => {});
  }, []);

  const { data: commentsData } = useQuery({
    queryKey,
    queryFn: () => getProductComments(productId, { limit: 10 }),
    enabled: !!productId,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const { mutate: createComment } = useMutation({
    mutationFn: (content: string) => createProductComment(productId, content),
    onSuccess: invalidate,
  });

  const { mutate: editComment } = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateProductComment(commentId, content),
    onSuccess: invalidate,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: number) => deleteProductComment(commentId),
    onSuccess: invalidate,
  });

  const comments = commentsData?.list ?? [];

  return (
    <>
      <CommentForm
        onSubmit={createComment}
        heading="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <CommentList
        comments={comments}
        onEdit={(id, content) => editComment({ commentId: id, content })}
        onDelete={deleteComment}
        myId={myId}
        emptyImageSrc="/image/Img_inquiry_empty.png"
        emptyImageAlt="문의없음"
        emptyMessage="아직 문의가 없어요"
      />
    </>
  );
}