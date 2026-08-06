"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Plus, X } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getErrorMessage, articleApi, imageApi } from "@/lib/api";
import type { ArticleFormValues, FormErrors } from "@/types/api";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,780px])";
const inputClass =
  "w-full rounded-lg border-transparent bg-[#f3f4f6] px-[18px] py-4 text-[14px] text-[#1f2937] outline-none placeholder:text-[#9ca3af]";
const invalidClass = "border-[#ef4444] bg-red-50";

export default function ArticleCreatePage() {
  const router = useRouter();
  const [values, setValues] = useState<ArticleFormValues>({
    title: "",
    content: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors<ArticleFormValues>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateValue = (name: "title" | "content", value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors<ArticleFormValues> = {};
    if (!values.title.trim()) nextErrors.title = "제목을 입력해주세요";
    if (!values.content.trim()) nextErrors.content = "내용을 입력해주세요";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      const uploaded =
        files.length > 0 ? await imageApi.upload(files) : { imageUrls: [] };
      await articleApi.create({
        title: values.title.trim(),
        content: values.content.trim(),
        imageUrls: uploaded.imageUrls,
        images: uploaded.imageUrls,
      });
      router.push("/board");
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#1f2937]">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-170px)] pt-8 pb-[120px]`}
      >
        <form className="grid gap-4" onSubmit={submit}>
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-xl font-bold">게시글 쓰기</h1>
            <button
              className="inline-flex h-[42px] min-w-[74px] items-center justify-center rounded-lg bg-[#3692ff] px-[18px] font-bold text-white disabled:bg-gray-400"
              disabled={submitting}
            >
              {submitting ? "저장 중" : "등록"}
            </button>
          </div>
          <label className="font-bold" htmlFor="article-title">
            제목
          </label>
          <input
            id="article-title"
            className={`${inputClass} ${errors.title ? invalidClass : ""}`}
            value={values.title}
            onChange={(event) => updateValue("title", event.target.value)}
            placeholder="제목을 입력해주세요"
          />
          {errors.title ? (
            <p className="text-[13px] font-semibold text-[#ef4444]">
              {errors.title}
            </p>
          ) : null}
          <label className="mt-2 font-bold" htmlFor="article-content">
            내용
          </label>
          <textarea
            id="article-content"
            className={`${inputClass} min-h-[240px] resize-y ${errors.content ? invalidClass : ""}`}
            value={values.content}
            onChange={(event) => updateValue("content", event.target.value)}
            placeholder="내용을 입력해주세요"
          />
          {errors.content ? (
            <p className="text-[13px] font-semibold text-[#ef4444]">
              {errors.content}
            </p>
          ) : null}

          <label className="mt-2 font-bold">이미지</label>
          <div className="flex flex-wrap gap-3.5">
            {files.length < 3 ? (
              <label className="grid h-[168px] w-[168px] cursor-pointer place-content-center justify-items-center gap-2 rounded-lg bg-[#f3f4f6] text-[13px] text-gray-400">
                <Plus size={30} />
                <span>이미지 등록</span>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const selected = Array.from(event.target.files || []);
                    setFiles((current) =>
                      [...current, ...selected].slice(0, 3),
                    );
                    event.target.value = "";
                  }}
                />
              </label>
            ) : null}
            {files.map((file, index) => (
              <div
                className="relative h-[168px] w-[168px] overflow-hidden rounded-lg bg-[#f3f4f6]"
                key={`{file.name}-${index}`}
              >
                <img
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(file)}
                  alt="게시글 이미지 미리보기"
                />
                <button
                  className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white"
                  type="button"
                  onClick={() =>
                    setFiles((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  aria-label="이미지 삭제"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          {serverError ? (
            <p className="text-[13px] font-semibold text-[#ef4444]">
              {serverError}
            </p>
          ) : null}
        </form>
      </main>
    </div>
  );
}
