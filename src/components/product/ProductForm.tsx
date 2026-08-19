"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { getErrorMessage, imageApi, productApi } from "@/lib/api";
import type { FormErrors, ProductFormValues } from "@/types/api";

const inputClass =
  "w-full rounded-lg border border-transparent bg-[#f3f4f6] px-[18px] py-4 text-[14px] text-[#1f2937] outline-none placeholder:text-[#9ca3af]";
const invalidClass = "border-[#ef4444] bg-red-50";

function validate(values: ProductFormValues): FormErrors<ProductFormValues> {
  const errors: FormErrors<ProductFormValues> = {};
  if (!values.name.trim()) errors.name = "상품명을 입력해주세요";
  else if (values.name.trim().length > 10)
    errors.name = "10자 이내로 입력해주세요";
  if (!values.description.trim())
    errors.description = "상품 소개를 입력해주세요";
  else if (values.description.trim().length < 10)
    errors.description = "10자 이상 입력해주세요";
  if (!values.price.trim()) errors.price = "판매 가격을 입력해주세요";
  else if (!/^\d+$/.test(values.price.trim()))
    errors.price = "숫자로 입력해주세요";
  if (values.tagInput.trim().length > 5)
    errors.tagInput = "5글자 이내로 입력해주세요";
  return errors;
}

export default function ProductForm() {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    name: "",
    description: "",
    price: "",
    tagInput: "",
    tags: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors<ProductFormValues>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const previews = files.map((file) => URL.createObjectURL(file));

  const updateValue = (
    name: Exclude<keyof ProductFormValues, "tags">,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const addTag = () => {
    const tag = values.tagInput.trim().replace(/^#/, "");
    if (!tag) return;
    if (tag.length > 5) {
      setErrors((current) => ({
        ...current,
        tagInput: "5글자 이내로 입력해주세요",
      }));
      return;
    }
    if (!values.tags.includes(tag)) {
      setValues((current) => ({
        ...current,
        tags: [...current.tags, tag],
        tagInput: "",
      }));
    } else {
      updateValue("tagInput", "");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      const uploaded =
        files.length > 0 ? await imageApi.upload(files) : { imageUrls: [] };
      await productApi.create({
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags: values.tags,
        images: uploaded.imageUrls,
        imageUrls: uploaded.imageUrls,
      });
      router.push("/items");
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">상품 등록하기</h1>
        <button
          className="inline-flex h-[42px] min-w-[74px] items-center justify-center rounded-lg bg-[#3692ff] px-[18px] font-bold text-white disabled:bg-gray-400"
          disabled={submitting}
        >
          {submitting ? "저장 중" : "등록"}
        </button>
      </div>

      <label className="font-bold">상품 이미지</label>
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
                setFiles((current) => [...current, ...selected].slice(0, 3));
                event.target.value = "";
              }}
            />
          </label>
        ) : null}
        {previews.map((src, index) => (
          <div
            className="relative h-[168px] w-[168px] overflow-hidden rounded-lg bg-[#f3f4f6]"
            key={src}
          >
            <img
              className="h-full w-full object-cover"
              src={src}
              alt="상품 이미지 미리보기"
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

      <label className="mt-2 font-bold" htmlFor="product-name">
        상품명
      </label>
      <input
        id="product-name"
        className={`${inputClass} ${errors.name ? invalidClass : ""}`}
        value={values.name}
        onChange={(event) => updateValue("name", event.target.value)}
        placeholder="상품명을 입력해주세요"
      />
      {errors.name ? (
        <p className="text-[13px] font-semibold text-[#ef4444]">
          {errors.name}
        </p>
      ) : null}

      <label className="mt-2 font-bold" htmlFor="product-description">
        상품 소개
      </label>
      <textarea
        id="product-description"
        className={`${inputClass} min-h-[240px] resize-y ${errors.description ? invalidClass : ""}`}
        value={values.description}
        onChange={(event) => updateValue("description", event.target.value)}
        placeholder="상품 소개를 입력해주세요"
      />
      {errors.description ? (
        <p className="text-[13px] font-semibold text-[#ef4444]">
          {errors.description}
        </p>
      ) : null}

      <label className="mt-2 font-bold" htmlFor="product-price">
        판매가격
      </label>
      <input
        id="product-price"
        className={`${inputClass} ${errors.price ? invalidClass : ""}`}
        value={values.price}
        onChange={(event) => updateValue("price", event.target.value)}
        placeholder="판매 가격을 입력해주세요"
      />
      {errors.price ? (
        <p className="text-[13px] font-semibold text-[#ef4444]">
          {errors.price}
        </p>
      ) : null}

      <label className="mt-2 font-bold" htmlFor="product-tag">
        태그
      </label>
      <input
        id="product-tag"
        className={`${inputClass} ${errors.tagInput ? invalidClass : ""}`}
        value={values.tagInput}
        onChange={(event) => updateValue("tagInput", event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addTag();
          }
        }}
        placeholder="태그를 입력해주세요"
      />
      {errors.tagInput ? (
        <p className="text-[13px] font-semibold text-[#ef4444]">
          {errors.tagInput}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {values.tags.map((tag) => (
          <button
            className="inline-flex min-h-[30px] items-center gap-1 rounded-full bg-[#f3f4f6] px-3 text-[13px] text-gray-700"
            key={tag}
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                tags: current.tags.filter((item) => item !== tag),
              }))
            }
          >
            #{tag}
            <X size={13} />
          </button>
        ))}
      </div>
      {serverError ? (
        <p className="text-[13px] font-semibold text-[#ef4444]">
          {serverError}
        </p>
      ) : null}
    </form>
  );
}
