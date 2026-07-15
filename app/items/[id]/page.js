"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  deleteProduct,
  favoriteProduct,
  unfavoriteProduct,
  getProductComments,
  createProductComment,
} from "../../../src/api/productApi";
import { useAuthContext } from "../../../src/context/AuthContext";
import { useRequireAuth } from "../../../src/hooks/useRequireAuth";

const DEFAULT_IMAGE = "https://placehold.co/480x480/f0f0f0/999?text=No+Image";
const DEFAULT_AVATAR = "https://placehold.co/40x40/e5e7eb/9ca3af?text=P";

function KebabMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-10 w-28 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-gray-50"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default function ItemDetailPage() {
  useRequireAuth();

  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const { data: commentsData } = useQuery({
    queryKey: ["productComments", productId],
    queryFn: () => getProductComments(productId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => router.push("/items"),
  });

  const favoriteMutation = useMutation({
    mutationFn: () =>
      product?.isLiked
        ? unfavoriteProduct(productId)
        : favoriteProduct(productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["product", productId] }),
  });

  const commentMutation = useMutation({
    mutationFn: () => createProductComment(productId, commentText),
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  if (isLoading)
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <p className="text-gray-400">불러오는 중...</p>
      </main>
    );

  if (isError || !product)
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <p className="text-gray-400">상품을 찾을 수 없습니다.</p>
      </main>
    );

  const price = (product.price || 0).toLocaleString("ko-KR") + "원";
  const comments = commentsData?.list || [];
  const isOwner = user?.id === product.ownerId;
  const createdAt = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
      <section className="mb-10 flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="relative w-full md:w-[480px] md:shrink-0">
          <img
            className="aspect-square w-full rounded-2xl object-cover bg-gray-100"
            src={product.images?.[0] || DEFAULT_IMAGE}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex items-start justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 md:text-[28px]">
              {product.name}
            </h1>
            {isOwner && (
              <KebabMenu
                onEdit={() => router.push(`/items/${productId}/edit`)}
                onDelete={() => setShowDeleteModal(true)}
              />
            )}
          </div>

          <strong className="mb-6 block border-b border-gray-200 pb-6 text-2xl font-bold text-gray-800 md:text-[32px]">
            {price}
          </strong>

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-gray-500">
              상품 소개
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-semibold text-gray-500">
                상품 태그
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-2xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3">
              <img
                src={product.ownerImage || DEFAULT_AVATAR}
                alt="판매자"
                className="h-10 w-10 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {product.ownerNickname || "판매자"}
                </p>
                <p className="text-xs text-gray-400">{createdAt}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => favoriteMutation.mutate()}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                product.isLiked
                  ? "border-panda-primary text-panda-primary"
                  : "border-gray-300 text-gray-500 hover:border-panda-primary hover:text-panda-primary"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill={product.isLiked ? "#3692ff" : "none"}
                stroke={product.isLiked ? "#3692ff" : "#9ca3af"}
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {product.likeCount ?? 0}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-base font-semibold text-gray-800">문의하기</h2>
        <textarea
          className="w-full rounded-xl bg-gray-50 p-4 text-sm outline-none ring-1 ring-gray-200 focus:ring-panda-primary"
          rows={4}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            disabled={!commentText.trim()}
            onClick={() => commentMutation.mutate()}
            className="rounded-lg bg-panda-primary px-6 py-2 text-sm font-semibold text-white hover:bg-panda-hover disabled:opacity-40"
          >
            등록
          </button>
        </div>

        <div className="mt-6 flex flex-col divide-y divide-gray-100">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-400">
              <img
                src="/image/panda.png"
                alt="댓글 없음"
                className="mb-4 h-16 w-16 opacity-30"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <p className="text-sm">아직 문의가 없습니다.</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="py-4">
                <p className="mb-2 text-sm text-gray-700">{comment.content}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={comment.writer?.image || DEFAULT_AVATAR}
                    alt="작성자"
                    className="h-8 w-8 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      {comment.writer?.nickname || "익명"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString(
                            "ko-KR",
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="flex justify-center">
        <Link
          href="/items"
          className="flex items-center gap-2 rounded-[40px] bg-panda-primary px-10 py-3 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active"
        >
          목록으로 돌아가기
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
            <p className="mb-6 text-center text-sm font-medium text-gray-700">
              정말 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border border-gray-300 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => deleteMutation.mutate()}
                className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
