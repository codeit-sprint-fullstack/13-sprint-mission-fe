"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthShell from "@/components/common/AuthShell";
import Modal from "@/components/common/Modal";
import PasswordInput from "@/components/common/PasswordInput";
import { authApi, getErrorMessage } from "@/lib/api";
import { saveTokens } from "@/lib/auth";

const inputClass =
  "h-[45px] w-full rounded-lg border border-transparent bg-[#f3f4f6] px-[18px] text-[14px] text-[#1f2937] outline-none placeholder:text-[#9ca3af]";
const invalidInputClass = "border-[#ef4444] bg-red-50";

export default function SignUpPage() {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  const mutation = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      router.replace("/items");
    },
    onError: (error) => {
      setModalMessage(getErrorMessage(error, "회원가입에 실패했어요."));
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <AuthShell>
      <form className="w-full" onSubmit={onSubmit}>
        <label className="mb-5 block w-full text-[13px] font-bold">
          <span className="mb-2.5 inline-block">이메일</span>
          <input
            className={`${inputClass} ${errors.email ? invalidInputClass : ""}`}
            placeholder="이메일을 입력해주세요"
            autoComplete="email"
            {...register("email", {
              required: "이메일을 확인해 주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                message: "이메일을 확인해 주세요.",
              },
            })}
          />
          {errors.email ? (
            <p className="mt-2 text-[13px] font-semibold text-[#ef4444]">
              {errors.email.message}
            </p>
          ) : null}
        </label>

        <label className="mb-5 block w-full text-[13px] font-bold">
          <span className="mb-2.5 inline-block">닉네임</span>
          <input
            className={`${inputClass} ${errors.nickname ? invalidInputClass : ""}`}
            placeholder="닉네임을 입력해주세요"
            autoComplete="nickname"
            {...register("nickname", {
              required: "닉네임을 입력해 주세요.",
              maxLength: {
                value: 20,
                message: "닉네임은 20자까지 입력할 수 있어요.",
              },
            })}
          />
          {errors.nickname ? (
            <p className="mt-2 text-[13px] font-semibold text-[#ef4444]">
              {errors.nickname.message}
            </p>
          ) : null}
        </label>

        <label className="mb-5 block w-full text-[13px] font-bold">
          <span className="mb-2.5 inline-block">비밀번호</span>
          <PasswordInput
            placeholder="비밀번호를 입력해주세요"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 확인해 주세요.",
              minLength: { value: 8, message: "비밀번호를 확인해 주세요." },
            })}
          />
        </label>

        <label className="mb-5 block w-full text-[13px] font-bold">
          <span className="mb-2.5 inline-block">비밀번호 확인</span>
          <PasswordInput
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            autoComplete="new-password"
            error={errors.passwordConfrimation?.message}
            {...register("passwordConfirmation", {
              required: "비밀번호가 일치하지 않아요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않아요",
            })}
          />
        </label>

        <button
          className="mt-0.5 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-gray-400 px-[18px] text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 enabled:bg-[#3962ff]"
          type="submit"
          disabled={!isValid || mutation.isPending}
        >
          {mutation.isPending ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <div className="mt-[18px] flex min-h-14 w-full items-center justify-between rounded-lg bg-blue-50 px-[22px] text-[13px] font-bold">
        <span>간편 로그인하기</span>
        <div className="flex gap-3">
          <a
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white"
            href="https://www.google.com"
            aria-label="구글로 이동"
          >
            <img
              className="h-5 w-5 object-contain"
              src="/icons/ic_google.png"
              alt=""
            />
          </a>
          <a
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#fee500]"
            href="https://www.kakaocorp.com/page"
            aria-label="카카오로 이동"
          >
            <img
              className="h-5 w-5 object-contain"
              src="/icons/ic_kakao.png"
              alt=""
            />
          </a>
        </div>
      </div>

      <p className="mt-[22px] text-[13px]">
        이미 회원이신가요?{" "}
        <Link className="text-[#3692ff] underline" href="/signin">
          로그인
        </Link>
      </p>

      {modalMessage ? (
        <Modal title="회원가입 실패" onClose={() => setModalMessage("")}>
          <p>{modalMessage}</p>
        </Modal>
      ) : null}
    </AuthShell>
  );
}
