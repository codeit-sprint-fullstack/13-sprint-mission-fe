"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../../lib/api/fetchClient";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/items");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetchClient("/auth/signIn", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error: any) => {
      setModalMessage(error.message || "로그인에 실패했습니다.");
    },
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FCFCFC]">
      <div className="flex w-[640px] flex-col items-center">
        
        <Link href="/" className="flex items-center gap-[22px]">
          <Image src="/images/ic_panda.svg" alt="Panda Market" width={104} height={104} />
          <span 
            className="text-[66px] font-bold text-[#3692FF]" 
            style={{ fontFamily: "'ROKAF Sans', sans-serif" }}
          >
            판다마켓
          </span>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[58px] flex w-full flex-col">
          
          <div className="flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#1F2937]">
              이메일
            </label>
            <input
              type="email"
              {...register("email", {
                required: "이메일을 확인해 주세요.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "잘못된 이메일입니다.",
                },
              })}
              placeholder="이메일을 입력해주세요"
              className={`mt-[16px] h-[56px] w-[640px] rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] outline-none transition-colors ${
                errors.email ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"
              }`}
            />
            {errors.email && (
              <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">
                {errors.email.message as string}
              </span>
            )}
          </div>

          <div className="mt-[24px] flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#1F2937]">
              비밀번호
            </label>
            <div className="relative mt-[16px] w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "비밀번호를 확인해 주세요.",
                  minLength: { value: 8, message: "비밀번호를 8자 이상 입력해주세요" },
                })}
                placeholder="비밀번호를 입력해주세요"
                className={`h-[56px] w-[640px] rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] outline-none transition-colors ${
                  errors.password ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[24px] top-1/2 -translate-y-1/2"
              >
                <Image
                  src={showPassword ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"}
                  alt="비밀번호 숨김/표시"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {errors.password && (
              <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">
                {errors.password.message as string}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || loginMutation.isPending}
            className={`mt-[24px] flex h-[56px] w-[640px] items-center justify-center rounded-[40px] px-[124px] py-[16px] font-['Pretendard'] text-[18px] font-bold text-white transition-colors ${
              isValid ? "bg-[#3692FF] hover:bg-blue-600" : "bg-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-[24px] flex w-full items-center justify-between rounded-[12px] bg-[#E6F2FF] px-[24px] py-[16px]">
          <span className="font-['Pretendard'] text-[16px] font-medium leading-[26px] text-[#1F2937]">
            간편 로그인하기
          </span>
          <div className="flex items-center gap-[16px]">
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/Component 2.png" alt="Google Login" width={42} height={42} className="rounded-full shadow-sm" />
            </Link>
            <Link href="https://www.kakaocorp.com/page" target="_blank" rel="noopener noreferrer">
              <Image src="/images/Component 3.png" alt="Kakao Login" width={42} height={42} className="rounded-full shadow-sm" />
            </Link>
          </div>
        </div>

        <div className="mt-[24px] flex items-center justify-center gap-[4px]">
          <span className="font-['Pretendard'] text-[14px] font-medium leading-[24px] text-[#1F2937]">
            판다마켓이 처음이신가요?
          </span>
          <Link href="/signup" className="font-['Pretendard'] text-[14px] font-medium text-[#3692FF] underline decoration-solid underline-offset-4">
            회원가입
          </Link>
        </div>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex h-[250px] w-[540px] flex-col items-center justify-center rounded-[8px] bg-white">
            <span className="text-center font-['Pretendard'] text-[18px] font-medium leading-[26px] text-[#1F2937]">
              {modalMessage}
            </span>
            <button
              onClick={() => setModalMessage("")}
              className="mt-[40px] flex h-[48px] w-[165px] items-center justify-center rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] font-['Pretendard'] text-[16px] text-white hover:bg-blue-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}