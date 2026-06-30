"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth";
import LogoHeader from "../_components/LogoHeader";
import InputField from "../_components/InputField";
import PasswordInput from "../_components/PasswordInput";
import SocialLoginSection from "../_components/SocialLoginSection";

export default function SignInPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/items");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { mutate: login } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      router.push("/items");
    },
    onError: () => {
      setEmailError("이메일을 확인해주세요.");
      setPasswordError("비밀번호를 확인해주세요.");
      setModalMessage("이메일 또는 비밀번호를\n확인해 주세요.");
    },
  });

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("잘못된 이메일입니다.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (!isEmailValid || !isPasswordValid) return;
    login({ email, password });
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-20 md:pt-[190px]">
      <div className="flex w-full max-w-[343px] flex-col gap-6 md:max-w-[640px]">
        <LogoHeader />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:gap-6"
          noValidate
        >
          <InputField
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={emailError}
          />
          <PasswordInput
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            error={passwordError}
          />
          <button
            type="submit"
            disabled={
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8
            }
            className="bg-primary-100 mt-2 h-14 w-full rounded-full text-lg font-bold text-white disabled:bg-gray-400"
          >
            로그인
          </button>
        </form>
        <SocialLoginSection />
        <p className="text-center text-gray-600">
          판다마켓이 처음이신가요?{" "}
          <Link href="/signup" className="text-primary-100 underline">
            회원가입
          </Link>
        </p>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex h-[220px] w-[327px] flex-col items-center justify-center gap-[42px] rounded-lg bg-white px-[90px] py-[23px] md:h-[250px] md:w-[540px] md:gap-10 md:px-[187px] md:py-[40px]">
            <p className="text-center text-lg whitespace-pre-line text-gray-800">
              {modalMessage}
            </p>
            <button
              onClick={() => setModalMessage("")}
              className="bg-primary-100 h-12 w-[120px] rounded-lg px-[23px] py-3 text-lg text-white md:w-[165px]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
