"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleApi } from "@/entities/article";
import Modal from "@/shared/ui/Modal";
import { postSchema, type PostValues } from "../model/postSchema";

const TITLE_MAX = 10;
const CONTENT_MAX = 100;

type PostFormProps = {
  articleId?: string;
  initialTitle?: string;
  initialContent?: string;
};

type ModalState = {
  message: string;
  onClose: () => void;
};

export default function PostForm({
  articleId,
  initialTitle = "",
  initialContent = "",
}: PostFormProps) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState | null>(null);
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

  const onSubmit = async (values: PostValues) => {
    try {
      if (articleId) {
        await articleApi.updateArticle(articleId, values);
        router.push(`/boards/${articleId}`);
      } else {
        await articleApi.createArticle(values.title, values.content);
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
      </form>
    </>
  );
}
