"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "../../lib/api/fetchClient";

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string; 
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/items");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({ mode: "onChange" });

  const currentPassword = watch("password");

  const signupMutation = useMutation({
    mutationFn: async (data: SignUpFormData) => {
      const payload = {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        passwordConfirmation: data.passwordConfirm, 
      };
      const res = await fetchClient("/auth/signUp", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return res.json(); 
    },
    onSuccess: () => {
      setModalMessage("가입이 완료되었습니다. 로그인해주세요.");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("회원가입 에러:", error.message);
      } else {
        console.error("회원가입 에러:", error);
      }
      router.push("/signin?error=duplicate");
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FCFCFC] py-[60px]">
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[40px] flex w-full flex-col">
          <div className="flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">이메일</label>
            <input
              type="email"
              {...register("email", {
                required: "이메일을 확인해 주세요.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "잘못된 이메일입니다." },
              })}
              placeholder="이메일을 입력해주세요"
              className={`mt-[16px] h-[56px] w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] outline-none transition-colors ${errors.email ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"}`}
            />
            {errors.email?.message && <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">{errors.email.message}</span>}
          </div>

          <div className="mt-[24px] flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">닉네임</label>
            <input
              type="text"
              {...register("nickname", {
                required: "닉네임을 확인해 주세요.",
                minLength: { value: 2, message: "닉네임은 2자 이상이어야 합니다." }
              })}
              placeholder="닉네임을 입력해주세요"
              className={`mt-[16px] h-[56px] w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] outline-none transition-colors ${errors.nickname ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"}`}
            />
            {errors.nickname?.message && <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">{errors.nickname.message}</span>}
          </div>

          <div className="mt-[24px] flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">비밀번호</label>
            <div className="relative mt-[16px] w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "비밀번호를 확인해 주세요.",
                  minLength: { value: 8, message: "비밀번호를 8자 이상 입력해주세요" },
                })}
                placeholder="비밀번호를 입력해주세요"
                className={`h-[56px] w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] pr-[48px] font-['Pretendard'] text-[16px] outline-none transition-colors ${errors.password ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[24px] top-1/2 -translate-y-1/2">
                <Image src={showPassword ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"} alt="비밀번호 숨김/표시" width={24} height={24} />
              </button>
            </div>
            {errors.password?.message && <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">{errors.password.message}</span>}
          </div>

          <div className="mt-[24px] flex flex-col">
            <label className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">비밀번호 확인</label>
            <div className="relative mt-[16px] w-full">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                {...register("passwordConfirm", {
                  required: "비밀번호를 한 번 더 입력해 주세요.",
                  validate: (value) => value === currentPassword || "비밀번호가 일치하지 않습니다"
                })}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className={`h-[56px] w-full rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] pr-[48px] font-['Pretendard'] text-[16px] outline-none transition-colors ${errors.passwordConfirm ? "border border-[#F74747]" : "border border-transparent focus:border-[#3692FF]"}`}
              />
              <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-[24px] top-1/2 -translate-y-1/2">
                <Image src={showPasswordConfirm ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"} alt="비밀번호 숨김/표시" width={24} height={24} />
              </button>
            </div>
            {errors.passwordConfirm?.message && <span className="mt-[8px] font-['Pretendard'] text-[14px] font-semibold leading-[24px] text-[#F74747]">{errors.passwordConfirm.message}</span>}
          </div>

          <button
            type="submit"
            disabled={!isValid || signupMutation.isPending}
            className={`mt-[24px] flex w-full items-center justify-center rounded-[40px] px-[124px] py-[16px] font-['Pretendard'] text-[20px] font-semibold leading-[24px] text-white transition-colors ${isValid ? "bg-[#3692FF] hover:bg-blue-600" : "bg-[#9CA3AF] cursor-not-allowed"}`}
          >
            {signupMutation.isPending ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-[24px] flex w-full items-center justify-between rounded-[12px] bg-[#E6F2FF] px-[24px] py-[16px]">
          <span className="font-['Pretendard'] text-[16px] font-medium leading-[26px] text-[#1F2937]">간편 로그인하기</span>
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
          <span className="font-['Pretendard'] text-[14px] font-medium leading-[24px] text-[#1F2937]">이미 회원이신가요?</span>
          <Link href="/signin" className="font-['Pretendard'] text-[15px] font-medium text-[#3182F6] underline decoration-solid underline-offset-4">로그인</Link>
        </div>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex h-[250px] w-[540px] flex-col items-center justify-center rounded-[8px] bg-white">
            <span className="text-center font-['Pretendard'] text-[18px] font-medium leading-[26px] text-[#1F2937] whitespace-pre-wrap">
              {modalMessage}
            </span>
            <button
              onClick={() => {
                setModalMessage("");
                if (modalMessage.includes("완료")) router.push("/signin");
              }}
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