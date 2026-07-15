"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  deleteProduct,
  addFavorite,
  removeFavorite,
} from "@/api/product";
import { getMe } from "@/api/user";
import ProductDetail from "./_components/ProductDetail";
import CommentsSection from "./_components/CommentsSection";
import DeleteModal from "./_components/DeleteModal";
import Link from "next/link";
import Image from "next/image";

export default function ItemDetailPage() {
  const { itemsId: itemId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (!t) router.push("/signin");
    setToken(t);
    getMe().then((me) => setMyId(me?.id)).catch(() => {});
  }, [])

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProduct(itemId),
    enabled: !!token && !!itemId,
  });

  useEffect(() => {
    if (product) setIsFavorite(product.isLiked);
  }, [product]);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: () => router.push("/items"),
  });

  const { mutate: favoriteMutate } = useMutation({
    mutationFn: () =>
      isFavorite ? removeFavorite(itemId) : addFavorite(itemId),
    onSuccess: () => {
      setIsFavorite((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["product", itemId] });
    },
  });

  if (isLoading) {
    return (
      <main className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-20 md:px-6">
        <p className="text-gray-400">불러오는 중...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-20 md:px-6">
        <p className="text-error">상품 정보를 불러오지 못했습니다.</p>
        <Link href="/items" className="text-primary-100 underline">
          목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 md:px-6">
      <ProductDetail
        product={product}
        isFavorite={isFavorite}
        onFavoriteToggle={favoriteMutate}
        isOwner={myId && product?.owner?.id === myId}
        onEdit={() => router.push(`/items/${itemId}/edit`)}
        onDelete={() => setShowDeleteModal(true)}
      />

      <CommentsSection productId={itemId} />

      <div className="flex justify-center">
        <Link
          href="/items"
          className="bg-primary-100 flex items-center gap-2 rounded-full px-13 py-3 text-lg font-semibold text-white"
        >
          목록으로 돌아가기
          <Image src="/image/ic_back.svg" alt="back" width={24} height={24} />
        </Link>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={() => {
            deleteMutate();
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </main>
  );
}
