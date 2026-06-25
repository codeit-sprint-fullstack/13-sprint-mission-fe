"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/svg/panda_logo.svg";
import GoogleLogo from "@/assets/png/img_google_logo.png";
import KakaoLogo from "@/assets/png/img_kakao_logo.png";
import EyeOffImg from "@/assets/png/img_visibility_off.png";
import EyeOnImg from "@/assets/png/img_visibility_on.png";

export default function SignUpPage() {
  const [show, setShow] = useState({ password: false, passwordConfirm: false });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
      <Link href="/" className="flex flex-col items-center gap-4 mb-10">
        <Image src={Logo} alt="판다마켓 로고" width={96} height={96} />
        <span className="font-rokaf font-bold text-4xl text-primary-100">
          판다마켓
        </span>
      </Link>

      <section className="w-full max-w-[640px] flex flex-col gap-6">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-800">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              className="w-full bg-gray-100 rounded-xl px-6 py-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nickname" className="text-sm font-bold text-gray-800">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              className="w-full bg-gray-100 rounded-xl px-6 py-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-gray-800">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={show.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                className="w-full bg-gray-100 rounded-xl px-6 py-4 pr-14 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => ({ ...prev, password: !prev.password }))}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={show.password ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                <Image
                  src={show.password ? EyeOnImg : EyeOffImg}
                  alt={show.password ? "비밀번호 숨기기" : "비밀번호 표시"}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-bold text-gray-800"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={show.passwordConfirm ? "text" : "password"}
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className="w-full bg-gray-100 rounded-xl px-6 py-4 pr-14 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => ({ ...prev, passwordConfirm: !prev.passwordConfirm }))}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={show.passwordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
              >
                <Image
                  src={show.passwordConfirm ? EyeOnImg : EyeOffImg}
                  alt={show.passwordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold text-base py-4 rounded-xl transition-colors"
          >
            회원가입
          </button>
        </form>

        <div className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-xl px-6 py-4">
          <p className="text-sm font-medium text-gray-700">간편 로그인하기</p>
          <div className="flex gap-4">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
              aria-label="구글 로그인"
            >
              <Image
                src={GoogleLogo}
                alt="구글 로그인"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center hover:shadow-md transition-shadow"
              aria-label="카카오 로그인"
            >
              <Image
                src={KakaoLogo}
                alt="카카오 로그인"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>

        <p className="text-sm text-center text-gray-500">
          이미 회원이신가요?{" "}
          <Link href="/auth" className="text-primary-100 font-bold underline ml-1">
            로그인
          </Link>
        </p>
      </section>
    </div>
  );
}
