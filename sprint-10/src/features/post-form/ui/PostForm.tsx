"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { articleApi } from "@/entities/article";
import { resolveImageUrl } from "@/shared/lib/resolveImageUrl";
import Modal from "@/shared/ui/Modal";
import PlusIcon from "@/assets/svg/ic_plus.svg";
import { postSchema, type PostValues } from "../model/postSchema";

const TITLE_MAX = 10;
const CONTENT_MAX = 100;
const MAX_IMAGES = 5;

type PostFormProps = {
  articleId?: string;
  initialTitle?: string;
  initialContent?: string;
  initialImages?: string[];
};

type ModalState = {
  message: string;
  onClose: () => void;
};

export default function PostForm({
  articleId,
  initialTitle = "",
  initialContent = "",
  initialImages = [],
}: PostFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<ModalState | null>(null);
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!articleId;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: { title: initialTitle, content: initialContent },
  });

  const title = useWatch({ control, name: "title" });
  const content = useWatch({ control, name: "content" });
  const titleLength = title?.trim().length ?? 0;
  const contentLength = content?.trim().length ?? 0;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const filesToUpload = files.slice(0, MAX_IMAGES - images.length);
    setIsUploading(true);
    try {
      const uploaded = await articleApi.uploadImages(filesToUpload);
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

  const onSubmit = async (values: PostValues) => {
    try {
      if (articleId) {
        await articleApi.updateArticle(articleId, { ...values, images });
        await queryClient.invalidateQueries({ queryKey: ["article", articleId] });
        await queryClient.invalidateQueries({ queryKey: ["articles"] });
        router.push(`/boards/${articleId}`);
      } else {
        await articleApi.createArticle(values.title, values.content, images);
        await queryClient.invalidateQueries({ queryKey: ["articles"] });
        router.push("/boards");
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
          <h1 className="font-bold text-lg">{isEdit ? "게시글 수정하기" : "게시글 등록하기"}</h1>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-100 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-200"
          >
            {isEdit ? "수정" : "등록"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800">*제목</label>
            <span
              className={`text-xs ${titleLength > TITLE_MAX ? "text-red-500" : "text-gray-400"}`}
            >
              {titleLength}/{TITLE_MAX}
            </span>
          </div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 ${
              errors.title ? "ring-1 ring-red-400" : ""
            }`}
            {...register("title")}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800">*내용</label>
            <span
              className={`text-xs ${contentLength > CONTENT_MAX ? "text-red-500" : "text-gray-400"}`}
            >
              {contentLength}/{CONTENT_MAX}
            </span>
          </div>
          <textarea
            placeholder="내용을 입력해주세요"
            rows={10}
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 resize-none ${
              errors.content ? "ring-1 ring-red-400" : ""
            }`}
            {...register("content")}
          />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-800">이미지</label>
          <div className="flex flex-wrap gap-3">
            {images.map((url, index) => (
              <div
                key={url}
                className="relative w-39 h-39 rounded-2xl overflow-hidden border border-gray-200 shrink-0"
              >
                <Image
                  src={resolveImageUrl(url)}
                  alt={`이미지 ${index + 1}`}
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
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </form>
    </>
  );
}
