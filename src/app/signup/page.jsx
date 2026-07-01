"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { api } from "@/app/lib/api";
import { hasAccessToken, setAccessToken } from "@/app/lib/auth";
import Modal from "@/app/components/common/Modal";
import logo from "@/app/assets/images/logo/logo.svg";
import eyeVisible from "@/app/assets/images/icons/eye-visible.svg";
import eyeInvisible from "@/app/assets/images/icons/eye-invisible.svg";
import googleLogo from "@/app/assets/images/social/google-logo.png";
import kakaoLogo from "@/app/assets/images/social/kakao-logo.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrorMessage = (error) => {
  const serverMessage = error.response?.data?.message;

  if (serverMessage) {
    return serverMessage;
  }

  return "회원가입에 실패했습니다. 입력한 정보를 다시 확인해 주세요.";
};

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordConfirmation: false,
  });
  const [formError, setFormError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (hasAccessToken()) {
      router.replace("/items");
    }
  }, [router]);

  const errors = useMemo(() => {
    return {
      email:
        email.length > 0 && !EMAIL_REGEX.test(email)
          ? "잘못된 이메일입니다"
          : "",
      nickname:
        nickname.length > 0 && nickname.trim().length < 2
          ? "닉네임은 2자 이상 입력해 주세요."
          : "",
      password:
        password.length > 0 && password.length < 8
          ? "비밀번호는 8자 이상 입력해 주세요."
          : "",
      passwordConfirmation:
        passwordConfirmation.length > 0 && password !== passwordConfirmation
          ? "비밀번호가 일치하지 않습니다."
          : "",
    };
  }, [email, nickname, password, passwordConfirmation]);

  const isFormValid =
    email.length > 0 &&
    nickname.trim().length >= 2 &&
    password.length >= 8 &&
    passwordConfirmation.length >= 8 &&
    !errors.email &&
    !errors.nickname &&
    !errors.password &&
    !errors.passwordConfirmation;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({
      email: true,
      nickname: true,
      password: true,
      passwordConfirmation: true,
    });
    setFormError("");

    if (!isFormValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/auth/signUp", {
        email,
        nickname: nickname.trim(),
        password,
        passwordConfirmation,
      });

      setAccessToken(response.data.accessToken);
      setIsSuccessModalOpen(true);
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseError = () => {
    setFormError("");
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    router.replace("/items");
  };

  return (
    <div className="flex min-h-[calc(100vh-220px)] items-center justify-center py-6">
      <section className="w-full max-w-[640px]">
        <div className="mb-10 flex justify-center">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src={logo}
              alt="판다마켓 로고"
              width={396}
              height={132}
              className="h-auto w-[220px] md:w-[396px]"
              priority
            />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-lg font-bold text-[#1F2937]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() =>
                setTouched((prevTouched) => ({
                  ...prevTouched,
                  email: true,
                }))
              }
              placeholder="이메일을 입력해 주세요"
              className="h-14 rounded-xl bg-[#F3F4F6] px-6 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
              aria-invalid={touched.email && Boolean(errors.email)}
              aria-describedby="signup-email-error"
            />
            {touched.email && errors.email && (
              <p
                id="signup-email-error"
                className="text-sm font-medium text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="nickname"
              className="text-lg font-bold text-[#1F2937]"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              onBlur={() =>
                setTouched((prevTouched) => ({
                  ...prevTouched,
                  nickname: true,
                }))
              }
              placeholder="닉네임을 입력해 주세요"
              className="h-14 rounded-xl bg-[#F3F4F6] px-6 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
              aria-invalid={touched.nickname && Boolean(errors.nickname)}
              aria-describedby="signup-nickname-error"
            />
            {touched.nickname && errors.nickname && (
              <p
                id="signup-nickname-error"
                className="text-sm font-medium text-red-500"
              >
                {errors.nickname}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-lg font-bold text-[#1F2937]"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setTouched((prevTouched) => ({
                    ...prevTouched,
                    password: true,
                  }))
                }
                placeholder="비밀번호를 입력해 주세요"
                className="h-14 w-full rounded-xl bg-[#F3F4F6] px-6 pr-14 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
                aria-invalid={touched.password && Boolean(errors.password)}
                aria-describedby="signup-password-error"
              />
              <button
                type="button"
                onClick={() =>
                  setIsPasswordVisible(
                    (prevIsPasswordVisible) => !prevIsPasswordVisible,
                  )
                }
                className="absolute right-5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
                aria-label={
                  isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                }
              >
                <Image
                  src={isPasswordVisible ? eyeVisible : eyeInvisible}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {touched.password && errors.password && (
              <p
                id="signup-password-error"
                className="text-sm font-medium text-red-500"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="passwordConfirmation"
              className="text-lg font-bold text-[#1F2937]"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="passwordConfirmation"
                type={isPasswordConfirmationVisible ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                onBlur={() =>
                  setTouched((prevTouched) => ({
                    ...prevTouched,
                    passwordConfirmation: true,
                  }))
                }
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                className="h-14 w-full rounded-xl bg-[#F3F4F6] px-6 pr-14 text-base text-[#111827] outline-none ring-1 ring-transparent transition focus:ring-[#3692FF]"
                aria-invalid={
                  touched.passwordConfirmation &&
                  Boolean(errors.passwordConfirmation)
                }
                aria-describedby="signup-password-confirmation-error"
              />
              <button
                type="button"
                onClick={() =>
                  setIsPasswordConfirmationVisible(
                    (prevIsPasswordConfirmationVisible) =>
                      !prevIsPasswordConfirmationVisible,
                  )
                }
                className="absolute right-5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
                aria-label={
                  isPasswordConfirmationVisible
                    ? "비밀번호 확인 숨기기"
                    : "비밀번호 확인 보기"
                }
              >
                <Image
                  src={
                    isPasswordConfirmationVisible ? eyeVisible : eyeInvisible
                  }
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <p
                id="signup-password-confirmation-error"
                className="text-sm font-medium text-red-500"
              >
                {errors.passwordConfirmation}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-14 rounded-full bg-[#3692FF] text-lg font-semibold text-white transition-colors hover:bg-[#1967D6] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-6 flex h-[74px] items-center justify-between rounded-lg bg-[#E6F2FF] px-6">
          <span className="text-base font-medium text-[#1F2937]">
            간편 로그인하기
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.google.com"
              className="block h-[42px] w-[42px] transition-opacity hover:opacity-80"
              aria-label="구글로 로그인"
            >
              <Image
                src={googleLogo}
                alt=""
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page"
              className="block h-[42px] w-[42px] transition-opacity hover:opacity-80"
              aria-label="카카오로 로그인"
            >
              <Image
                src={kakaoLogo}
                alt=""
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
              />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-base text-[#1F2937]">
          이미 회원이신가요?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#3692FF] underline underline-offset-2"
          >
            로그인
          </Link>
        </p>
      </section>

      <Modal
        open={Boolean(formError)}
        title="회원가입 실패"
        message={formError}
        onClose={handleCloseError}
        labelledBy="signup-error-title"
      />

      <Modal
        open={isSuccessModalOpen}
        title="회원가입 완료"
        message="가입 완료되었습니다."
        onClose={handleCloseSuccess}
        labelledBy="signup-success-title"
        hideTitle
      />
    </div>
  );
}
