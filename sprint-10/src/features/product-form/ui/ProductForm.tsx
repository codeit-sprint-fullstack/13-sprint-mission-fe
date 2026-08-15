"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/entities/product";
import { resolveImageUrl } from "@/shared/lib/resolveImageUrl";
import Modal from "@/shared/ui/Modal";
import PlusIcon from "@/assets/svg/ic_plus.svg";
import { productSchema, type ProductValues } from "../model/productSchema";

const MAX_IMAGES = 3;
const TAG_MAX = 5;

type ProductFormProps = {
  productId?: string;
  initialName?: string;
  initialDescription?: string;
  initialPrice?: number;
  initialTags?: string[];
  initialImages?: string[];
};

type ModalState = {
  message: string;
  onClose: () => void;
};

export default function ProductForm({
  productId,
  initialName = "",
  initialDescription = "",
  initialPrice,
  initialTags = [],
  initialImages = [],
}: ProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalState | null>(null);
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!productId;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: initialName,
      description: initialDescription,
      price: initialPrice != null ? initialPrice.toLocaleString("ko-KR") : "",
    },
  });

  const priceRegister = register("price");

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = raw ? Number(raw).toLocaleString("ko-KR") : "";
    priceRegister.onChange(e);
  };

  const name = useWatch({ control, name: "name" });
  const nameLength = name?.trim().length ?? 0;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const filesToUpload = files.slice(0, MAX_IMAGES - images.length);
    setIsUploading(true);
    try {
      const uploaded = await productApi.uploadImages(filesToUpload);
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setModal({
        message: err instanceof Error ? err.message : "이미지 업로드에 실패했습니다.",
        onClose: () => setModal(null),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = tagInput.trim();
    if (!value) return;
    if (value.length > TAG_MAX) {
      setTagError(`태그는 ${TAG_MAX}글자 이하로 입력해주세요.`);
      return;
    }
    if (tags.includes(value)) {
      setTagError("이미 추가된 태그입니다.");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
    setTagError(null);
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onSubmit = async (values: ProductValues) => {
    const payload = {
      name: values.name,
      description: values.description,
      price: Number(values.price.replace(/,/g, "")),
      tags,
      images,
    };

    try {
      if (productId) {
        await productApi.updateProduct(productId, payload);
        await queryClient.invalidateQueries({ queryKey: ["product", productId] });
        await queryClient.invalidateQueries({ queryKey: ["products"] });
        router.push(`/items/${productId}`);
      } else {
        const created = await productApi.createProduct(payload);
        await queryClient.invalidateQueries({ queryKey: ["products"] });
        router.push(`/items/${created.id}`);
      }
    } catch (err) {
      setModal({
        message: err instanceof Error ? err.message : "오류가 발생했습니다.",
        onClose: () => setModal(null),
      });
    }
  };

  return (
    <>
      {modal && <Modal message={modal.message} onClose={modal.onClose} />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">{isEdit ? "상품 수정하기" : "상품 등록하기"}</h1>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-100 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-200"
          >
            {isEdit ? "수정" : "등록"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">상품 이미지</label>
          <div className="flex flex-wrap gap-3">
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-39 h-39 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 text-gray-400 hover:border-primary-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image src={PlusIcon} alt="" width={24} height={24} />
                <span className="text-sm">{isUploading ? "업로드 중..." : "이미지 등록"}</span>
              </button>
            )}

            {images.map((url, index) => (
              <div
                key={url}
                className="relative w-39 h-39 rounded-2xl overflow-hidden border border-gray-200 shrink-0"
              >
                <Image
                  src={resolveImageUrl(url)}
                  alt={`상품 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/50 text-white text-xs leading-none"
                  aria-label="이미지 삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-xs text-red-500">*이미지 등록은 최대 {MAX_IMAGES}개까지 가능합니다.</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800">상품명</label>
            <span className="text-xs text-gray-400">{nameLength}/10</span>
          </div>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 ${
              errors.name ? "ring-1 ring-red-400" : ""
            }`}
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            rows={6}
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 resize-none ${
              errors.description ? "ring-1 ring-red-400" : ""
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">판매가격</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="판매가격을 입력해주세요"
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 ${
              errors.price ? "ring-1 ring-red-400" : ""
            }`}
            {...priceRegister}
            onChange={handlePriceChange}
          />
          {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">태그</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              setTagError(null);
            }}
            onKeyDown={handleTagKeyDown}
            placeholder="태그를 입력하고 Enter를 눌러주세요"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400"
          />
          {tagError && <p className="text-xs text-red-500">{tagError}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label={`${tag} 태그 삭제`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
