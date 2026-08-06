'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import ArticleImage from '@/app/components/ArticleImage';
import { getProductImageUrl, uploadProductImage } from '@/lib/products';
import type { Product, ProductCreateInput } from '@/types';

const INPUT_CLS =
  'w-full rounded-xl border-0 bg-[#F3F4F6] px-6 text-base text-[#1F2937] placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]';

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  tags: string;
  imageUrl: string;
}

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (values: ProductCreateInput) => void | Promise<void>;
  heading?: string;
  submitLabel?: string;
}

// 상품 등록/수정 공통 폼
export default function ProductForm({
  initial = {},
  onSubmit,
  heading = '상품 등록',
  submitLabel = '등록',
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormState>({
    name: initial.name ?? '',
    description: initial.description ?? '',
    price: initial.price !== undefined ? String(initial.price) : '',
    tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : '',
    imageUrl: initial.imageUrl ?? '',
  });
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(getProductImageUrl(initial));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid =
    values.name.trim() && values.description.trim() && Number(values.price) >= 0;

  function update(field: keyof ProductFormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      let imageUrl = values.imageUrl;

      if (selectedFile) {
        const uploaded = await uploadProductImage(selectedFile);
        imageUrl = uploaded.imageUrl;
      }

      await onSubmit({
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        tags: values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        imageUrl,
      });
    } catch (submitError) {
      console.error(submitError);
      setError('저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1F2937]">{heading}</h1>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex h-12 w-[74px] items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
        >
          {isSubmitting ? '저장 중...' : submitLabel}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-image" className="text-xl font-bold text-[#1F2937]">상품 이미지</label>
        <label
          htmlFor="product-image"
          className="flex min-h-[220px] cursor-pointer items-center justify-center rounded-xl bg-[#F3F4F6] text-base font-semibold text-[#6B7280]"
        >
          {previewUrl ? (
            <ArticleImage
              src={previewUrl}
              alt="상품 이미지 미리보기"
              width={600}
              height={360}
              className="h-[260px] w-full rounded-xl object-cover"
            />
          ) : (
            '이미지 선택'
          )}
        </label>
        <input
          id="product-image"
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-name" className="text-xl font-bold text-[#1F2937]">*상품명</label>
        <input
          id="product-name"
          className={`${INPUT_CLS} h-14`}
          placeholder="상품명을 입력해주세요"
          value={values.name}
          onChange={update('name')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-price" className="text-xl font-bold text-[#1F2937]">*가격</label>
        <input
          id="product-price"
          type="number"
          min="0"
          className={`${INPUT_CLS} h-14`}
          placeholder="가격을 입력해주세요"
          value={values.price}
          onChange={update('price')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-tags" className="text-xl font-bold text-[#1F2937]">태그</label>
        <input
          id="product-tags"
          className={`${INPUT_CLS} h-14`}
          placeholder="쉼표로 구분해 주세요"
          value={values.tags}
          onChange={update('tags')}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-description" className="text-xl font-bold text-[#1F2937]">*상품 설명</label>
        <textarea
          id="product-description"
          className={`${INPUT_CLS} min-h-[260px] resize-none py-5`}
          placeholder="상품 설명을 입력해주세요"
          value={values.description}
          onChange={update('description')}
        />
      </div>

      <p role="alert" className="min-h-5 text-sm text-rose-500">{error}</p>
    </form>
  );
}
