"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import { deleteProductAction } from "@/lib/actions/products";

import MoreButtonBase from "@/components/common/MoreButton/MoreButtonBase";
import ConfirmModal from "@/components/common/Modal/ConfirmModal";

/** 상품 상세페이지 상단 영역 - 상품 정보 섹션 더보기 버튼 컴포넌트 */
export default function ProductMoreButton({
  productId,
  ownerId,
}: {
  productId: string | number;
  ownerId: number;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 확인 모달

  /** 내 상품 여부 확인 */
  const isMyProduct = !!user && user.id === ownerId;

  /** 상품 삭제 모달 오픈 핸들러 */
  function handleProductDeleteModal() {
    setIsModalOpen(true);
  }

  /** 삭제 모달 확인 버튼 클릭 핸들러 */
  async function handleModalConfirm() {
    try {
      const result = await deleteProductAction(productId);

      if (result?.success) {
        router.push("/items");
      }
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  }

  if (!isMyProduct) return null;

  return (
    <>
      <MoreButtonBase
        onEdit={() => router.push(`/items/${productId}/edit`)}
        onDelete={handleProductDeleteModal}
      />
      <ConfirmModal
        description='정말로 상품을 삭제하시겠어요?'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
