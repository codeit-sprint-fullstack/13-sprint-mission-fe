"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/lib/api";
import { resolveImageUrl } from "@/app/lib/fetchClient";

const MAX_IMAGES = 3;

/**
 * 상품 이미지 등록/수정용 업로더입니다. 파일 선택 즉시 서버에 업로드하고,
 * 응답으로 받은 경로를 미리보기로 보여줍니다. 최대 3개까지 등록할 수 있습니다.
 * @param {{ images: string[], onChange: (images: string[]) => void }} props
 */
export default function ImageUploader({ images, onChange }) {
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const canAddMore = images.length + uploadingCount < MAX_IMAGES;

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    const availableSlots = MAX_IMAGES - images.length - uploadingCount;
    const filesToUpload = files.slice(0, availableSlots);
    if (filesToUpload.length === 0) return;

    setError("");
    setUploadingCount((c) => c + filesToUpload.length);
    try {
      const urls = await Promise.all(filesToUpload.map((file) => uploadImage(file)));
      onChange([...images, ...urls]);
    } catch {
      setError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setUploadingCount((c) => c - filesToUpload.length);
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {canAddMore && (
          <label className="w-25 h-25 flex flex-col items-center justify-center gap-1 border border-dashed border-secondary-300 rounded-xl cursor-pointer text-secondary-400 hover:border-primary hover:text-primary transition-colors">
            <span className="text-2xl leading-none">+</span>
            <span className="text-xs">이미지 등록</span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </label>
        )}

        {images.map((url, index) => (
          <div
            key={url}
            className="relative w-25 h-25 rounded-xl overflow-hidden border border-secondary-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveImageUrl(url)}
              alt={`상품 이미지 ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              aria-label="이미지 삭제"
              className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white text-xs leading-none"
            >
              ×
            </button>
          </div>
        ))}

        {Array.from({ length: uploadingCount }).map((_, i) => (
          <div
            key={`uploading-${i}`}
            className="w-25 h-25 flex items-center justify-center rounded-xl border border-secondary-200 text-secondary-400 text-xs text-center px-2"
          >
            업로드 중...
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs text-secondary-400">
        이미지는 최대 {MAX_IMAGES}개까지 등록할 수 있습니다. ({images.length}/{MAX_IMAGES})
      </p>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
