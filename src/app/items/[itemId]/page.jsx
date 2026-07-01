"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/app/lib/api";
import Modal from "@/app/components/common/Modal";
import defaultImage from "@/app/assets/images/default.svg";
import icHeart from "@/app/assets/images/icons/ic_heart.svg";
import icProfile from "@/app/assets/images/icons/ic_profile.svg";
import icBlank from "@/app/assets/images/icons/ic_blank.svg";

const COMMENTS_LIMIT = 10;

const formatPrice = (price) => `${Number(price || 0).toLocaleString()}원`;

const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
};

const isValidImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return false;
  }

  if (imageUrl.includes("...")) {
    return false;
  }

  return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
};

const getCommentList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.list)) {
    return data.list;
  }

  if (Array.isArray(data?.comments)) {
    return data.comments;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

const getProduct = async (itemId) => {
  const response = await api.get(`/products/${itemId}`, {
    requiresAuth: true,
  });

  return response.data;
};

const getComments = async (itemId) => {
  const response = await api.get(`/products/${itemId}/comments`, {
    params: {
      limit: COMMENTS_LIMIT,
    },
    requiresAuth: true,
  });

  return response.data;
};

const favoriteProduct = async (itemId) => {
  const response = await api.post(
    `/products/${itemId}/favorite`,
    {},
    {
      requiresAuth: true,
    },
  );

  return response.data;
};

const unfavoriteProduct = async (itemId) => {
  const response = await api.delete(`/products/${itemId}/favorite`, {
    requiresAuth: true,
  });

  return response.data;
};

const deleteProduct = async (itemId) => {
  const response = await api.delete(`/products/${itemId}`, {
    requiresAuth: true,
  });

  return response.data;
};

const createComment = async ({ itemId, content }) => {
  const response = await api.post(
    `/products/${itemId}/comments`,
    { content },
    {
      requiresAuth: true,
    },
  );

  return response.data;
};

const updateComment = async ({ commentId, content }) => {
  const response = await api.patch(
    `/comments/${commentId}`,
    { content },
    {
      requiresAuth: true,
    },
  );

  return response.data;
};

const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`, {
    requiresAuth: true,
  });

  return response.data;
};

function DetailImage({ product }) {
  const imageUrl = product.images?.[0];

  if (isValidImageUrl(imageUrl)) {
    return (
      <div
        className="aspect-square w-full rounded-lg bg-panda-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={product.name}
      />
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-panda-100">
      <Image
        src={defaultImage}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 743px) 100vw, (max-width: 1199px) 48vw, 486px"
      />
    </div>
  );
}

function ProfileImage({ writer }) {
  if (isValidImageUrl(writer?.image)) {
    return (
      <div
        className="h-10 w-10 rounded-full bg-panda-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${writer.image})` }}
        aria-label={writer.nickname}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-panda-100">
      <Image src={icProfile} alt="" width={24} height={24} />
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-6 md:grid-cols-[minmax(0,46%)_1fr] lg:grid-cols-[486px_1fr]">
        <div className="aspect-square rounded-lg bg-panda-200" />
        <div>
          <div className="h-7 w-2/3 rounded bg-panda-200" />
          <div className="mt-3 h-10 w-1/2 rounded bg-panda-200" />
          <div className="mt-8 h-px bg-panda-200" />
          <div className="mt-6 h-4 w-20 rounded bg-panda-200" />
          <div className="mt-3 h-4 w-full rounded bg-panda-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-panda-200" />
          <div className="mt-8 flex gap-2">
            <div className="h-8 w-20 rounded-full bg-panda-200" />
            <div className="h-8 w-20 rounded-full bg-panda-200" />
            <div className="h-8 w-20 rounded-full bg-panda-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  isEditing,
  editingContent,
  isMenuOpen,
  isUpdating,
  onChangeEditingContent,
  onStartEdit,
  onCancelEdit,
  onSubmitEdit,
  onOpenMenu,
  onDelete,
}) {
  return (
    <li className="border-b border-panda-200 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div>
              <textarea
                value={editingContent}
                onChange={(event) => onChangeEditingContent(event.target.value)}
                className="h-24 w-full resize-none rounded-lg bg-panda-100 px-4 py-3 text-sm text-panda-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-blue"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="h-9 rounded-lg bg-panda-200 px-4 text-sm font-semibold text-panda-600 transition-colors hover:bg-panda-300"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={onSubmitEdit}
                  disabled={!editingContent.trim() || isUpdating}
                  className="h-9 rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-panda-300"
                >
                  {isUpdating ? "수정 중..." : "수정"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium leading-6 text-panda-900">
              {comment.content}
            </p>
          )}
          <div className="mt-4 flex items-center gap-3">
            <ProfileImage writer={comment.writer} />
            <div>
              <p className="text-xs font-semibold text-panda-600">
                {comment.writer?.nickname || "익명"}
              </p>
              <p className="mt-1 text-xs text-panda-400">
                {formatDate(comment.createdAt)}
              </p>
            </div>
          </div>
        </div>
        {!isEditing && (
          <div className="relative">
            <button
              type="button"
              onClick={onOpenMenu}
              className="text-xl leading-none text-panda-400"
              aria-label="댓글 메뉴"
              aria-expanded={isMenuOpen}
            >
              ⋮
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-[120px] overflow-hidden rounded-lg border border-panda-200 bg-white shadow-lg">
                <button
                  type="button"
                  onClick={onStartEdit}
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-panda-900 transition-colors hover:bg-panda-100"
                >
                  수정하기
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-panda-100"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const itemId = params.itemId;
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentMenuId, setCommentMenuId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const productQuery = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProduct(itemId),
    enabled: Boolean(itemId),
    staleTime: 1000 * 30,
  });

  const commentsQuery = useQuery({
    queryKey: ["product-comments", itemId, COMMENTS_LIMIT],
    queryFn: () => getComments(itemId),
    enabled: Boolean(itemId),
    staleTime: 1000 * 10,
    refetchOnWindowFocus: true,
  });

  const product = productQuery.data;
  const comments = getCommentList(commentsQuery.data);
  const invalidateProductQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["product", itemId] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  const invalidateCommentQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["product-comments", itemId, COMMENTS_LIMIT],
    });
    queryClient.invalidateQueries({ queryKey: ["product", itemId] });
  };

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isFavorite ? unfavoriteProduct(itemId) : favoriteProduct(itemId),
    onSuccess: () => {
      invalidateProductQueries();
    },
    onError: () => {
      setActionError("좋아요 처리에 실패했습니다.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.removeQueries({ queryKey: ["product", itemId] });
      router.replace("/items");
    },
    onError: () => {
      setIsDeleteModalOpen(false);
      setActionError("상품 삭제에 실패했습니다.");
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: () =>
      createComment({
        itemId,
        content: commentContent.trim(),
      }),
    onSuccess: () => {
      setCommentContent("");
      invalidateCommentQueries();
    },
    onError: () => {
      setActionError("댓글 등록에 실패했습니다.");
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: () =>
      updateComment({
        commentId: editingCommentId,
        content: editingCommentContent.trim(),
      }),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditingCommentContent("");
      invalidateCommentQueries();
    },
    onError: () => {
      setActionError("댓글 수정에 실패했습니다.");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(deletingCommentId),
    onSuccess: () => {
      setDeletingCommentId(null);
      invalidateCommentQueries();
    },
    onError: () => {
      setDeletingCommentId(null);
      setActionError("댓글 삭제에 실패했습니다.");
    },
  });

  const handleToggleFavorite = () => {
    if (favoriteMutation.isPending) {
      return;
    }

    favoriteMutation.mutate();
  };

  const handleDeleteProduct = () => {
    deleteMutation.mutate();
  };

  const handleCreateComment = () => {
    if (!commentContent.trim() || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate();
  };

  const handleStartEditComment = (comment) => {
    setCommentMenuId(null);
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };

  const handleUpdateComment = () => {
    if (!editingCommentContent.trim() || updateCommentMutation.isPending) {
      return;
    }

    updateCommentMutation.mutate();
  };

  const handleDeleteComment = () => {
    if (!deletingCommentId || deleteCommentMutation.isPending) {
      return;
    }

    deleteCommentMutation.mutate();
  };

  if (productQuery.isLoading) {
    return (
      <div className="w-full pb-20">
        <DetailSkeleton />
      </div>
    );
  }

  if (productQuery.isError) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-lg bg-white px-4 text-center">
        <p className="text-lg font-bold text-panda-900">
          상품 정보를 불러오지 못했습니다.
        </p>
        <p className="mt-2 text-sm text-panda-500">
          로그인 상태 또는 상품 정보를 확인해 주세요.
        </p>
        <Link
          href="/items"
          className="mt-6 rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <section className="grid gap-6 md:grid-cols-[minmax(0,46%)_1fr] lg:grid-cols-[486px_1fr] lg:gap-8">
        <DetailImage product={product} />

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-panda-900 md:text-2xl">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl font-bold text-panda-900 md:text-3xl">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsProductMenuOpen(
                    (prevIsProductMenuOpen) => !prevIsProductMenuOpen,
                  )
                }
                className="text-xl leading-none text-panda-400"
                aria-label="상품 메뉴"
                aria-expanded={isProductMenuOpen}
              >
                ⋮
              </button>

              {isProductMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-[120px] overflow-hidden rounded-lg border border-panda-200 bg-white shadow-lg">
                  <Link
                    href={`/items/${itemId}/edit`}
                    className="block px-4 py-3 text-sm font-medium text-panda-900 transition-colors hover:bg-panda-100"
                    onClick={() => setIsProductMenuOpen(false)}
                  >
                    수정하기
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProductMenuOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-panda-100"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="my-6 h-px bg-panda-200" />

          <div>
            <h2 className="text-sm font-bold text-panda-900">상품 소개</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-panda-600">
              {product.description || "상품 설명이 없습니다."}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-bold text-panda-900">상품 태그</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(product.tags || []).length > 0 ? (
                product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-panda-100 px-3 py-1.5 text-xs font-medium text-panda-600"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-panda-400">등록된 태그 없음</span>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-panda-100">
                <Image src={icProfile} alt="" width={24} height={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-panda-900">
                  {product.ownerNickname || "판매자"}
                </p>
                <p className="mt-1 text-xs text-panda-400">
                  {formatDate(product.createdAt)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favoriteMutation.isPending}
              className={`flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                product.isFavorite
                  ? "border-brand-blue bg-[#E6F2FF] text-brand-blue"
                  : "border-panda-200 bg-white text-panda-600 hover:bg-panda-50"
              }`}
              aria-pressed={Boolean(product.isFavorite)}
            >
              <Image src={icHeart} alt="좋아요" width={18} height={18} />
              {product.favoriteCount || 0}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-bold text-panda-900">문의하기</h2>
        <textarea
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 제재될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className="h-[104px] w-full resize-none rounded-lg bg-panda-100 px-5 py-4 text-sm text-panda-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-blue"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleCreateComment}
            disabled={!commentContent.trim() || createCommentMutation.isPending}
            className="h-10 rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-panda-300"
          >
            {createCommentMutation.isPending ? "등록 중..." : "등록"}
          </button>
        </div>
      </section>

      <section className="mt-6">
        {commentsQuery.isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`comment-skeleton-${index}`}
                className="animate-pulse border-b border-panda-200 py-5"
              >
                <div className="h-4 w-3/4 rounded bg-panda-200" />
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-panda-200" />
                  <div>
                    <div className="h-3 w-20 rounded bg-panda-200" />
                    <div className="mt-2 h-3 w-16 rounded bg-panda-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : commentsQuery.isError ? (
          <div className="rounded-lg bg-white py-12 text-center text-sm font-medium text-red-500">
            문의 댓글을 불러오지 못했습니다.
          </div>
        ) : comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isEditing={editingCommentId === comment.id}
                editingContent={editingCommentContent}
                isMenuOpen={commentMenuId === comment.id}
                isUpdating={updateCommentMutation.isPending}
                onChangeEditingContent={setEditingCommentContent}
                onStartEdit={() => handleStartEditComment(comment)}
                onCancelEdit={handleCancelEditComment}
                onSubmitEdit={handleUpdateComment}
                onOpenMenu={() =>
                  setCommentMenuId((prevCommentMenuId) =>
                    prevCommentMenuId === comment.id ? null : comment.id,
                  )
                }
                onDelete={() => {
                  setCommentMenuId(null);
                  setDeletingCommentId(comment.id);
                }}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Image src={icBlank} alt="" width={120} height={120} />
            <p className="mt-4 text-sm font-medium text-panda-400">
              아직 문의가 없어요
            </p>
          </div>
        )}
      </section>

      <div className="mt-12 flex justify-center">
        <Link
          href="/items"
          className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          목록으로 돌아가기
        </Link>
      </div>

      <Modal
        open={isDeleteModalOpen}
        title="상품 삭제"
        message="정말 상품을 삭제하시겠어요?"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
        labelledBy="delete-product-title"
        confirmText={deleteMutation.isPending ? "삭제 중..." : "삭제"}
        showCancel
        isConfirmDisabled={deleteMutation.isPending}
      />

      <Modal
        open={Boolean(actionError)}
        title="요청 실패"
        message={actionError}
        onClose={() => setActionError("")}
        labelledBy="product-action-error-title"
      />

      <Modal
        open={Boolean(deletingCommentId)}
        title="댓글 삭제"
        message="정말 댓글을 삭제하시겠어요?"
        onClose={() => setDeletingCommentId(null)}
        onConfirm={handleDeleteComment}
        labelledBy="delete-comment-title"
        confirmText={deleteCommentMutation.isPending ? "삭제 중..." : "삭제"}
        showCancel
        isConfirmDisabled={deleteCommentMutation.isPending}
      />
    </div>
  );
}
