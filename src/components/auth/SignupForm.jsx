"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import InputBasic from "@/components/common/Form/InputBasic";
import { useAuth } from "@/providers/AuthProvider";
import Modal from "@/components/common/Modal/Modal";

export default function SignupForm({ defaultValue = null }) {
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 (API 요청 중 중복 제출 방지 및 UI 피드백용)
  const [isModalOpen, setIsModalOpen] = useState(false); // 에러 모달 상태

  // 필드별 유효성 통과 여부. defaultValue가 있으면 초기값부터 valid로 간주
  const [inputStatus, setInputStatus] = useState({
    email: !!defaultValue?.email,
    nickname: !!defaultValue?.nickname,
    password: !!defaultValue?.password,
    passwordConfirmation: !!defaultValue?.passwordConfirmation,
  });

  // 현재 입력값 (수정 모드에서 변경 여부 체크용)
  const [formValues, setFormValues] = useState({
    email: defaultValue?.email ?? "",
    nickname: defaultValue?.nickname ?? "",
    password: defaultValue?.password ?? "",
    passwordConfirmation: defaultValue?.passwordConfirmation ?? "",
  });

  const isEditMode = !!defaultValue; // 수정 모드

  // 모든 필수 입력 필드가 유효한지 여부 (버튼 활성화 결정)
  const isFormValid = Object.values(inputStatus).every(Boolean);

  // 수정 모드: 기존 값과 달라야 true / 신규 작성: 항상 true
  const isChanged = isEditMode
    ? formValues.email !== (defaultValue?.email ?? "") ||
      formValues.nickname !== (defaultValue?.nickname ?? "") ||
      formValues.password !== (defaultValue?.password ?? "") ||
      formValues.passwordConfirmation !==
        (defaultValue?.passwordConfirmation ?? "")
    : true; // 신규 작성은 항상 true (isFormValid로만 판단

  const isButtonDisabled =
    isLoading || !isFormValid || (isEditMode && !isChanged);

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  /**
   * 상품 등록 폼 제출 핸들러
   * @param {React.SubmitEvent<HTMLFormElement>} e
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (isLoading) return; // 로딩 중 중복 클릭 방지
    setError(null); // 재시도 시 이전 에러 초기화

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      // passwordConfirmation은 클라이언트 검증용이라 백엔드로 보내지 않음
      const { passwordConfirmation, ...signupData } = Object.fromEntries(
        formData.entries(),
      );

      await signup(signupData);
      router.push("/items"); // 회원 등록 성공 시 중고마켓 페이지로 이동
    } catch (error) {
      setError(error.message);
      setIsModalOpen(true);
      setIsLoading(false);
    }
  }

  /**
   * 개별 인풋의 활성화 상태를 병합하여 업데이트
   * @param {Object} statusUpdate - 업데이트할 필드의 상태 객체 (예: { name: true })
   */
  function updateFieldValidity(statusUpdate) {
    setInputStatus((prev) => ({ ...prev, ...statusUpdate }));
  }

  /**
   * 입력값 변경 시 formValues 상태를 업데이트
   * @param {string} name - 변경된 필드명 (예: "title", "content")
   * @param {string} value - 변경된 입력값
   */
  function handleInputChange(name, value) {
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
          label='닉네임'
          type='text'
          name='nickname'
          placeholder='닉네임을 입력해주세요'
          size='sm'
          defaultValue={defaultValue?.nickname}
          onChange={(e) => handleInputChange("nickname", e.target.value)}
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input.length <= 20,
            message: "20자 이내로 입력해주세요",
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
        <InputBasic
          label='비밀번호 확인'
          type='password'
          name='passwordConfirmation'
          placeholder='비밀번호를 다시 한 번 입력해주세요'
          size='sm'
          defaultValue={defaultValue?.passwordConfirmation}
          onChange={(e) =>
            handleInputChange("passwordConfirmation", e.target.value)
          }
          onActive={updateFieldValidity}
          validators={{
            fn: (input) => input === formValues.password,
            message: "비밀번호가 일치하지 않습니다",
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
          회원가입
        </Button>
      </form>

      {/* 에러 알림 모달 */}
      <Modal
        description={error}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
