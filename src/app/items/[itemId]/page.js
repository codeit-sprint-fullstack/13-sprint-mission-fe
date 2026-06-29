"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId } = useParams();
  const queryClient = useQueryClient();

  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: async () => {
      const res = await api.get(`/products/${itemId}`);
      return res.data;
    },
  });

  const { data: comments = [], isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", itemId],
    queryFn: async () => {
      const res = await api.get(`/products/${itemId}/comments`, {
        params: { limit: 100 },
      });
      return res.data.list || [];
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: () => api.delete(`/products/${itemId}`),
    onSuccess: () => {
      alert("상품이 삭제되었습니다.");
      router.push("/items");
    },
    onError: () => alert("상품 삭제에 실패했습니다."),
    onSettled: () => setIsDeleteModalOpen(false),
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (isFavorite) =>
      isFavorite
        ? api.delete(`/products/${itemId}/favorite`)
        : api.post(`/products/${itemId}/favorite`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", itemId] });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        alert("로그인이 필요한 기능입니다.");
      } else {
        console.error(error);
      }
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (content) =>
      api.post(`/products/${itemId}/comments`, { content }),
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
    },
    onError: () => alert("댓글 등록에 실패했습니다."),
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      api.patch(`/comments/${commentId}`, { content }),
    onSuccess: () => {
      setEditingCommentId(null);
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
    },
    onError: () => alert("댓글 수정에 실패했습니다."),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => api.delete(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", itemId] });
    },
    onError: () => alert("댓글 삭제에 실패했습니다."),
  });

  const handleEditProduct = () => router.push(`/items/${itemId}/edit`);
  const handleDeleteProduct = () => deleteProductMutation.mutate();
  const toggleFavorite = () => {
    if (product) toggleFavoriteMutation.mutate(product.isFavorite);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  const handleEditCommentSubmit = (commentId) => {
    editCommentMutation.mutate({ commentId, content: editCommentText });
  };

  const handleDeleteComment = (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    deleteCommentMutation.mutate(commentId);
  };

  if (isProductLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <p className="text-lg font-medium text-gray-500">
          데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (isProductError || !product) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <p className="text-lg font-medium text-red-500">
          상품 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-screen-lg bg-[#F9FAFB] px-4 py-8">
      <div className="flex flex-col gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:flex-row">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 md:w-1/2">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/500"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full flex-col md:w-1/2">
          <div className="relative flex items-start justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

            <button
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              className="p-2 text-gray-500"
            >
              ⋮
            </button>
            {isProductMenuOpen && (
              <div className="absolute right-0 top-8 z-10 w-24 rounded border bg-white text-sm shadow-lg">
                <button
                  onClick={handleEditProduct}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  수정하기
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>

          <p className="mt-2 text-3xl font-semibold">
            {product.price?.toLocaleString()}원
          </p>

          <div className="mt-6 flex-1 border-t pt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-600">
              상품 소개
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold text-gray-600">
              상품 태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <Image
                  src="/Frame 2609463.png"
                  width={40}
                  height={40}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {product.owner?.nickname || "판매자"}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                product.isFavorite
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              <span>{product.isFavorite ? "♥" : "♡"}</span>
              <span>{product.favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-gray-800">문의하기</h2>

        <div className="mb-6 rounded-lg border bg-gray-50 p-4">
          <textarea
            className="w-full resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            rows={3}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || addCommentMutation.isPending}
              className="rounded bg-gray-300 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {addCommentMutation.isPending ? "등록 중..." : "등록"}
            </button>
          </div>
        </div>

        {isCommentsLoading ? (
          <div className="py-10 text-center text-sm text-gray-400">
            댓글을 불러오는 중입니다...
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="group relative rounded-lg border bg-white p-4"
              >
                {editingCommentId === comment.id ? (
                  <div className="flex w-full items-center gap-2">
                    <input
                      type="text"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="flex-1 rounded border bg-gray-50 p-2 text-sm outline-none"
                    />
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-sm text-gray-500"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleEditCommentSubmit(comment.id)}
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                    >
                      수정 완료
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenCommentMenuId(
                            openCommentMenuId === comment.id
                              ? null
                              : comment.id,
                          )
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ⋮
                      </button>
                      {openCommentMenuId === comment.id && (
                        <div className="absolute right-0 top-6 z-10 w-24 rounded border bg-white text-sm shadow-lg">
                          <button
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditCommentText(comment.content);
                              setOpenCommentMenuId(null);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            수정하기
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                  <span className="text-xs font-medium text-gray-600">
                    {comment.writer?.nickname}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="mb-4 h-32 w-32 bg-[url('/empty-panda.png')] bg-contain bg-center bg-no-repeat opacity-50"></div>
            <p>아직 문의가 없어요</p>
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center pb-20">
        <button
          onClick={() => router.push("/items")}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          목록으로 돌아가기
          <Image src="/ic_back.png" alt="Back Arrow" width={16} height={16} />
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex w-full max-w-sm flex-col items-center rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-500">
              ✓
            </div>
            <h3 className="mb-8 text-lg font-semibold text-gray-800">
              정말로 상품을 삭제하시겠어요?
            </h3>
            <div className="flex w-full gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 rounded-lg border border-red-400 py-3 font-medium text-red-500 hover:bg-red-50"
              >
                취소
              </button>
              <button
                onClick={handleDeleteProduct}
                disabled={deleteProductMutation.isPending}
                className="flex-1 rounded-lg bg-red-500 py-3 font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleteProductMutation.isPending ? "삭제 중..." : "네"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
