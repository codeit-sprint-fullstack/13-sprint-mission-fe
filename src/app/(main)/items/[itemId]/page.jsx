"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { getProductComments } from "@/services/productCommentService";

import Image from "next/image";
import defaultItemImage from "@/assets/item_default.png";
import KebabDropdown from "@/components/common/KebabDropdown";
import Tag from "@/components/ui/Tag";
import WriterInfo from "@/components/common/WriterInfo";
import LikeButton from "@/components/common/LikeButton";
import CommentInput from "@/components/common/CommentInput";
import CommentReplyList from "@/components/common/CommentReplyList";
import NoCommentFallBack from "@/components/ui/NoCommentFallBack";
import BackToHomeButton from "@/components/common/BackToHomeButton";
import Modal from "@/components/common/Modal";
import { useAuth } from "@/providers/AuthProvider";
import { ITEM_ENDPOINT } from "@/constants/endpoint";
import { ROUTES } from "@/constants/navigation";

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { user } = useAuth();

  const [currentImg, setCurrentImg] = useState(defaultItemImage);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => productService.getDetail(itemId),
    enabled: !!itemId,
  });

  const { data: commentsData, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", "item", itemId],
    queryFn: () => getProductComments(itemId),
    enabled: !!itemId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => productService.delete(itemId),
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      router.push(`${ITEM_ENDPOINT}`);
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const product = productData?.data;
  const comments = commentsData?.list || [];

  useEffect(() => {
    if (product?.images?.[0]) {
      setCurrentImg(product.images[0]);
    }
  }, [product?.images]);

  if (isProductLoading || isCommentsLoading)
    return <div className="py-20 text-center">로딩 중입니다...</div>;
  if (isProductError || !product)
    return (
      <div className="py-20 text-center text-red-500">
        상품 정보를 불러오지 못했습니다.
      </div>
    );

  return (
    <div className="m-auto mb-69.25 flex w-full max-w-300 flex-col items-center gap-16 p-4">
      <section className="flex w-full flex-col items-start gap-10 self-stretch">
        <div className="flex w-full flex-col items-center gap-10 self-stretch">
          <div className="flex w-full flex-col items-center gap-6 self-stretch md:flex-row">
            <div className="relative h-121.5 w-full shrink-0 md:w-121.5">
              <Image
                className="rounded-2xl object-cover"
                src={currentImg}
                fill
                alt="상품 이미지"
                priority
                onError={() => setCurrentImg(defaultItemImage)}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-4 self-stretch">
                <div className="flex w-full items-start justify-between self-stretch">
                  <div className="flex flex-col items-start gap-2">
                    <h2 className="text-secondary-800 text-2xl font-semibold">
                      {product.name}
                    </h2>
                    <span className="text-secondary-800 text-[40px] font-semibold">
                      {product.price?.toLocaleString()}원
                    </span>
                  </div>
                  {user?.id === (product.writer?.id || product.ownerId) && (
                    <KebabDropdown
                      onEdit={() => router.push(ROUTES.ITEM.EDIT(itemId))}
                      onDelete={() => setIsDeleteModalOpen(true)}
                    />
                  )}
                </div>
                <div className="border-cool-gray-200 w-full border-b"></div>
              </div>
              <div className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <h3 className="text-secondary-600 text-lg font-semibold">
                    상품 소개
                  </h3>
                  <p className="text-secondary-600 text-lg font-normal whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <h3 className="text-secondary-600 text-lg font-semibold">
                    상품 태그
                  </h3>
                  <div className="flex flex-wrap items-start gap-2">
                    {product.tags?.map((tag, idx) => (
                      <Tag key={idx} name={tag} />
                    )) || (
                      <span className="text-sm text-gray-400">
                        등록된 태그가 없습니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <WriterInfo
                  writer={{
                    id: product.ownerId,
                    nickname: product.ownerNickname,
                  }}
                  createdAt={product.createdAt}
                />
                <div className="border-cool-gray-200 flex h-8.5 items-center gap-6 border-l pl-6">
                  <LikeButton
                    productId={itemId}
                    favoriteCount={product.likeCount}
                    isFavorite={product.isLiked}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-cool-gray-200 w-full border-b"></div>
      </section>

      <section className="flex flex-col items-start gap-10 self-stretch">
        <CommentInput productId={itemId} type="item" />
        <div className="flex w-full flex-col items-start gap-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentReplyList
                key={comment.id}
                comment={comment}
                productId={itemId}
                type="item"
              />
            ))
          ) : (
            <NoCommentFallBack />
          )}
        </div>
      </section>

      <div className="flex justify-center">
        <BackToHomeButton />
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        message="상품을 정말 삭제하시겠습니까?"
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="mt-4 flex w-full gap-2">
          <button
            className="btn-white w-1/2"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            취소
          </button>
          <button
            className="btn w-1/2 bg-red-500 text-white"
            onClick={() => deleteMutation.mutate()}
          >
            삭제
          </button>
        </div>
      </Modal>
    </div>
  );
}
