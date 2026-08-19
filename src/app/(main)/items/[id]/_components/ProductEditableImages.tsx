"use client";

import Image from "next/image";

export default function ProductEditableImages({
  existingImages,
  newImages,
  maxImages,
  onFileChange,
  onRemoveExisting,
  onRemoveNew,
}: {
  existingImages: string[];
  newImages: { file: File; previewUrl: string }[];
  maxImages: number;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveExisting: (index: number) => void;
  onRemoveNew: (index: number) => void;
}) {
  const total = existingImages.length + newImages.length;

  return (
    <div className="flex gap-3 flex-wrap w-121.5 shrink-0 content-start">
      {total < maxImages && (
        <label className="shrink-0 flex flex-col items-center justify-center gap-1 border border-gray-300 rounded-xl bg-gray-100 text-gray-400 cursor-pointer size-36">
          <span className="text-2xl">+</span>
          <span className="text-sm">
            이미지 등록 ({total}/{maxImages})
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      )}
      {existingImages.map((url, i) => (
        <div key={url} className="relative shrink-0 size-36">
          <Image
            src={url}
            alt={`상품 이미지 ${i + 1}`}
            fill
            className="rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={() => onRemoveExisting(i)}
            className="absolute -top-2 -right-2 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow cursor-pointer text-gray-500 size-6"
          >
            ×
          </button>
        </div>
      ))}
      {newImages.map((img, i) => (
        <div key={img.previewUrl} className="relative shrink-0 size-36">
          <Image
            src={img.previewUrl}
            alt={`새 이미지 ${i + 1}`}
            fill
            unoptimized
            className="rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={() => onRemoveNew(i)}
            className="absolute -top-2 -right-2 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow cursor-pointer text-gray-500 size-6"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
