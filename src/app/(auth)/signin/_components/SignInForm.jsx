"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalProvider";
import { useAuth } from "@/providers/AuthProvider";
import useForm from "../../../../hooks/useForm";

import AuthFooterLink from "../../_components/AuthFooterLink";
import SocialLogin from "../../_components/SocialLogin";
import AuthPasswordField from "../../_components/AuthPasswordField";
import AuthTextField from "../../_components/AuthTextField";
import AuthLogo from "../../_components/AuthLogo";
import { validateEmail, validatePassword } from "@/utils/validators";

const initialValues = {
  email: "",
  password: "",
};

const initialErrors = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, setErrors, handleChange, resetErrors } = useForm(
    initialValues,
    initialErrors,
  );

  const { login } = useAuth();
  const { openModal } = useModal();
  const router = useRouter();

  const isFormValid =
    values.email.trim() !== "" && values.password.trim() !== "";

  async function handleSubmit(e) {
    e.preventDefault();

    resetErrors();

    const newErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    if (Object.keys(newErrors).some((key) => newErrors[key] !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      await login(values.email, values.password);
    } catch (error) {
      setErrors({
        email: "이메일을 확인해 주세요.",
        password: "비밀번호를 확인해 주세요.",
      });
      openModal("로그인에 실패했습니다.");
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
            type="email"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            error={errors.email}
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

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`h-[56px] w-full rounded-[40px] text-[20px] font-semibold leading-8 text-white ${
              isFormValid && !isLoading
                ? "bg-brand-blue"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <SocialLogin />

        <AuthFooterLink
          description="판다마켓이 처음이신가요?"
          linkText="회원가입"
          href="/signup"
        />
      </div>
    </main>
  );
}
