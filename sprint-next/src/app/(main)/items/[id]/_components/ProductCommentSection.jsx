"use client";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/services/clientApiService";
import CommentSection from "@/components/ui/CommentSection";
import EmptyInquiry from "@/assets/png/Img_inquiry_empty.png";

export default function ProductCommentSection({ productId }) {
  const { data: comments, isPending } = useQuery({
    queryKey: ["productComments", String(productId)],
    queryFn: async () => {
      const data = await clientApi.get(`/products/${productId}/comments?limit=10`);
      return data?.list ?? [];
    },
    staleTime: 30 * 1000,
  });

  const createAction = (content) =>
    clientApi.post(`/products/${productId}/comments`, { content });

  const updateAction = (commentId, content) =>
    clientApi.patch(`/comments/${commentId}`, { content });

  const deleteAction = (commentId) =>
    clientApi.delete(`/comments/${commentId}`);

  if (isPending) return <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />;

  return (
    <CommentSection
      initialComments={comments ?? []}
      createAction={createAction}
      updateAction={updateAction}
      deleteAction={deleteAction}
      title="문의하기"
      notice="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민법상 책임은 게시자에게 있습니다."
      emptyImage={EmptyInquiry}
      emptyText="아직 문의가 없어요"
    />
  );
}
