"use client";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateArticle } from "@/api/articles";
import { uploadImage } from "@/api/upload";
import { getAccessToken } from "@/lib/authStorage";

const MAX_IMAGES = 3;

interface EditFormProps {
  id: string;
  initialTitle: string;
  initialContent: string;
  initialImages?: string[];
}

export default function EditForm({ id, initialTitle, initialContent, initialImages = [] }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState<string[]>(initialImages);
  const [previews, setPreviews] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!getAccessToken()) router.push("/signin");
  }, []);

  const isValid = title.trim() && content.trim();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - images.length;
    const selected = files.slice(0, remaining);

    const newPreviews = selected.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);

    const uploaded = await Promise.all(selected.map((file) => uploadImage(file).then((res) => res.url)));

    setImages((prev) => [...prev, ...uploaded]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    if (!initialImages.includes(previews[index])) {
      URL.revokeObjectURL(previews[index]);
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = await updateArticle(id, { title, content, images });
    router.push(`/freeboard/${data.id}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">게시물 수정</h2>
        <button onClick={handleSubmit} disabled={!isValid} className="btn_small_40">
          수정
        </button>
      </div>
      <div className="mb-4 flex flex-col">
        <label className="text-md font-bold text-gray-800 md:text-2lg">*제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-3 w-full rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="text-md font-bold text-gray-800 md:text-2lg">*내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-3 h-70.5 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-lg text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="text-md font-bold text-gray-800 md:text-2lg">이미지</label>
        <div className="mt-3 flex flex-wrap gap-4">
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[168px] w-[168px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-400 lg:h-[282px] lg:w-[282px]"
            >
              <span className="text-4xl">+</span>
              <span className="text-base">이미지 등록</span>
            </button>
          )}
          {previews.map((src, i) => (
            <div key={i} className="relative h-[168px] w-[168px] lg:h-[282px] lg:w-[282px]">
              <Image src={src} alt={`preview-${i}`} fill className="rounded-xl object-cover" unoptimized />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}