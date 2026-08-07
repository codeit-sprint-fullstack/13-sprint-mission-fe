"use client";

import { useForm } from "react-hook-form";
import Modal from "../common/Modal";
import type { Product, ProductPayload } from "@/types/api";

const inputClass =
  "w-full rounded-lg border border-transparent bg-[#f3f4f6] p-3 text-[#1f2937] outline-none";

interface ProductEditFormValues {
  name: string;
  price: number;
  description: string;
  tags: string;
  image: string;
}

interface ProductEditModalProps {
  product: Product;
  busy?: boolean;
  onClose: () => void;
  onSubmit: (payload: ProductPayload) => void;
}

export default function ProductEditModal({
  product,
  busy,
  onClose,
  onSubmit,
}: ProductEditModalProps) {
  const { register, handleSubmit } = useForm<ProductEditFormValues>({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      tags: product.tags?.join(", ") || "",
      image: product.images?.[0] || "",
    },
  });

  const submit = handleSubmit((values) => {
    onSubmit({
      name: values.name,
      price: Number(values.price),
      description: values.description,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      images: values.image ? [values.image] : product.images,
      imageUrls: values.image ? [values.image] : product.imageUrls,
    });
  });

  return (
    <Modal
      title="상품 수정"
      confirmText="저장하기"
      cancelText="취소"
      onConfirm={submit}
      onClose={onClose}
      busy={busy}
    >
      <form className="grid gap-3.5" onSubmit={submit}>
        <label className="grid gap-2 font-bold">
          상품명
          <input
            className={inputClass}
            {...register("name", { required: true })}
          />
        </label>
        <label className="grid gap-2 font-bold">
          가격
          <input
            className={inputClass}
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </label>
        <label className="grid gap-2 font-bold">
          상품 소개
          <textarea
            className={inputClass}
            rows={4}
            {...register("description", { required: true })}
          />
        </label>
        <label className="grid gap-2 font-bold">
          태그
          <input className={inputClass} {...register("tags")} />
        </label>
        <label className="grid gap-2 font-bold">
          이미지 URL
          <input className={inputClass} {...register("image")} />
        </label>
      </form>
    </Modal>
  );
}
