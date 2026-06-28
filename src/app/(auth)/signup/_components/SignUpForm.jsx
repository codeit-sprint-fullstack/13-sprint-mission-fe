"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "../../../../providers/ModalProvider";
import { useAuth } from "../../../../providers/AuthProvider";
import useForm from "../../../../hooks/useForm";

import AuthFooterLink from "../../_components/AuthFooterLink";
import SocialLogin from "../../_components/SocialLogin";
import AuthPasswordField from "../../_components/AuthPasswordField";
import AuthTextField from "../../_components/AuthTextField";
import AuthLogo from "../../_components/AuthLogo";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../../../../utils/validators";

const initialValues = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const initialErrors = {
  nickname: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, setErrors, handleChange, resetErrors } = useForm(
    initialValues,
    initialErrors,
  );

  const { register } = useAuth();
  const { openModal } = useModal();
  const router = useRouter();

  const isFormValid = Object.values(values).every(
    (value) => value.trim() !== "",
  );

  async function handleSubmit(e) {
    e.preventDefault();

    resetErrors();

    const newErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      passwordConfirmation: validatePasswordConfirmation(
        values.password,
        values.passwordConfirmation,
      ),
    };
    if (Object.keys(newErrors).some((key) => newErrors[key] !== "")) {
      setErrors(newErrors);
      return;
    }
    try {
      setIsLoading(true);

      await register(
        values.nickname,
        values.email,
        values.password,
        values.passwordConfirmation,
      );

      openModal("가입이 완료되었습니다.");
    } catch (error) {
      openModal("사용 중인 이메일입니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-auth mx-auto px-4 py-10 md:px-6">
      <AuthLogo />

      <div className="flex w-full flex-col items-center gap-6">
        <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
          <AuthTextField
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
          />

          <AuthTextField
            label="닉네임"
            name="nickname"
            placeholder="이름을 입력해주세요"
            value={values.nickname}
            error={errors.nickname}
            onChange={handleChange}
          />

          <AuthPasswordField
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
          />

          <AuthPasswordField
            label="비밀번호 확인"
            name="passwordConfirmation"
            placeholder="비밀번호를 다시 입력해주세요"
            value={values.passwordConfirmation}
            error={errors.passwordConfirmation}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`h-[56px] w-full rounded-[40px] text-[20px] font-semibold leading-8 text-white ${
              isFormValid && !isLoading
                ? "bg-brand-blue"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <SocialLogin />

        <AuthFooterLink
          description="이미 회원이신가요?"
          linkText="로그인"
          href="/signin"
        />
      </div>
    </main>
  );
}
