"use client";

import Modal from "@/components/common/modal";
import {
  deleteProduct,
  favoriteProduct,
  getProductsById,
  Product,
  unfavoriteProduct,
} from "@/lib/ProductApi";
import { getToken } from "@/lib/authService";
import { useAuth } from "@/providers/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductEditableImages from "./ProductEditableImages";
import ProductInfoSection from "./ProductInfoSection";
import useProductEdit from "./useProductEdit";

export default function ProductsDetail({ productId }: { productId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brokenSrc, setBrokenSrc] = useState<string | null>(null);
  const swiperElRef = useRef(null);

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductsById(productId, getToken()),
  });

  const {
    MAX_IMAGES,
    isEditing,
    editForm,
    setEditForm,
    existingImages,
    newImages,
    isUpdating,
    startEditing,
    cancelEditing,
    handleUpdate,
    handleEditFileChange,
    handleRemoveExistingImage,
    handleRemoveNewImage,
  } = useProductEdit(productId, product);

  useEffect(() => {
    const productImages = product?.images;
    if (!swiperElRef.current || !productImages?.length) return;

    const swiperInstance = new Swiper(swiperElRef.current, {
      modules: [Navigation, Pagination],
      loop: productImages.length > 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    return () => {
      swiperInstance.destroy(true, true);
    };
  }, [product?.images, isEditing]);

  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => router.push("/items"),
    onError: (err) => alert(err.message),
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: () =>
      product?.isLiked
        ? unfavoriteProduct(productId)
        : favoriteProduct(productId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", productId] });
      const previousProduct = queryClient.getQueryData(["product", productId]);

      queryClient.setQueryData(
        ["product", productId],
        (old: Product | undefined) =>
          old && {
            ...old,
            isLiked: !old.isLiked,
            favoriteCount: old.isLiked
              ? old.favoriteCount - 1
              : old.favoriteCount + 1,
          },
      );

      return { previousProduct };
    },
    onError: (err, _variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ["product", productId],
          context.previousProduct,
        );
      }
      alert(err.message);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["product", productId] }),
  });

  if (!product) return <div className="mt-6 text-gray-400">불러오는 중...</div>;

  const {
    name,
    description,
    price,
    tags,
    images,
    favoriteCount,
    createdAt,
    ownerNickname,
    ownerId,
    isLiked,
  } = product;

  const isOwner = user?.id === ownerId;

  const date = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <>
      <div className="flex flex-row mt-6 gap-6 pb-10 border-b border-gray-200">
        {isEditing ? (
          <ProductEditableImages
            existingImages={existingImages}
            newImages={newImages}
            maxImages={MAX_IMAGES}
            onFileChange={handleEditFileChange}
            onRemoveExisting={handleRemoveExistingImage}
            onRemoveNew={handleRemoveNewImage}
          />
        ) : (
          <div className="relative shrink-0 overflow-hidden rounded-2xl size-121.5">
            <div className="swiper size-full" ref={swiperElRef}>
              <div className="swiper-wrapper">
                {(images?.length ? images : ["/images/alt_image.png"]).map(
                  (src, index) => (
                    <div
                      className="swiper-slide relative size-full"
                      key={`${src}-${index}`}
                    >
                      <Image
                        src={src === brokenSrc ? "/images/alt_image.png" : src}
                        alt={`${name} ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={() => setBrokenSrc(src)}
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>
        )}
        <ProductInfoSection
          name={name}
          price={price}
          description={description}
          tags={tags}
          isEditing={isEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          isOwner={isOwner}
          onEdit={startEditing}
          onDelete={() => setShowDeleteModal(true)}
          ownerNickname={ownerNickname}
          date={date}
          isLiked={isLiked}
          favoriteCount={favoriteCount}
          onToggleFavorite={() => toggleFavorite()}
          onCancelEdit={cancelEditing}
          onSave={() => editForm && handleUpdate(editForm)}
          isUpdating={isUpdating}
        />
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete()}
        title="정말로 상품을 삭제하시겠어요?"
        confirmText="네"
        cancelText="취소"
        variant="danger"
        icon
      ></Modal>
    </>
  );
}
