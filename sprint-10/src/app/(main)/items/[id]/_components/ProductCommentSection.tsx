"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commentApi, type Comment } from "@/entities/product";
import { useAuth } from "@/entities/user";
import AlertModal from "@/shared/ui/AlertModal";
import EmptyInquiry from "@/assets/png/Img_inquiry_empty.png";
import CommentItem from "./CommentItem";

export default function ProductCommentSection({ productId }: { productId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ["productComments", productId];
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const { data: comments, isPending } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await commentApi.getComments(productId);
      return res?.list ?? [];
    },
    staleTime: 30 * 1000,
  });

  const handleCreate = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await commentApi.createComment(productId, newComment.trim());
      await queryClient.invalidateQueries({ queryKey });
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (commentId: string, content: string) => {
    const updated = await commentApi.updateComment(commentId, content);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).map((c) => (c.id === commentId ? { ...c, content: updated.content } : c)),
    );
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    await commentApi.deleteComment(commentId);
    queryClient.setQueryData<Comment[]>(queryKey, (prev) =>
      (prev ?? []).filter((c) => c.id !== commentId),
    );
  };

  if (isPending || !comments) {
    return <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-base">문의하기</h2>

        <div className="flex flex-col gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민법상 책임은 게시자에게 있습니다."
            rows={4}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={!newComment.trim() || isSubmitting}
              className="bg-primary-100 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-200"
            >
              등록
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <Image src={EmptyInquiry} alt="댓글 없음" width={140} height={140} />
              <p className="text-sm text-gray-400 text-center whitespace-pre-line">
                아직 문의가 없어요
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onUnauthorized={() => setShowPermissionModal(true)}
              />
            ))
          )}
        </div>
      </div>

      {showPermissionModal && (
        <AlertModal
          message="본인이 작성한 댓글만 수정, 삭제할 수 있습니다."
          onClose={() => setShowPermissionModal(false)}
        />
      )}
    </>
  );
}
