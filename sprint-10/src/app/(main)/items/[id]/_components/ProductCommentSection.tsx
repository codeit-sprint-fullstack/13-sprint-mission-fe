"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "@/entities/product";
import { CommentSection, type Comment } from "@/entities/comment";
import { useAuth } from "@/entities/user";
import EmptyInquiry from "@/assets/png/Img_inquiry_empty.png";

export default function ProductCommentSection({ productId }: { productId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ["productComments", productId];

  const { data: comments, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await commentApi.getComments(productId);
      return res?.list ?? [];
    },
    staleTime: 30 * 1000,
  });

  const handleCreate = async (content: string) => {
    await commentApi.createComment(productId, content);
    await queryClient.invalidateQueries({ queryKey });
  };

  const handleUpdate = async (commentId: string, content: string) => {
    const updated = await commentApi.updateComment(commentId, content);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).map((c) => (c.id === commentId ? { ...c, content: updated.content } : c)),
    );
  };

  const handleDelete = async (commentId: string) => {
    await commentApi.deleteComment(commentId);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).filter((c) => c.id !== commentId),
    );
  };

  if (isPending || !comments) {
    return <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <CommentSection
      comments={comments}
      currentUserId={user?.id}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      title="문의하기"
      placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민법상 책임은 게시자에게 있습니다."
      emptyImage={EmptyInquiry}
      emptyText="아직 문의가 없어요"
    />
  );
}
