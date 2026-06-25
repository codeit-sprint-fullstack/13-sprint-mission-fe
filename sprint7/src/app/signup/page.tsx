"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../../lib/api/fetchClient";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 1. Auth Guard: 로그인된 유저 접근 차단
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/items");
    }
  }, [router]);

  // 2. React-Hook-Form 세팅 (watch 기능으로 비밀번호 값을 추적하여 일치 여부 비교)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const currentPassword = watch("password"); // 비밀번호 확인 검증용

  // 3. 회원가입 Mutation
  const signupMutation = useMutation({
    mutationFn: async (data: any) => {
      // 폼 데이터 중 passwordConfirm은 서버에 보낼 필요가 없으므로 제외하고 전송
      const payload = {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      };
      const res = await fetchClient("/auth/signUp", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return res.json();
    },
    onSuccess: (data) => {
      // 4. 성공 시 JWT 토큰 저장 및 리다이렉트
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error: any) => {
      // 5. 실패 시 모달 출력
      setModalMessage(error.message || "회원가입에 실패했습니다.");
    },
  });

  const onSubmit = (data: any) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="flex w-full max-w-[400px] flex-col items-center">
        <Link href="/">
          <Image src="/images/ic_panda.svg" alt="Panda Market" width={200} height={60} className="mb-10" />
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6 rounded-2xl bg-white p-8 shadow-md">
          
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-800">이메일</label>
            <input
              type="email"
              {...register("email", {
                required: "이메일을 확인해 주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
              placeholder="이메일을 입력해주세요"
              className={`rounded-xl border bg-gray-50 p-4 outline-none transition-all focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && <span className="text-[12px] text-red-500">{errors.email.message as string}</span>}
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-800">닉네임</label>
            <input
              type="text"
              {...register("nickname", {
                required: "닉네임을 확인해 주세요.",
                minLength: { value: 2, message: "닉네임은 2자 이상이어야 합니다." }
              })}
              placeholder="닉네임을 입력해주세요"
              className={`rounded-xl border bg-gray-50 p-4 outline-none transition-all focus:border-blue-500 ${
                errors.nickname ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.nickname && <span className="text-[12px] text-red-500">{errors.nickname.message as string}</span>}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-800">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "비밀번호를 확인해 주세요.",
                  minLength: { value: 8, message: "비밀번호는 8자 이상이어야 합니다." },
                })}
                placeholder="비밀번호를 입력해주세요"
                className={`w-full rounded-xl border bg-gray-50 p-4 pr-12 outline-none transition-all focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                <Image src={showPassword ? "/images/ic_eye_open.svg" : "/images/ic_eye_close.svg"} alt="숨김/표시" width={24} height={24} />
              </button>
            </div>
            {errors.password && <span className="text-[12px] text-red-500">{errors.password.message as string}</span>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-gray-800">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                {...register("passwordConfirm", {
                  required: "비밀번호를 한 번 더 입력해 주세요.",
                  validate: (value) => value === currentPassword || "비밀번호가 일치하지 않아요." // 일치 검증 로직
                })}
                placeholder="비밀번호를 다시 입력해주세요"
                className={`w-full rounded-xl border bg-gray-50 p-4 pr-12 outline-none transition-all focus:border-blue-500 ${
                  errors.passwordConfirm ? "border-red-500" : "border-gray-200"
                }`}
              />
              <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2">
                <Image src={showPasswordConfirm ? "/images/ic_eye_open.svg" : "/images/ic_eye_close.svg"} alt="숨김/표시" width={24} height={24} />
              </button>
            </div>
            {errors.passwordConfirm && <span className="text-[12px] text-red-500">{errors.passwordConfirm.message as string}</span>}
          </div>

          <button
            type="submit"
            disabled={!isValid || signupMutation.isPending}
            className={`mt-4 w-full rounded-xl py-4 text-[16px] font-bold text-white transition-colors ${
              isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {signupMutation.isPending ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-6 flex w-full items-center justify-between px-2">
          <span className="text-[14px] text-gray-600">이미 계정이 있으신가요?</span>
          <Link href="/signin" className="text-[14px] font-bold text-blue-600 hover:underline">
            로그인하기
          </Link>
        </div>

        {/* 간편 로그인 (소셜) */}
        <div className="mt-8 flex w-full items-center justify-between rounded-xl bg-gray-100 p-4">
          <span className="text-[14px] text-gray-600">간편 로그인</span>
          <div className="flex gap-4">
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow">
                 <span className="text-xl">G</span> 
              </div>
            </Link>
            <Link href="https://www.kakaocorp.com/page" target="_blank" rel="noopener noreferrer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xl">K</span> 
              </div>
            </Link>
          </div>
        </div>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex w-[320px] flex-col items-center rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">가입 실패</h3>
            <p className="mb-6 text-center text-[14px] text-gray-600">{modalMessage}</p>
            <button
              onClick={() => setModalMessage("")}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}