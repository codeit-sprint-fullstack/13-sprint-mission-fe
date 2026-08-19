"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { createProducts } from "@/api/product";
import { uploadImage } from "@/api/upload";
import { useProductForm, type ProductFormField } from "@/hooks/useProductForm";
import { getAccessToken } from "@/lib/authStorage";

const MAX_IMAGES = 3;

export default function RegistrationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { values, errors, handleChange, handleBlur, addTag, removeTag, validateAll, isValid } = useProductForm();

  useEffect(() => {
    if (!getAccessToken()) router.push("/signin");
  }, []);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (images.length + files.length > MAX_IMAGES) {
      setModalMessage(`이미지는 최대 ${MAX_IMAGES}개까지 등록 가능합니다.`);
      return;
    }

    const uploadedUrls: string[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      newPreviews.push(URL.createObjectURL(file));
      try {
        const { url } = await uploadImage(file);
        uploadedUrls.push(url);
      } catch {
        setModalMessage("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const { mutate: submitProduct } = useMutation({
    mutationFn: () =>
      createProducts({
        name: values.name,
        price: Number(values.price),
        description: values.description,
        tags: values.tags,
        images,
      }),
    onSuccess: () => router.push("/items"),
    onError: () => setModalMessage("상품 등록에 실패했습니다.\n다시 시도해 주세요."),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;
    submitProduct();
  };

  const inputClass = (field: ProductFormField) =>
    `w-full rounded-xl bg-gray-100 py-4 px-6 text-base text-gray-800 placeholder-gray-400 outline-none ${
      errors[field] ? "border border-red-500" : ""
    }`;

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-6 md:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">상품 등록하기</h2>
        <button
          form="registration-form"
          type="submit"
          disabled={!isValid}
          className="bg-primary-100 rounded-lg px-5 py-2 text-lg font-semibold text-white disabled:bg-gray-400"
        >
          등록
        </button>
      </div>

      <form id="registration-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품 이미지</label>
          <div className="flex flex-wrap gap-4">
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[168px] w-[168px] flex-col items-center justify-center gap-3 rounded-xl bg-gray-100 text-gray-400 lg:h-[282px] lg:w-[282px]"
              >
                <div className="flex h-12 w-12 items-center justify-center text-4xl text-gray-400">+</div>
                <span className="text-base">이미지 등록</span>
              </button>
            )}
            {previews.map((src, i) => (
              <div key={i} className="relative h-[168px] w-[168px] lg:h-[282px] lg:w-[282px]">
                <Image src={src} alt={`이미지 ${i + 1}`} fill className="rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800/60 text-sm text-white"
                >
                  ✕
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
          <p className="text-sm text-gray-400">최대 {MAX_IMAGES}개까지 등록 가능합니다.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품명</label>
          <input
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="상품명을 입력해 주세요"
            className={inputClass("name")}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">상품 소개</label>
          <textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onBlur={() => handleBlur("description")}
            placeholder="상품 소개를 입력해 주세요"
            rows={6}
            className={`resize-none ${inputClass("description")}`}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">판매 가격</label>
          <input
            type="number"
            value={values.price}
            onChange={(e) => handleChange("price", e.target.value)}
            onBlur={() => handleBlur("price")}
            placeholder="판매 가격을 입력해 주세요"
            className={inputClass("price")}
          />
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800">태그</label>
          <input
            value={values.tagInput}
            onChange={(e) => handleChange("tagInput", e.target.value)}
            onBlur={() => handleBlur("tagInput")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="태그를 입력해주세요"
            className={`w-full rounded-xl bg-gray-100 py-4 px-6 text-base text-gray-800 placeholder-gray-400 outline-none ${
              errors.tagInput ? "border border-red-500" : ""
            }`}
          />
          {errors.tagInput && <p className="text-sm text-red-500">{errors.tagInput}</p>}
          <div className="flex flex-wrap gap-2">
            {values.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded-[26px] bg-gray-100 px-4 py-1.5 text-base text-gray-800">
                #{tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </form>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex h-[220px] w-[327px] flex-col items-center justify-center gap-[42px] rounded-lg bg-white px-[90px] py-[23px] md:h-[250px] md:w-[540px] md:gap-10 md:px-[187px] md:py-[40px]">
            <p className="whitespace-pre-line text-center text-lg text-gray-800">{modalMessage}</p>
            <button
              onClick={() => setModalMessage("")}
              className="bg-primary-100 h-12 w-[120px] rounded-lg px-[23px] py-3 text-lg text-white md:w-[165px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}