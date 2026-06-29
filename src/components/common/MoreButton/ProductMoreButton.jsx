"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import { userService } from "@/lib/services/userService";
import { deleteProductAction } from "@/lib/services/actions/products";

import MoreButtonBase from "@/components/common/MoreButton/MoreButtonBase";
import ConfirmModal from "@/components/common/Modal/ConfirmModal";
import { useQuery } from "@tanstack/react-query";

/** 상품 상세페이지 상단 영역 - 상품 정보 섹션 더보기 버튼 컴포넌트 */
export default function ProductMoreButton({ productId }) {
  const router = useRouter();
  const { user, getToken, isInitialized } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 확인 모달

  /** 내 상품 여부 확인 */
  const { data: isMyProduct = false } = useQuery({
    queryKey: ["myProducts", user?.id],
    queryFn: async () => {
      const myProducts = await userService.getMyProducts();
      return myProducts.list.some((p) => p.id === parseInt(productId, 10));
    },
    enabled: !!user && isInitialized, // 로그인 + 초기화 후에만 실행
  });

  /** 상품 삭제 모달 오픈 핸들러 */
  function handleProductDeleteModal() {
    setIsModalOpen(true);
  }

  /** 삭제 모달 확인 버튼 클릭 핸들러 */
  async function handleModalConfirm() {
    try {
      const token = getToken();
      const result = await deleteProductAction(productId, token);
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
        onEdit={() => router.push(`/products/${productId}/edit`)}
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
