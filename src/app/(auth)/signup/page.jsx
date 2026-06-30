"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import LogoHeader from "../_components/LogoHeader";
import InputField from "../_components/InputField";
import PasswordInput from "../_components/PasswordInput";
import SocialLoginSection from "../_components/SocialLoginSection";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/items");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { mutate: register } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      if (message === "이미 사용중인 이메일입니다.") {
        setModalMessage("사용중인 이메일입니다.");
      } else if (message === "이미 사용중인 닉네임입니다.") {
        setModalMessage("사용중인 닉네임입니다.");
      }
    },
  });

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("잘못된 이메일입니다.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateNickname = () => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      return false;
    }
    setNicknameError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePasswordConfirm = () => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않아요.");
      return false;
    }
    setPasswordConfirmError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isNicknameValid = validateNickname();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();
    if (
      !isEmailValid ||
      !isNicknameValid ||
      !isPasswordValid ||
      !isPasswordConfirmValid
    )
      return;
    register({
      email,
      nickname,
      password,
      passwordConfirmation: passwordConfirm,
    });
  };

  const isFormValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    nickname.length > 0 &&
    password.length >= 8 &&
    password === passwordConfirm;

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
          <InputField
            label="닉네임"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={validateNickname}
            error={nicknameError}
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
          <PasswordInput
            label="비밀번호 확인"
            id="passwordConfirm"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onBlur={validatePasswordConfirm}
            error={passwordConfirmError}
          />
          <button
            type="submit"
            disabled={!isFormValid}
            className="bg-primary-100 mt-2 h-14 w-full rounded-full text-lg font-bold text-white disabled:bg-gray-400"
          >
            회원가입
          </button>
        </form>
        <SocialLoginSection />
        <p className="text-center text-gray-600">
          이미 회원이신가요?{" "}
          <Link href="/signin" className="text-primary-100 underline">
            로그인
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
