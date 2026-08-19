"use client";

import {
  editPostSchema,
  registerPostSchema,
  RegisterPostFormData,
} from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PostFormProps {
  type?: "register" | "edit";
  initialData?: Partial<RegisterPostFormData>;
  action: (formData: FormData) => void;
}

export default function PostForm({
  type = "register",
  initialData = {},
  action,
}: PostFormProps) {
  const schema = type === "edit" ? editPostSchema : registerPostSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const isEdit = type === "edit";

  return (
    <form
      action={action}
      className="text-secondary-800 mx-auto my-0 mt-[1.62rem] mb-[49.63rem] flex w-full max-w-300 flex-col gap-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[1.25rem] leading-8 font-bold">
          {isEdit ? "게시글 수정하기" : "게시글 쓰기"}
        </h2>
        <button
          className={isValid ? "btn" : "btn-disabled"}
          type="submit"
          disabled={!isValid}
        >
          {isEdit ? "수정" : "등록"}
        </button>
      </div>
      <section className="flex flex-col gap-6">
        <label className="flex flex-col gap-3">
          <div className="text-[1.125rem] leading-6.5 font-bold">*제목</div>
          <input
            {...register("title")}
            type="text"
            className="bg-cool-gray-100 h-14 rounded-xl px-6 py-4 outline-none"
            placeholder="제목을 입력해주세요"
          />
          {errors.title && (
            <p className="text-error-red">{errors.title.message}</p>
          )}
        </label>
        <label className="flex flex-col gap-3">
          <div className="text-[1.125rem] leading-6.5 font-bold">*내용</div>
          <textarea
            {...register("content")}
            className="bg-cool-gray-100 h-70.5 resize-none rounded-xl px-6 py-4 outline-none"
            placeholder="내용을 입력해주세요"
          />
          {errors.content && (
            <p className="text-error-red">{errors.content.message}</p>
          )}
        </label>
      </section>
    </form>
  );
}
