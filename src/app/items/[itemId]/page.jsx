"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import ConfirmModal from "@/app/components/ui/Modal";
import {
  getProduct,
  deleteProduct,
  favoriteProduct,
  unfavoriteProduct,
  getProductComments,
  createProductComment,
  updateComment,
  deleteComment,
} from "@/app/lib/api";
import KebabMenu from "@/app/components/ui/KebabMenu";

const PROFILE_ICON = "/icons/ic_profile.svg";
const HEART_ICON = "/icons/ic_heart.svg";
const VECTOR_IMG = "/images/Img_Vector_683.svg";
const ARROW_BACK_ICON = "/icons/ic_back.svg";
const EMPTY_COMMENT_IMG = "/images/Img_article.svg";

export default function ItemDetailPage({ params }) {
  const { itemId } = use(params);
  const productId = Number(itemId);

  const [commentInput, setCommentInput] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const { data: commentsData } = useQuery({
    queryKey: ["product-comments", productId],
    queryFn: () => getProductComments(productId),
  });

  const comments = commentsData?.list ?? [];

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isFavorite
        ? unfavoriteProduct(productId)
        : favoriteProduct(productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product", productId] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => router.push("/items"),
  });

  const handleCreateComment = async () => {
    if (!commentInput.trim()) return;
    setSubmittingComment(true);
    try {
      await createProductComment(productId, commentInput);
      setCommentInput("");
      queryClient.invalidateQueries({
        queryKey: ["product-comments", productId],
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;
    await updateComment(commentId, editContent);
    setEditingId(null);
    queryClient.invalidateQueries({
      queryKey: ["product-comments", productId],
    });
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    queryClient.invalidateQueries({
      queryKey: ["product-comments", productId],
    });
  };

  const handleStartEditComment = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  if (isLoading)
    return <p className="text-center py-20 text-gray-500">로딩 중...</p>;
  if (isError || !product)
    return (
      <p className="text-center py-20 text-red-500">
        상품을 불러올 수 없습니다.
      </p>
    );

  const isOwner = user?.id === product.ownerId;

  return (
    <div>
      {/* 상품 상세 상단 */}
      <div className="flex flex-col pb-6 border-b border-secondary-100 mb-8 gap-6 md:flex-row">
        {/* 이미지 */}
        <div>
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              width={486}
              height={486}
              className="rounded-2xl object-cover w-121.5 h-121.5"
            />
            //    <Image className="rounded-2xl object-cover"
          )}
        </div>
        {/* 우측 정보 */}
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-secondary-800 leading-snug flex-1">
              {product.name}
            </h1>
            {isOwner && (
              <KebabMenu
                onEdit={() => router.push(`/items/${productId}/edit`)}
                onDelete={() => deleteMutation.mutate()}
              />
            )}
          </div>
          <span className="text-3xl font-bold text-secondary-800 mb-4">
            {product.price.toLocaleString()}원
          </span>
          <hr className="border-secondary-100 mb-6" />
          <div className="mb-4">
            <h3 className="text-sm font-medium text-secondary-600 mb-4">
              상품 소개
            </h3>
            <span className="text-secondary-600 mb-6">
              {product.description}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-secondary-600 mb-4">
              상품 태그
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-secondary-100 rounded-full text-sm text-secondary-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-secondary-500 mt-auto">
            <div className="flex flex-row gap-4">
              <Image
                src={PROFILE_ICON}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col items-center">
                <span className="text-secondary-600">
                  {product.ownerNickname}
                </span>
                <span className="ml-2 text-secondary-400">
                  {new Date(product.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\. /g, ". ")}
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <Image src={VECTOR_IMG} alt="" width={1} height={34} />
              <button
                onClick={() => favoriteMutation.mutate()}
                className={`ml-auto flex items-center gap-1.5 px-3 py-1 border rounded-full text-secondary-500 transition-colors ${
                  product.isFavorite
                    ? "border-primary text-primary"
                    : "border-secondary-200"
                }`}
              >
                <Image src={HEART_ICON} alt="" width={16} height={16} />
                <span>{product.favoriteCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Comment Input ── */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-secondary-900 mb-3">문의하기</h2>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          rows={4}
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreateComment}
            disabled={!commentInput.trim() || submittingComment}
            className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary disabled:cursor-not-allowed"
          >
            {submittingComment ? "등록 중..." : "등록"}
          </button>
        </div>
      </section>
      {/* ── 문의하기 ── */}
      <section className="mb-12">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <Image
              src={EMPTY_COMMENT_IMG}
              alt="문의 없음"
              width={140}
              height={140}
            />
            <p className="text-sm text-secondary-400 mt-2">
              아직 문의가 없어요,
            </p>
            <p className="text-sm text-secondary-400">
              지금 문의를 남겨보세요!
            </p>
          </div>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="py-5 border-b border-secondary-100"
              >
                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary transition mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 text-xs border border-secondary-200 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={!editContent.trim()}
                        className="px-4 py-1.5 text-xs bg-primary text-white rounded-lg disabled:bg-secondary-400 transition-colors"
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm text-secondary-800 flex-1">
                        {comment.content}
                      </p>
                      <KebabMenu
                        onEdit={() => handleStartEditComment(comment)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-400">
                      <Image
                        src={PROFILE_ICON}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-secondary-600">
                        {comment.writer?.nickname}
                      </span>
                      <span className="text-secondary-400">|</span>
                      <span>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "ko-KR"
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* ── Back to list ── */}
      <div className="flex justify-center">
        <Link
          href="/items"
          className="flex w-60 h-12 px-16 py-3 items-center justify-center gap-2 shrink-0 rounded-[40px] bg-primary text-white font-medium transition-colors whitespace-nowrap"
        >
          목록으로 돌아가기
          <Image
            src={ARROW_BACK_ICON}
            alt="목록으로 돌아가기"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}
