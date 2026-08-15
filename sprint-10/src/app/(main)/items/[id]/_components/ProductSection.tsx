"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi, type Product } from "@/entities/product";
import { useAuth } from "@/entities/user";
import { formatDate } from "@/shared/lib/formatDate";
import KebabMenu from "@/shared/ui/KebabMenu";
import AlertModal from "@/shared/ui/AlertModal";
import ImageGallery from "@/shared/ui/ImageGallery";
import DefaultImg from "@/assets/png/img_board_default.png";
import DefaultProfile from "@/assets/png/img_default_profile.png";
import HeartIcon from "@/assets/svg/ic_heart.svg";

export default function ProductSection({ productId }: { productId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ["product", productId];
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => productApi.getProduct(productId),
    staleTime: 60 * 1000,
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isLiked ? productApi.unlikeProduct(productId) : productApi.likeProduct(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData<Product>(queryKey);
      queryClient.setQueryData<Product | undefined>(queryKey, (old) =>
        old
          ? {
              ...old,
              isLiked: !old.isLiked,
              favoriteCount: old.isLiked ? old.favoriteCount - 1 : old.favoriteCount + 1,
            }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) queryClient.setQueryData(queryKey, context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => productApi.deleteProduct(productId),
    onSuccess: () => router.push("/items"),
  });

  const isOwner = product?.userId === user?.id;

  const handleEdit = () => {
    if (!isOwner) {
      setShowPermissionModal(true);
      return;
    }
    router.push(`/items/${productId}/edit`);
  };

  const handleDelete = () => {
    if (!isOwner) {
      setShowPermissionModal(true);
      return;
    }
    if (!confirm("상품을 삭제하시겠습니까?")) return;
    deleteMutation.mutate();
  };

  const menuOptions = [
    { label: "수정하기", onClick: handleEdit },
    { label: "삭제하기", onClick: handleDelete },
  ];

  if (isPending) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;
  if (isError)
    return <p className="text-center text-gray-500 py-10">상품 정보를 불러오지 못했습니다.</p>;
  if (!product) return null;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-gray-200">
        <ImageGallery
          images={product.images}
          alt={product.name}
          fallbackSrc={DefaultImg}
          className="w-full md:w-[48%] aspect-square rounded-2xl"
        />

        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
            <KebabMenu options={menuOptions} />
          </div>

          <p className="text-3xl font-bold text-gray-900">
            {product.price?.toLocaleString()}원
          </p>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-2">상품 소개</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {product.tags.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">상품 태그</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-800 bg-gray-100 px-4 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 border-gray-200">
            <div className="flex items-center gap-2">
              <Image
                src={product.user?.image ?? DefaultProfile}
                alt="프로필"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
                unoptimized={!!product.user?.image}
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {product.user?.nickname ?? "판매자"}
                </p>
                <p className="text-xs text-gray-400">{formatDate(product.createdAt)}</p>
              </div>
            </div>

            <button
              onClick={() => favoriteMutation.mutate()}
              disabled={favoriteMutation.isPending}
              className={`flex items-center gap-1.5 border rounded-full px-4 py-2 text-sm transition-colors ${
                product.isLiked
                  ? "border-primary-100 text-primary-100"
                  : "border-gray-200 text-gray-600 hover:border-primary-100"
              }`}
            >
              <Image src={HeartIcon} alt="좋아요" width={16} height={16} />
              <span>{product.favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>

      {showPermissionModal && (
        <AlertModal
          message="본인이 등록한 상품만 수정, 삭제할 수 있습니다."
          onClose={() => setShowPermissionModal(false)}
        />
      )}
    </>
  );
}
