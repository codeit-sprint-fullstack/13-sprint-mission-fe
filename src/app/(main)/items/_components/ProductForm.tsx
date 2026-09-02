"use client";

import ImageUpload from "@/app/(main)/items/_components/ImageUpload";
import { useState } from "react";
import type { ProductFormValues } from "@/types/api";

// 정의는 types/api.ts로 옮김. 기존 import 경로를 쓰는 곳들을 위해 재수출
export type { ProductFormValues };

interface ProductFormProps {
  title: string;
  submitLabel: string;
  isPending?: boolean;
  onSubmit: (values: ProductFormValues) => void;
  // 수정 모드일 때만 기존 값이 들어옴 (등록은 빈 객체)
  initialValues?: Partial<ProductFormValues>;
}

interface ProductFormProps {
  title: string;
  submitLabel: string;
  isPending?: boolean;
  onSubmit: (values: ProductFormValues) => void;
  // 수정 모드일 때만 기존 값이 들어옴 (등록은 빈 객체)
  initialValues?: Partial<ProductFormValues>;
}

// 상품 등록/수정 공통 폼.
// - initialValues: 빈 값(등록) 또는 기존 상품 값(수정)
// - onSubmit: 정제된 { name, description, price, tags, images } 를 받는다
//   (price는 Number, tags/images는 쉼표 분리 후 배열로 변환해서 넘김)
export default function ProductForm({
  title,
  submitLabel,
  isPending,
  onSubmit,
  initialValues = {},
}: ProductFormProps) {
  // 폼은 전부 문자열로 다룸 (tags/images는 "a, b" 쉼표 구분 문자열)
  const [form, setForm] = useState({
    name: initialValues.name ?? "",
    description: initialValues.description ?? "",
    price: initialValues.price != null ? String(initialValues.price) : "",
    tags: (initialValues.tags ?? []).join(", "),
    images: initialValues.images ?? [],
  });

  // input과 textarea 양쪽에서 쓰이므로 두 요소의 Union으로 받는다
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 필수값(이름/가격) 채워졌을 때만 활성화
  const isValid = form.name.trim() && form.price !== "";

  // 쉼표 구분 문자열 -> 공백 제거한 배열
  const toList = (str: string) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = () =>
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      tags: toList(form.tags),
      images: form.images,
    });

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || isPending}
          className="rounded-lg bg-brand-blue px-6 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {submitLabel}
        </button>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">
            상품 이미지
          </span>
          <ImageUpload
            images={form.images}
            onChange={(next) => setForm((prev) => ({ ...prev, images: next }))}
          />
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">상품명</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="상품명을 입력해 주세요"
            className="rounded-lg bg-gray-100 px-6 py-3 text-base text-gray-800 outline-none"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">상품 소개</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            placeholder="상품 소개를 입력해 주세요"
            className="resize-none rounded-lg bg-gray-100 px-6 py-3 text-base text-gray-800 outline-none"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">판매 가격</span>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해 주세요"
            className="rounded-lg bg-gray-100 px-6 py-3 text-base text-gray-800 outline-none"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-700">
            태그 (쉼표로 구분)
          </span>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="태그, 태그2"
            className="rounded-lg bg-gray-100 px-6 py-3 text-base text-gray-800 outline-none"
          />
        </label>
      </form>
    </div>
  );
}
