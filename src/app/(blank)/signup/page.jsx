"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
import { authService } from "@/lib/authService";

export default function SignUpPage() {
  const router = useRouter();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordCheckOpen, setPasswordCheckOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [validationResults, setValidationResults] = useState({
    email: true,
    nickname: true,
    password: true,
    passwordConfirmation: true,
  });
  const isValidated = Object.values(validationResults).every((i) => i);

  const { mutate: signUp } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: authService.signUp,
    onSuccess: (result) => {
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      /**TODO: user context 만들고 result.user을 상태로 세팅해주기 */
      router.push("/market");
    },
    onError: (e) => {
      /**TODO: e.message를 alert말고 모달 띄워주기*/
      alert(e.message);
    },
  });

  return (
    <div className="w-full h-fit flex justify-center py-[48px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(data);
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
              data.password && !validationResults.password
                ? "영문, 숫자, 특수문자 조합 8자 이상 입력해주세요"
                : ""
            }
            type={passwordOpen ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={data.password}
            onChange={(e) => {
              const input = e.target.value.trim();
              if (!!!input) {
                setValidationResults((prev) => ({ ...prev, password: true }));
              }
              setData((prev) => ({ ...prev, password: e.target.value }));
              setValidationResults((prev) => ({
                ...prev,
                password: validatePassword(input),
              }));
            }}
            suffix={
              <Image
                src={
                  passwordOpen
                    ? "/icons/ic_btn_visibility_on.svg"
                    : "/icons/ic_btn_visibility_off.svg"
                }
                alt="비밀번호 노출 아이콘"
                width={24}
                height={24}
                onClick={() => setPasswordOpen((prev) => !prev)}
              />
            }
          />
          <FormField
            title="비밀번호 확인"
            errorMsg={
              data.passwordConfirmation &&
              !validationResults.passwordConfirmation
                ? "비밀번호가 일치하지 않습니다."
                : ""
            }
            type={passwordCheckOpen ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={data.passwordConfirmation}
            onChange={(e) => {
              const input = e.target.value.trim();
              if (!!!input) {
                setValidationResults((prev) => ({
                  ...prev,
                  passwordConfirmation: true,
                }));
              }
              setData((prev) => ({
                ...prev,
                passwordConfirmation: e.target.value,
              }));
              setValidationResults((prev) => ({
                ...prev,
                passwordConfirmation: validateCheckedPassword(
                  input,
                  data.password,
                ),
              }));
            }}
            suffix={
              <Image
                src={
                  passwordOpen
                    ? "/icons/ic_btn_visibility_on.svg"
                    : "/icons/ic_btn_visibility_off.svg"
                }
                alt="비밀번호 노출 아이콘"
                width={24}
                height={24}
                onClick={() => setPasswordCheckOpen((prev) => !prev)}
              />
            }
          />
          <Button
            variant="circle"
            disabled={
              !isValidated ||
              !data.email ||
              !data.nickname ||
              !data.password ||
              !data.passwordConfirmation
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
