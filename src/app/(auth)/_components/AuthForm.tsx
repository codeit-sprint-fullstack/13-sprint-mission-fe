"use client";

import React, { useState } from "react";
import FormField from "./FormField";
import validateAuthForm from "../_utils/validateAuthForm";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { AuthFormData, AuthProps, Errors } from "../_types/auth";

export default function AuthForm({ type }: AuthProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const isLoginReady: boolean = !!(
    formData.email.trim() && formData.password.trim()
  );
  const isSignupReady: boolean = !!(
    isLoginReady &&
    formData.nickname.trim() &&
    formData.passwordConfirmation.trim() &&
    formData.password === formData.passwordConfirmation
  );

  const { register, login } = useAuth();
  const router = useRouter();
  const onSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (type === "signup") {
      try {
        await register(formData.nickname, formData.email, formData.password);
        alert("회원가입에 성공했습니다.");
        router.push("/items");
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    }
    if (type === "login") {
      try {
        await login(formData.email, formData.password);
        alert("로그인에 성공했습니다");
        router.push("/items");
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    }
  };

  return (
    <form className="mb-6 flex flex-col gap-6" onSubmit={onSubmit}>
      {type === "login" ? (
        <>
          <FormField
            id="email"
            type="email"
            typetext="이메일"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors(
                validateAuthForm({ ...formData, email: e.target.value }, type),
              );
            }}
            errorMessage={errors.emailErr}
          />

          <FormField
            id="password"
            type="password"
            typetext="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword={true}
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors(
                validateAuthForm(
                  { ...formData, password: e.target.value },
                  type,
                ),
              );
            }}
            errorMessage={errors.passwordErr}
          />
        </>
      ) : (
        <>
          <FormField
            id="email"
            type="email"
            typetext="이메일"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors(
                validateAuthForm({ ...formData, email: e.target.value }, type),
              );
            }}
            errorMessage={errors.emailErr}
          />

          <FormField
            id="nickname"
            type="text"
            typetext="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, nickname: e.target.value });
              setErrors(
                validateAuthForm(
                  { ...formData, nickname: e.target.value },
                  type,
                ),
              );
            }}
            errorMessage={errors.nicknameErr}
          />

          <FormField
            id="password"
            type="password"
            typetext="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword={true}
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors(
                validateAuthForm(
                  { ...formData, password: e.target.value },
                  type,
                ),
              );
            }}
            errorMessage={errors.passwordErr}
          />

          <FormField
            id="passwordConfirmation"
            type="password"
            typetext="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            isPassword={true}
            value={formData.passwordConfirmation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({
                ...formData,
                passwordConfirmation: e.target.value,
              });
              setErrors(
                validateAuthForm(
                  {
                    ...formData,
                    passwordConfirmation: e.target.value,
                  },
                  type,
                ),
              );
            }}
            errorMessage={errors.confirmErr}
          />
        </>
      )}

      <button
        className="bg-brand-blue disabled:bg-secondary-400 flex cursor-pointer items-center justify-center rounded-[40px] border-none px-31 py-3 disabled:cursor-not-allowed"
        disabled={type === "login" ? !isLoginReady : !isSignupReady}
      >
        {type === "login" ? (
          <p className="text-cool-gray-100 h-8 text-[20px] font-[600]">
            로그인
          </p>
        ) : (
          <p className="text-cool-gray-100 h-8 text-[20px] font-[600]">
            회원가입
          </p>
        )}
      </button>
    </form>
  );
}
