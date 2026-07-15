"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getProduct,
  updateProduct,
  uploadImages,
} from "../../../../src/api/productApi";
import { useRequireAuth } from "../../../../src/hooks/useRequireAuth";

const DEFAULT_IMAGE = "https://placehold.co/300x300/f0f0f0/999?text=No+Image";

export default function ItemEditPage() {
  useRequireAuth();

  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCurrentImage(product.images?.[0] || "");
    }
  }, [product]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveNewImage() {
    setNewImageFile(null);
    setPreviewUrl("");
  }

  const updateMutation = useMutation({
    mutationFn: async () => {
      let images = currentImage ? [currentImage] : [];
      if (newImageFile) {
        images = await uploadImages([newImageFile]);
      }
      return updateProduct(productId, {
        name,
        description,
        price: Number(price),
        images,
      });
    },
    onSuccess: () => router.push(`/items/${productId}`),
    onError: (err) => setModalMessage(err.message || "수정에 실패했습니다."),
  });

  if (isLoading)
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <p>불러오는 중...</p>
      </main>
    );

  const shownImage = previewUrl || currentImage || DEFAULT_IMAGE;

  return (
    <main className="mx-auto max-w-[640px] px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-800">상품 수정</h1>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          상품 이미지
        </label>
        <div className="flex items-start gap-3">
          <div className="relative h-40 w-40 overflow-hidden rounded-xl">
            <img
              src={shownImage}
              alt="상품 이미지"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveNewImage}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-xs text-white"
                aria-label="새 이미지 취소"
              >
                ✕
              </button>
            )}
          </div>

          <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-400">
            <span className="text-3xl">+</span>
            <span className="text-sm">이미지 변경</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {previewUrl
            ? "새 이미지로 변경됩니다."
            : "이미지를 선택하면 교체됩니다."}
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          상품명
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-panda-primary"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          상품 설명
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-panda-primary"
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          가격
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none ring-1 ring-gray-200 focus:ring-panda-primary"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="button"
          onClick={() => updateMutation.mutate()}
          disabled={!name.trim() || updateMutation.isPending}
          className="flex-1 rounded-xl bg-panda-primary py-3 text-sm font-semibold text-white hover:bg-panda-hover disabled:opacity-40"
        >
          {updateMutation.isPending ? "수정 중..." : "수정 완료"}
        </button>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-center text-sm font-medium text-gray-700">
              {modalMessage}
            </p>
            <button
              onClick={() => setModalMessage("")}
              className="w-full rounded-xl bg-panda-primary py-2 text-sm font-semibold text-white hover:bg-panda-hover"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
