"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button";
import InputBasic from "@/components/common/Form/InputBasic";
import Modal from "@/components/common/Modal/Modal";
import { useAuth } from "@/providers/AuthProvider";
import type { SigninPayload } from "@/types/auth";
import type { FieldStatusUpdate } from "@/types/form";

export default function SigninForm({
  defaultValue = null,
}: {
  defaultValue?: Partial<SigninPayload> | null;
}) {
  const { signin } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 (API 요청 중 중복 제출 방지 및 UI 피드백용)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 에러 모달 상태

  // 필드별 유효성 통과 여부. defaultValue가 있으면 초기값부터 valid로 간주
  const [inputStatus, setInputStatus] = useState<FieldStatusUpdate>({
    email: !!defaultValue?.email,
    password: !!defaultValue?.password,
  });

  // 현재 입력값 (수정 모드에서 변경 여부 체크용)
  const [formValues, setFormValues] = useState({
    email: defaultValue?.email ?? "",
    password: defaultValue?.password ?? "",
  });

  const isEditMode = !!defaultValue; // 수정 모드

  // 모든 필수 입력 필드가 유효한지 여부 (버튼 활성화 결정)
  const isFormValid = Object.values(inputStatus).every(Boolean);

  // 수정 모드: 기존 값과 달라야 true / 신규 작성: 항상 true
  const isChanged = isEditMode
    ? formValues.email !== (defaultValue?.email ?? "") ||
      formValues.password !== (defaultValue?.password ?? "")
    : true; // 신규 작성은 항상 true (isFormValid로만 판단

  const isButtonDisabled =
    isLoading || !isFormValid || (isEditMode && !isChanged);

  function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  /**
   * 상품 등록 폼 제출 핸들러
   * @param {React.SubmitEvent<articlesHTMLFormElement>} e
   */
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return; // 로딩 중 중복 클릭 방지
    setError(null); // 재시도 시 이전 에러 초기화

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const newFormData = Object.fromEntries(formData.entries()) as {
        email: string;
        password: string;
      };

      await signin(newFormData);
      router.push("/items");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "로그인에 실패했습니다",
      );
      setIsModalOpen(true);
      setIsLoading(false);
    }
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
   * @param {string} name - 변경된 필드명 (예: "title", "content")
   * @param {string} value - 변경된 입력값
   */
  function handleInputChange(name: string, value: string) {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-[16px] md:gap-y-[24px]'
      >
        <InputBasic
          label='이메일'
          type='email'
          name='email'
          placeholder='이메일을 입력해주세요'
          size='sm'
          defaultValue={defaultValue?.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => validateEmail(input),
            message: "잘못된 이메일입니다",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <InputBasic
          label='비밀번호'
          type='password'
          name='password'
          placeholder='비밀번호를 입력해주세요'
          size='sm'
          defaultValue={defaultValue?.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length >= 8,
            message: "비밀번호를 8자 이상 입력해주세요",
          }}
          active={{
            fn: (input) => input.length > 0,
          }}
        />
        <Button
          variant='secondary'
          className='mb-[24px]'
          width='100%'
          disabled={isButtonDisabled}
        >
          로그인
        </Button>
      </form>

      {/* 에러 알림 모달 */}
      <Modal
        description={error ?? ""}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
