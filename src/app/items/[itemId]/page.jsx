"use client";

import { use, useEffect, useState } from "react";
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

function CommentItem({ comment, currentUserId, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  function handleEditSubmit(e) {
    e.preventDefault();
    onEdit(comment.id, editValue);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-2 py-4 border-b border-gray-100 last:border-0">
      {editing ? (
        <form onSubmit={handleEditSubmit} className="flex gap-2">
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-primary text-white rounded-lg text-sm"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            취소
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-800">{comment.content}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            {comment.writer.image ? (
              <Image
                src={comment.writer.image}
                alt={comment.writer.nickname}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/icons/ic_profile.svg"
                alt="프로필"
                width={32}
                height={32}
              />
            )}
          </div>
          <span className="text-xs text-gray-500">{comment.writer.nickname}</span>
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        {currentUserId === comment.writer.id && !editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-gray-500 hover:text-gray-800"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItemDetailPage({ params }) {
  const { itemId } = use(params);
  const router = useRouter();
  const { user, isInitialized } = useAuth();
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProduct(itemId),
    enabled: !!user,
  });

  const { data: commentsData } = useQuery({
    queryKey: ["product-comments", itemId],
    queryFn: () => getProductComments(itemId, { limit: 20 }),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: () => router.push("/items"),
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isFavorite ? unfavoriteProduct(itemId) : favoriteProduct(itemId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product", itemId] }),
  });

  const addCommentMutation = useMutation({
    mutationFn: (content) => createProductComment(itemId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-comments", itemId] });
      setCommentInput("");
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) => updateComment(commentId, content),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product-comments", itemId] }),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product-comments", itemId] }),
  });

  if (!isInitialized || !user) return null;
  if (isLoading)
    return <p className="text-center py-20 text-gray-500">로딩 중...</p>;
  if (isError || !product)
    return (
      <p className="text-center py-20 text-red-500">
        상품을 불러오지 못했습니다.
      </p>
    );

  const isOwner = user?.id === product.ownerId;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* 상품 이미지 + 기본 정보 */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-80 aspect-square rounded-2xl overflow-hidden bg-gray-100 shrink-0">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            {isOwner && (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/items/${itemId}/edit`)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  수정
                </button>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="px-3 py-1 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
            )}
          </div>

          <p className="text-3xl font-bold text-gray-900">
            {product.price.toLocaleString()}원
          </p>

          <hr className="border-gray-200" />

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">상품 소개</p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">상품 태그</p>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => favoriteMutation.mutate()}
              disabled={favoriteMutation.isPending}
              className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                product.isFavorite
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
              }`}
            >
              <Image
                src="/icons/ic_heart.svg"
                alt="좋아요"
                width={16}
                height={16}
              />
              <span>찜하기</span>
              <span>({product.favoriteCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">문의</h2>

        {/* 댓글 작성 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (commentInput.trim())
              addCommentMutation.mutate(commentInput.trim());
          }}
          className="flex flex-col gap-2"
        >
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            className="w-full h-24 px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!commentInput.trim() || addCommentMutation.isPending}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-40"
            >
              등록
            </button>
          </div>
        </form>

        {/* 댓글 목록 */}
        {commentsData?.list?.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">
            아직 문의가 없습니다.
          </p>
        )}
        {commentsData?.list?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={user?.id}
            onDelete={(id) => deleteCommentMutation.mutate(id)}
            onEdit={(id, content) =>
              editCommentMutation.mutate({ commentId: id, content })
            }
          />
        ))}
      </div>

      {/* 목록으로 돌아가기 */}
      <div className="flex justify-center">
        <Link
          href="/items"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold"
        >
          목록으로 돌아가기
          <Image src="/icons/ic_back.svg" alt="" width={16} height={16} />
        </Link>
      </div>

      {/* 삭제 확인 모달 */}
      {deleteModal && (
        <ConfirmModal
          title="상품 삭제"
          message="정말로 이 상품을 삭제하시겠습니까?"
          onClick={() => {
            setDeleteModal(false);
            deleteMutation.mutate();
          }}
          onExit={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
}