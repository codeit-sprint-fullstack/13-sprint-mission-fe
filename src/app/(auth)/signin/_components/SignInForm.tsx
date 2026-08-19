"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/common/Modal";
import { useSignInForm } from "@/hooks/useSignInForm";

export default function SignInForm() {
  const {
    register,
    onSubmit,
    errors,
    isValid,
    isLoading,
    modalStatus,
    closeModal,
  } = useSignInForm();

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-start gap-6"
      >
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-4">
            <label
              htmlFor="email"
              className="text-secondary-800 text-2lg font-bold"
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
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <label
              htmlFor="password"
              className="text-secondary-800 text-2lg font-bold"
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
          </div>
        </div>
        <Button
          size="large"
          variant={isValid ? "primary" : "gray"}
          rounded="round"
          type="submit"
          disabled={!isValid || isLoading}
        >
          로그인
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
