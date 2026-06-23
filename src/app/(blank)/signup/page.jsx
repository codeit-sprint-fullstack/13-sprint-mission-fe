"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "@/components/ui/Button";
import Social from "@/components/ui/Social";
import FormField from "@/components/ui/FormField";

import {
  validateEmail,
  validatePassword,
  validateCheckedPassword,
} from "@/utils/validation";

export default function SignUpPage() {
  const [pwOpen, setPwOpen] = useState(false);
  const [pwCheckOpen, setPwCheckOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    nickname: "",
    pw: "",
    checkPw: "",
  });
  const [validationResults, setValidationResults] = useState({
    email: true,
    nickname: true,
    pw: true,
    checkPw: true,
  });
  const isValidated = Object.values(validationResults).every((i) => i);

  return (
    <div className="w-full h-fit flex justify-center py-[48px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-[640px] max-tablet:max-w-[640px] max-tablet:px-[16px]"
      >
        <Link href="/">
          <div className="flex justify-center items-center gap-[22px] mb-[40px]">
            <Image
              src="/icons/ic_logo.svg"
              alt="로고 이미지"
              width={105}
              height={105}
            />
            <h1 className="text-[65px] font-bold text-primary max-tablet:text-[55px] max-mobile:text-[50px]">
              판다마켓
            </h1>
          </div>
        </Link>

        <div className="flex flex-col gap-[24px]">
          <FormField
            title="이메일"
            errorMsg={
              data.email && !validationResults.email
                ? "잘못된 이메일 형식입니다"
                : ""
            }
            placeholder="이메일을 입력해주세요"
            value={data.email}
            onChange={(e) => {
              const input = e.target.value.trim();
              if (!!!input) {
                setValidationResults((prev) => ({ ...prev, email: true }));
              }
              setData((prev) => ({ ...prev, email: e.target.value }));
              setValidationResults((prev) => ({
                ...prev,
                email: validateEmail(input),
              }));
            }}
          />
          <FormField
            title="닉네임"
            placeholder="닉네임을 입력해주세요"
            value={data.nickname}
            onChange={(e) => {
              const input = e.target.value.trim();
              setData((prev) => ({ ...prev, nickname: input }));
            }}
          />
          <FormField
            title="비밀번호"
            errorMsg={
              data.pw && !validationResults.pw
                ? "영문, 숫자, 특수문자 조합 8자 이상 입력해주세요"
                : ""
            }
            type={pwOpen ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={data.pw}
            onChange={(e) => {
              const input = e.target.value.trim();
              if (!!!input) {
                setValidationResults((prev) => ({ ...prev, pw: true }));
              }
              setData((prev) => ({ ...prev, pw: e.target.value }));
              setValidationResults((prev) => ({
                ...prev,
                pw: validatePassword(input),
              }));
            }}
            suffix={
              <Image
                src={
                  pwOpen
                    ? "/icons/ic_btn_visibility_on.svg"
                    : "/icons/ic_btn_visibility_off.svg"
                }
                alt="비밀번호 노출 아이콘"
                width={24}
                height={24}
                onClick={() => setPwOpen((prev) => !prev)}
              />
            }
          />
          <FormField
            title="비밀번호 확인"
            errorMsg={
              data.checkPw && !validationResults.checkPw
                ? "비밀번호가 일치하지 않습니다."
                : ""
            }
            type={pwCheckOpen ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={data.checkPw}
            onChange={(e) => {
              const input = e.target.value.trim();
              if (!!!input) {
                setValidationResults((prev) => ({ ...prev, checkPw: true }));
              }
              setData((prev) => ({ ...prev, checkPw: e.target.value }));
              setValidationResults((prev) => ({
                ...prev,
                checkPw: validateCheckedPassword(input, data.pw),
              }));
            }}
            suffix={
              <Image
                src={
                  pwOpen
                    ? "/icons/ic_btn_visibility_on.svg"
                    : "/icons/ic_btn_visibility_off.svg"
                }
                alt="비밀번호 노출 아이콘"
                width={24}
                height={24}
                onClick={() => setPwCheckOpen((prev) => !prev)}
              />
            }
          />
          <Button
            variant="circle"
            disabled={
              !isValidated ||
              !data.email ||
              !data.nickname ||
              !data.pw ||
              !data.checkPw
            }
            className="bg-primary py-[12px] text-[20px] font-semibold text-secondary-100"
          >
            회원가입
          </Button>
          <Social />
          <p className="m-auto">
            이미 회원이신가요?{" "}
            <Link href="/login" className="text-primary underline">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
