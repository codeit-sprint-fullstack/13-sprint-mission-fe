"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/AuthProvider";
import { deleteProduct } from "@/app/lib/api";
import KebabMenu from "@/app/components/ui/KebabMenu";
import ProductDeleteConfirmModal from "@/app/components/ui/ProductModal";

export default function ProductActions({ productId, ownerId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => router.push("/items"),
  });

  if (user?.id !== ownerId) return null;

  return (
    <>
      <KebabMenu
        onEdit={() => router.push(`/items/${productId}/edit`)}
        onDelete={() => setShowDeleteModal(true)}
      />
      {showDeleteModal && (
        <ProductDeleteConfirmModal
          title="상품을 삭제하시겠어요?"
          message="정말로 상품을 삭제하시겠어요?"
          onClick={() => {
            setShowDeleteModal(false);
            deleteMutation.mutate();
          }}
          onExit={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
