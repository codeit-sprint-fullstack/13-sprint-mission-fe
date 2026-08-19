"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/common/Modal";
import { useSignUpForm } from "@/hooks/useSignUpForm";

export default function SignUpForm() {
  const {
    register,
    onSubmit,
    errors,
    isValid,
    isLoading,
    modalStatus,
    closeModal,
  } = useSignUpForm();

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-start gap-6"
      >
        <div className="flex w-full flex-col items-start gap-6">
          <label
            htmlFor="email"
            className="text-cool-gray-800 text-2lg flex h-5.25 w-11.75 flex-col items-start gap-4 font-bold"
          >
            이메일
          </label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-error-red text-lg font-semibold">
              {errors.email.message}
            </p>
          )}

          <label
            htmlFor="nickname"
            className="text-cool-gray-800 text-2lg flex h-5.25 w-11.75 flex-col items-start gap-4 font-bold"
          >
            닉네임
          </label>
          <Input
            {...register("nickname")}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            autoComplete="nickname"
          />
          {errors.nickname && (
            <p className="text-error-red text-lg font-semibold">
              {errors.nickname.message}
            </p>
          )}

          <label
            htmlFor="password"
            className="text-cool-gray-800 text-2lg flex h-5.25 w-15.75 flex-col items-start gap-4 font-bold"
          >
            비밀번호
          </label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-error-red text-lg font-semibold">
              {errors.password.message}
            </p>
          )}

          <label
            htmlFor="passwordConfirmation"
            className="text-cool-gray-800 text-2lg flex h-5.25 w-24.5 flex-col items-start gap-4 font-bold"
          >
            비밀번호 확인
          </label>
          <Input
            {...register("passwordConfirmation")}
            id="passwordConfirmation"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            autoComplete="current-password"
          />
          {errors.passwordConfirmation && (
            <p className="text-error-red text-lg font-semibold">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <Button
          size="large"
          variant={isValid ? "primary" : "gray"}
          rounded="round"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "가입 중" : "회원가입"}
        </Button>
      </form>

      <Modal
        isOpen={modalStatus.modalOpen}
        message={modalStatus.modalMessage}
        onClose={closeModal}
      />
    </>
  );
}
