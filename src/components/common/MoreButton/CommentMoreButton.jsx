"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/providers/AuthProvider";
import { getAllProductComments } from "@/lib/services/productCommentApi";
import { deleteCommentAction } from "@/lib/services/actions/productComments";

import MoreButtonBase from "@/components/common/MoreButton/MoreButtonBase";
import Modal from "@/components/common/Modal/Modal";

/** 상품/게시글 상세페이지 - 댓글 컴포넌트 */
export default function CommentMoreButton({
  productId,
  commentId,
  setIsEditMode,
}) {
  const queryclient = useQueryClient();
  const { user, getToken, isInitialized } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 성공 상태 모달

  /** 사용자가 작성한 댓글 조회 */
  const { data: isMyComment = false } = useQuery({
    queryKey: ["comment", productId],
    queryFn: () => getAllProductComments(productId, 10),
    select: (data) =>
      data.list.some((c) => c.id === commentId && c.writer.id === user.id),
    enabled: !!user && isInitialized,
  });

  /** 댓글 삭제 핸들러 */
  async function handleCommentDelete() {
    try {
      const token = getToken();
      const result = await deleteCommentAction({
        token,
        productId,
        commentId,
      });

      if (result?.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  }

  /** 모달 확인 버튼 클릭 핸들러 */
  function handleModalConfirm() {
    setIsModalOpen(false);
    queryclient.invalidateQueries({ queryKey: ["comment", productId] });
  }

  if (!isMyComment) return null;

  return (
    <>
      <MoreButtonBase
        onEdit={() => setIsEditMode((prev) => !prev)}
        onDelete={handleCommentDelete}
      />

      {/* 댓글 삭제 알림 모달 */}
      <Modal
        description='댓글이 삭제되었습니다.'
        isOpen={isModalOpen}
        onClose={handleModalConfirm}
      />
    </>
  );
}
