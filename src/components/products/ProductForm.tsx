"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/common/Button";
import InputBasic from "@/components/common/Form/InputBasic";
import InputTag from "@/components/common/Form/InputTag";
import Textarea from "@/components/common/Form/Textarea";
import LoadingDisplay from "@/components/ui/LoadingDisplay";
import {
  createProductAction,
  updateProductAction,
} from "@/lib/actions/products";
import type { Product, ProductPayload } from "@/types/product";
import type { FieldStatusUpdate } from "@/types/form";

export default function ProductForm({
  defaultValue = null,
  productId = null,
}: {
  defaultValue?: Product | null;
  productId?: string | number | null;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // 제출 완료 상태

  const defaultTags = defaultValue?.tags ?? [];

  // 필드별 유효성 통과 여부. defaultValue가 있으면 초기값부터 valid로 간주
  const [inputStatus, setInputStatus] = useState({
    name: !!defaultValue?.name,
    description: !!defaultValue?.description,
    price: !!defaultValue?.price,
    tags: defaultTags.length > 0,
  });

  // 현재 입력값 (수정 모드에서 변경 여부 체크용)
  const [formValues, setFormValues] = useState({
    name: defaultValue?.name ?? "",
    description: defaultValue?.description ?? "",
    price: defaultValue?.price ?? "",
    tags: defaultTags,
  });

  const isEditMode = !!defaultValue; // 수정 모드

  // 모든 필수 입력 필드가 유효한지 여부 (버튼 활성화 결정)
  const isFormValid = Object.values(inputStatus).every(Boolean);

  // 수정 모드: 기존 값과 달라야 true / 신규 작성: 항상 true
  const isChanged = isEditMode
    ? formValues.name !== (defaultValue?.name ?? "") ||
      formValues.description !== (defaultValue?.description ?? "") ||
      String(formValues.price) !== String(defaultValue?.price ?? "") ||
      formValues.tags.join(",") !== defaultTags.join(",")
    : true;

  // 상품 등록/수정 mutation
  const { mutate: submitProduct, isPending: isLoading } = useMutation({
    mutationFn: (payload: ProductPayload) =>
      isEditMode
        ? updateProductAction(productId as string | number, payload)
        : createProductAction(payload),

    onSuccess: (result) => {
      if (!result.success) {
        setError(result.error);
        return;
      }

      const id = result.data?.id ?? productId;

      if (id) {
        setIsSubmitted(true); // 성공 후에도 다시 제출되지 않도록 고정
        router.push(`/items/${id}`);
      }
    },

    onError: (err) => setError(err.message),
  });

  const isButtonDisabled =
    isLoading || isSubmitted || !isFormValid || (isEditMode && !isChanged);

  /**
   * 상품 등록/수정 폼 제출 핸들러
   * @param {React.SubmitEvent<HTMLFormElement>} e
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null); // 재시도 시 이전 에러 초기화

    const formData = new FormData(e.currentTarget);
    const { name, description, price } = Object.fromEntries(
      formData.entries(),
    ) as { name: string; description: string; price: string };

    submitProduct({
      name,
      description,
      price: Number(price),
      tags: formValues.tags,
      // TODO: 이미지 업로드 수정
      images: [],
    });
  }

  /**
   * 개별 인풋의 활성화 상태를 병합하여 업데이트
   * @param {Object} statusUpdate - 업데이트할 필드의 상태 객체 (예: { name: true })
   */
  function updateFieldValidity(statusUpdate: FieldStatusUpdate) {
    setInputStatus((prev) => ({ ...prev, ...statusUpdate }));
  }

  /**
   * 입력값 변경 시 formValues 상태를 업데이트
   * @param {string} name - 변경된 필드명
   * @param {string} value - 변경된 입력값
   */
  function handleInputChange(name: string, value: string) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 타이틀 + 등록 버튼 */}
      <div className='flex justify-between items-center mb-[24px] md:mb-[32px]'>
        <h1 className='text-[20px]/[calc(24/20)] font-bold text-secondary-800'>
          {isEditMode ? "상품 수정" : "상품 등록"}
        </h1>
        <Button disabled={isButtonDisabled}>
          {isLoading ? (
            <LoadingDisplay size='20' fullHeight={false} />
          ) : isEditMode ? (
            "수정"
          ) : (
            "등록"
          )}
        </Button>
      </div>

      {/* 인풋 섹션 */}
      <article className='flex flex-col space-y-[16px] md:space-y-[24px]'>
        <InputBasic
          label='상품명'
          name='name'
          type='text'
          placeholder='상품명을 입력해주세요'
          defaultValue={defaultValue?.name ?? ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length > 0 && input.length <= 10,
            message: "10자 이내로 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <Textarea
          label='상품 소개'
          name='description'
          placeholder='상품 설명을 입력해주세요'
          defaultValue={defaultValue?.description ?? ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length > 0,
            message: "10자 이상 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <InputBasic
          label='판매 가격'
          name='price'
          type='number'
          placeholder='가격을 입력해주세요'
          defaultValue={defaultValue?.price != null ? String(defaultValue.price) : ""}
          onChange={(e) => handleInputChange("price", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => Number(input) > 0,
            message: "숫자로 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <InputTag
          label='태그'
          name='tags'
          placeholder='태그를 입력해주세요'
          defaultValue={defaultTags}
          onUpdate={(newTags) =>
            setFormValues((prev) => ({ ...prev, tags: newTags }))
          }
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length <= 5,
            message: "5글자 이내로 입력해주세요",
          }}
          active={{
            fn: (tags) => tags.length > 0,
          }}
        />
      </article>

      {/* TODO: 추후 토스트로 수정하기 */}
      {error && (
        <p className='text-error-red text-[14px] mt-[50px] text-center'>
          {error}
        </p>
      )}
    </form>
  );
}
