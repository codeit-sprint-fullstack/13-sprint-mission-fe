"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

const MAX_IMAGES = 3;

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

// 상품 이미지 업로드 (최대 3개). 파일 선택 즉시 업로드하고 URL 배열을 부모로 올린다
export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [overLimit, setOverLimit] = useState(false);

  function handlePickClick() {
    if (images.length >= MAX_IMAGES) {
      setOverLimit(true);
      return;
    }
    setOverLimit(false);
    inputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 재선택 허용
    if (!file) return;
    setIsUploading(true);
    try {
      const { url } = await uploadImage(file);
      onChange([...images, url]);
    } catch (err) {
      alert(getErrorMessage(err, "이미지 업로드에 실패했어요."));
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemove(url: string) {
    setOverLimit(false);
    onChange(images.filter((u) => u !== url));
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={handlePickClick}
          disabled={isUploading}
          className="flex size-[282px] flex-col items-center justify-center gap-3 rounded-xl bg-gray-100 text-base text-gray-400"
        >
          <span className="text-5xl font-thin leading-none">+</span>
          {isUploading ? "업로드 중..." : "이미지 등록"}
        </button>

        {images.map((url) => (
          <div
            key={url}
            className="relative size-[282px] overflow-hidden rounded-xl"
          >
            <Image
              src={url}
              alt="상품 이미지"
              fill
              sizes="282px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              aria-label="이미지 삭제"
              className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {overLimit && (
        <p className="text-sm text-red-500">
          *이미지 등록은 최대 {MAX_IMAGES}개까지 가능합니다.
        </p>
      )}
    </div>
  );
}
