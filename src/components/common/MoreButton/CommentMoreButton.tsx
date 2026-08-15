"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { deleteCommentAction } from "@/lib/actions/productComments";

import MoreButtonBase from "@/components/common/MoreButton/MoreButtonBase";
import Modal from "@/components/common/Modal/Modal";

/** 상품/게시글 상세페이지 - 댓글 컴포넌트 */
export default function CommentMoreButton({
  productId,
  commentId,
  isMyComment,
  setIsEditMode,
}: {
  productId: string | number;
  commentId: number;
  isMyComment: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const queryclient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 성공 상태 모달

  /** 댓글 삭제 핸들러 */
  async function handleCommentDelete() {
    try {
      const result = await deleteCommentAction({
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
