"use client";

import Link from "next/link";
import React, { useState } from "react";
import fandaLogo from "../../../assets/logo/pandaface.svg";
import googleIcon from "../../../assets/social/ic_google.svg";
import kakaoIcon from "../../../assets/social/ic_kakao.svg";
import eyesOn from "../../../assets/icon/visibility_on.svg";
import eyesOff from "../../../assets/icon/visibility_off.svg";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";

export default function LoginPage() {
  const [errorModal, setErrorModal] = useState<string>("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [eyesActive, setEyesActive] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  async function handleSubmit(formData: FormData) {
    const email: FormDataEntryValue | null = formData.get("email");
    const password: FormDataEntryValue | null = formData.get("password");

    let isValidForm = false;
    //타입 좁히기.
    if (typeof email !== "string" || !validateEmail(email) || !email) {
      setErrors((prev) => {
        return { ...prev, email: "잘못된 이메일입니다." };
      });
      isValidForm = true;
    }
    if (typeof password !== "string" || !password || password.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: "비밀번호를 8자 이상 입력해주세요" };
      });
      isValidForm = true;
    }
    if (isValidForm) return;

    try {
      await login(email, password);
      router.push("/items");
    } catch (error) {
      setErrorModal(
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
      );
    }
  }
  return (
    <div className="flex w-[40rem] flex-col items-center gap-[2.5rem] shrink-0 mx-auto mt-[14.44rem]">
      <Link className="flex justify-center items-center gap-[1.39rem]" href="/">
        <Image src={fandaLogo} alt="판다로고이미지" width={103} height={103} />
        <h2 className="font-sans font-bold text-[#3692ff] text-[4.1465rem] leading-normal">
          판다마켓
        </h2>
      </Link>

      <form
        className="flex flex-col items-start gap-[1.5rem] self-stretch"
        id="signupForm"
        action={handleSubmit}
      >
        <label
          htmlFor="email"
          className="text-[#1F2937] font-pretendard text-[1.125rem] font-bold leading-[1.625rem]"
        >
          이메일
        </label>
        <input
          className={`flex gap-[0.625rem] shrink-0 w-full h-[2.625rem] items-start py-[0.5625rem] px-[1.25rem] bg-[#F3F4F6] rounded-[0.75rem]  text-[#9CA3AF] ${errors.email && "border-[#F74747] border"}`}
          id="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
        />
        {errors.email && (
          <p className="font-pretendard text-[0.875rem] font-semibold leading-[1.5rem] text-[#F74747]">
            {errors.email}
          </p>
        )}
        <label
          htmlFor="password"
          className="text-[#1F2937] font-pretendard text-[1.125rem] font-bold leading-[1.625rem]"
        >
          비밀번호
        </label>
        <div
          className={`flex gap-[0.625rem] shrink-0 w-full h-[2.625rem] items-start py-[0.5625rem] px-[1.25rem] bg-[#F3F4F6] rounded-[0.75rem]  ${errors.email && "border-[#F74747] border"}`}
        >
          <input
            className="w-full font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
            id="password"
            name="password"
            type={eyesActive ? `none` : `password`}
            placeholder="비밀번호를 입력해 주세요"
          />
          <Image
            className="cursor-pointer"
            src={eyesActive ? eyesOn : eyesOff}
            alt="검색이미지"
            onClick={() => setEyesActive(!eyesActive)}
          ></Image>
        </div>
        {errors.password && (
          <p className="font-pretendard text-[0.875rem] font-semibold leading-[1.5rem] text-[#F74747]">
            {errors.password}
          </p>
        )}

        <button
          type="submit"
          className={`w-[40rem] rounded-[2.5rem] bg-[#3692FF] h-[3.5rem] py[1rem] px-[7.75rem] cursor-pointer`}
        >
          <span className="text-white font-pretendard text-center text-[1.25rem] leading-[2rem] font-semibold">
            로그인
          </span>
        </button>
      </form>
      <div className="rounded-[0.5rem] bg-[#E6F2FF] flex w-[40rem] h-[4.625rem] py-[1rem] px-[1.4375rem] items-center gap-[0.625rem]">
        <div className="flex w-[37.125rem] justify-between items-center">
          <span className="text-[#1F2937] font-['Pretendard'] text-base font-medium leading-[1.625rem] not-italic">
            간편로그인하기
          </span>
          <div className="flex items-start gap-[1rem]">
            <Link
              className="flex justify-center items-center gap-[1.39rem]"
              href="https://www.google.com"
            >
              <Image src={googleIcon} alt="구글 아이콘" />
            </Link>
            <Link
              className="flex justify-center items-center gap-[1.39rem]"
              href="https://www.kakaocorp.com/page"
            >
              <Image src={kakaoIcon} alt="카카오 아이콘" />
            </Link>
          </div>
        </div>
      </div>
      <div className="font-medium leading-[1.5rem] text-[0.875rem] text-center text[#1F2937]">
        판다마켓이 처음이신가요?
        <Link
          href="/signup"
          className="text-[#3182f6] underline underline-[0.125rem]"
        >
          회원가입
        </Link>
      </div>
      {errorModal && (
        <Modal onClose={() => setErrorModal("")}>
          <p className="whitespace-nowrap font-pretendard text-[1.125rem] text-[500] leading-[1.625rem] text-center text-[#1F2937]">
            {errorModal}
          </p>
        </Modal>
      )}
    </div>
  );
}
