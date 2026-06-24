"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MODES = {
  login: {
    submitLabel: "로그인",
    bottomText: "판다마켓이 처음이신가요?",
    bottomLink: { href: "/signup", label: "회원가입" },
  },
  signup: {
    submitLabel: "회원가입",
    bottomText: "이미 회원이신가요?",
    bottomLink: { href: "/login", label: "로그인하기" },
  },
};

export default function AuthForm({
  mode = "login",
  values,
  onChange,
  onSubmit,
  disabled = false,
  errors = {},
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const config = MODES[mode];

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      {/* 이메일 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[18px] font-bold text-gray-800">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
          required
          className={`w-full h-12 pl-4 pr-12 border rounded-lg text-base outline-none bg-gray-100 text-gray-800 focus:border-primary ${
            errors.email ? "border-red-500" : "border-transparent"
          }`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* 닉네임 (회원가입만) */}
      {mode === "signup" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[18px] font-bold text-gray-800">
            닉네임
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={onChange}
            placeholder="닉네임을 입력해주세요"
            required
            className="w-full h-12 pl-4 pr-12 border border-transparent rounded-lg text-base outline-none bg-gray-100 text-gray-800 focus:border-primary"
          />
        </div>
      )}

      {/* 비밀번호 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-[18px] font-bold text-gray-800"
        >
          비밀번호
        </label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={values.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
            required
            className={`w-full h-12 pl-4 pr-12 border rounded-lg text-base outline-none bg-gray-100 text-gray-800 focus:border-primary ${
              errors.password ? "border-red-500" : "border-transparent"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 p-0 bg-transparent border-none cursor-pointer flex items-center"
          >
            <Image
              src={
                showPassword
                  ? "/icons/btn_visibility_on_24px.svg"
                  : "/icons/btn_visibility_off_24px.svg"
              }
              alt="비밀번호 보기"
              width={24}
              height={24}
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* 비밀번호 확인 (회원가입만) */}
      {mode === "signup" && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="passwordRepeat"
            className="text-[18px] font-bold text-gray-800"
          >
            비밀번호 확인
          </label>
          <div className="relative flex items-center">
            <input
              type={showPasswordRepeat ? "text" : "password"}
              id="passwordRepeat"
              name="passwordRepeat"
              value={values.passwordRepeat}
              onChange={onChange}
              placeholder="비밀번호를 다시 입력해주세요"
              required
              className={`w-full h-12 pl-4 pr-12 border rounded-lg text-base outline-none bg-gray-100 text-gray-800 focus:border-primary ${
                errors.passwordRepeat ? "border-red-500" : "border-transparent"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPasswordRepeat((prev) => !prev)}
              className="absolute right-6 p-0 bg-transparent border-none cursor-pointer flex items-center"
            >
              <Image
                src={
                  showPasswordRepeat
                    ? "/icons/btn_visibility_on_24px.svg"
                    : "/icons/btn_visibility_off_24px.svg"
                }
                alt="비밀번호 확인 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          {errors.passwordRepeat && (
            <p className="text-sm text-red-500">{errors.passwordRepeat}</p>
          )}
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full h-14 bg-primary text-gray-100 border-none rounded-[40px] text-xl font-semibold cursor-pointer hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {config.submitLabel}
      </button>

      {/* 간편 로그인 */}
      <div className="w-full h-18.5 py-4 px-5.75 flex justify-between items-center rounded-lg bg-[#E6F2FF]">
        <p className="text-base font-medium text-gray-800">간편 로그인하기</p>
        <div className="flex gap-4">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10.5 h-10.5 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-white"
          >
            <Image
              src="/icons/ic_google.png"
              alt="구글 로고"
              width={22}
              height={22}
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10.5 h-10.5 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-[#FEE500]"
          >
            <Image
              src="/icons/ic_kakao.svg"
              alt="카카오 로고"
              width={22}
              height={22}
            />
          </a>
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="text-center text-sm text-gray-800">
        <p>
          {config.bottomText}
          <Link
            href={config.bottomLink.href}
            className="text-primary font-medium underline"
          >
            {config.bottomLink.label}
          </Link>
        </p>
      </div>
    </form>
  );
}
