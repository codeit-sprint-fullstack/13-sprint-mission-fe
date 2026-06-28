"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Heart, MoreVertical, RotateCcw, UserRound } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Modal from "@/components/common/Modal";
import ProductEditModal from "@/components/product/ProductEditModal";
import { commentApi, getErrorMessage, productApi } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queries";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,1120px)]";

export default function ItemDetailPage() {
  const params = useParams();
  const productId = Number(params.itemId);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [commentMenuId, setCommentMenuId] = useState(null);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/signin");
    }
  }, [router]);

  const productQuery = useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => productApi.detail(productId),
    enabled: Number.isFinite(productId) && Boolean(getAccessToken()),
  });

  const commentsQuery = useQuery({
    queryKey: queryKeys.comments(productId),
    queryFn: () => commentApi.list(productId),
    enabled: Number.isFinite(productId),
  });

  const updateProductMutation = useMutation({
    mutationFn: (payload) => productApi.update(productId, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.product(productId), updated);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowEdit(false);
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "상품 수정에 실패했어요.")),
  });

  const deleteProductMutation = useMutation({
    mutationFn: () => productApi.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/items");
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "상품 삭제에 실패했어요.")),
  });

  const favoriteMutation = useMutation({
    mutationFn: () => {
      const isFavorite = productQuery.data?.isFavorite;
      return isFavorite
        ? productApi.unfavorite(productId)
        : productApi.favorite(productId);
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.product(productId), updated);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "좋아요 요청에 실패했어요.")),
  });

  const createCommentMutation = useMutation({
    mutationFn: () => commentApi.create(productId, comment.trim()),
    onSuccess: () => {
      (setComment(""),
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments(productId),
        }));
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "댓글 등록에 실패했어요.")),
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, content }) => commentApi.update(id, content),
    onSuccess: () => {
      setEditingComment(null);
      queryClient.invalidateQueries({
        QueryKey: queryKeys.comments(productId),
      });
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "댓글 수정에 실패했어요")),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => commentApi.remove(commentId),
    onSuccess: () => {
      setCommentMenuId(null);
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments(productId),
      });
    },
    onError: (error) =>
      setModalMessage(getErrorMessage(error, "댓글 삭제에 실패했어요.")),
  });

  const product = productQuery.data;
  const image =
    product?.images?.[0] || "https://picsum.photos/seed/panda-detail/960/720";
  const formattedDate = useMemo(() => {
    if (!product?.createdAt) return "";
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(product.createdAt));
  }, [product?.createdAt]);

  return (
    <div className="bg-white text-[#1f2937]">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-17px)] pb-[130px] pt-[34px]`}
      >
        {productQuery.isLoading ? (
          <div className="rounded-lg bg-[#f3f4f6] p-[18px] text-[#6b7289]">
            상품 정보를 불러오는 중...
          </div>
        ) : null}
        {productQuery.isError ? (
          <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
            상품 상세 정보를 불러오지 못했어요.
          </p>
        ) : null}

        {product ? (
          <>
            <section className="grid grid-cols-1 gap-7 border-b border-[#e5e7eb] pb-8 desktop:grid-cols-[minmax(340px,486px)_1fr]">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f3f4f6]">
                <img
                  className="h-full w-full object-cover"
                  src={image}
                  alt={product.name}
                />
              </div>
              <article className="min-w-0">
                <div className="flex items-start justify-between gap-4 border-b border-[#e5e7eb] pb-[18px]">
                  <div>
                    <h1 className="mb-3 text-[26px] font-bold">
                      {product.name}
                    </h1>
                    <strong className="text-[32px] desktop:text-[48px]">
                      {product.price.toLocaleString("ko-KR")}원
                    </strong>
                  </div>
                  <div className="relative">
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600"
                      type="button"
                      aria-label="상품 메뉴"
                      onClick={() => setProductMenuOpen((value) => !value)}
                    >
                      <MoreVertical size={20} />
                    </button>
                    {productMenuOpen ? (
                      <div className="absolute right-0 top-full z-[5] w-[120px] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl">
                        <button
                          className="h-[42px] w-full border-0 bg-white"
                          type="button"
                          onClick={() => setShowEdit(true)}
                        >
                          수정하기
                        </button>
                        <button
                          className="h-[42px] w-full border-t border-[#e5e7eb] bg-white"
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          삭제하기
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="mb-3.5 text-base font-bold">상품 소개</h2>
                  <p className="whitespace-pre-line leading-[1.7] text-gray-600">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="mb-3.5 text-base font-bold">상품 태그</h2>
                  <div className="flex flex-wrap gap-2.5">
                    {product.tags?.map((tag) => (
                      <span
                        className="rounded-full bg-[#f3f4f6] px-3 py-2 text-[13px] text-gray-700"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-[42px] flex flex-col items-start justify-between gap-[18px] desktop:flex-row desktop:items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-300">
                      <UserRound size={22} />
                    </span>
                    <span>
                      <b>{product.ownerNickname || "판매자"}</b>
                      <small className="mt-1 block text-xs text-gray-400">
                        {formattedDate}
                      </small>
                    </span>
                  </div>
                  <button
                    className={`inline-flex min-h-[42px] items-center gap-[7px] rounded-full border px-[18px] ${product.favorite ? "border-red-200 bg-rose-50 text-[#ef4444]" : "border-[#e5e7eb] bg-white text-gray-600"}`}
                    type="button"
                    onClick={() => favoriteMutation.mutate()}
                    disabled={favoriteMutation.isPending}
                  >
                    <Heart size={20} />
                    {product.favoriteCount.toLocaleString("ko-KR")}
                  </button>
                </div>
              </article>
            </section>

            <section className="pt-[30px]">
              <h2 className="mb-3.5 text-base font-bold">문의하기</h2>
              <form
                className="grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (comment.trim()) createCommentMutation.mutate();
                }}
              >
                <textarea
                  className="min-h-[74px] w-full resize-y rounded-lg border-0 bg-[#f3f4f6] p-4 outline-none"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민원사상 책임은 게시자에게 있습니다."
                />
                <button
                  className="inline-flex h-[42px] min-w-[74px] items-center justify-center justify-self-end rounded-lg bg-gray-400 px-[18px] text-[16px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 enabled:bg-[#3692ff]"
                  type="submit"
                  disabled={!comment.trim() || createCommentMutation.isPending}
                >
                  등록
                </button>
              </form>

              {commentsQuery.isLoading ? (
                <div className="rounded-lg bg-[#f3f4f6] p-[18px] text-[#6b7280]">
                  댓글을 불러오는 중...
                </div>
              ) : null}
              {commentsQuery.isError ? (
                <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
                  댓들을 불러오지 못했어요.
                </p>
              ) : null}
              <div className="mt-[18px]">
                {commentsQuery.data?.list.map((item) => (
                  <article
                    className="relative border-b border-[#e5e7eb] py-5 pl-0 pr-11"
                    key={item.id}
                  >
                    <p className="mb-[18px]">{item.content}</p>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-300">
                        {item.writer.image ? (
                          <img
                            className="h-7 w-7 rounded-full object-cover"
                            src={item.writer.image}
                            alt=""
                          />
                        ) : (
                          <UserRound size={18} />
                        )}
                      </span>
                      <span>
                        <b>{item.writer.nickname}</b>
                        <small className="mt-1 block text-xs text-gray-400">
                          {timeAgo(item.createdAt)}
                        </small>
                      </span>
                    </div>
                    <div className="absolute right-0 top-3.5">
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600"
                        type="button"
                        aria-label="댓글 메뉴"
                        onClick={() =>
                          setCommentMenuId((value) =>
                            value === item.id ? null : item.id,
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>
                      {commentMenuId === item.id ? (
                        <div className="absolute right-0 top-full z-[5] w-[120px] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl">
                          <button
                            className="h-[42px] w-full bg-white"
                            type="button"
                            onClick={() => setEditingComment(item)}
                          >
                            수정하기
                          </button>
                          <button
                            className="h-[42px] w-full border-t border-[#e5e7eb] bg-white"
                            type="button"
                            onClick={() =>
                              deleteCommentMutation.mutate(item.id)
                            }
                          >
                            삭제하기
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="mt-[50px] flex justify-center">
              <button
                className="inline-flex min-h-[42px] min-w-[174px] items-center justify-center gap-2 rounded-full bg-[#3692ff] px-[18px] font-bold text-white"
                type="button"
                onClick={() => router.push("/items")}
              >
                목록으로 돌아가기
                <RotateCcw size={16} />
              </button>
            </div>
          </>
        ) : null}
      </main>
      <Footer />

      {showDeleteConfirm ? (
        <Modal
          title="상품 삭제"
          confirmText="삭제하기"
          cancelText="취소"
          danger
          busy={deleteProductMutation.isPending}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => deleteProductMutation.mutate()}
        >
          <p>이 상품을 삭제할까요? 삭제한 상품은 되돌릴 수 없어요.</p>
        </Modal>
      ) : null}

      {showEdit && product ? (
        <ProductEditModal
          product={product}
          busy={updateProductMutation.isPending}
          onClose={() => setShowEdit(false)}
          onSubmit={(payload) => updateProductMutation.mutate(payload)}
        />
      ) : null}

      {editingComment ? (
        <EditCommentModal
          comment={editingComment}
          busy={updateCommentMutation.isPending}
          onClose={() => setEditingComment(null)}
          onSubmit={(content) =>
            updateCommentMutation.mutate({ id: editingComment.id, content })
          }
        />
      ) : null}

      {modalMessage ? (
        <Modal title="알림" onClose={() => setModalMessage("")}>
          <p>{modalMessage}</p>
        </Modal>
      ) : null}
    </div>
  );
}

function EditCommentModal({ comment, busy, onClose, onSubmit }) {
  const [content, setContent] = useState(comment.content);
  return (
    <Modal
      title="댓글 수정"
      confirmText="저장하기"
      cancelText="취소"
      onClose={onClose}
      onConfirm={() => onSubmit(content)}
      busy={busy}
    >
      <textarea
        className="min-h-[120px] w-full resize-y rounded-lg border border-transparent bg-[#f3f4f6] p-3 text-[#1f2937] outline-none"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </Modal>
  );
}

function timeAgo(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}
