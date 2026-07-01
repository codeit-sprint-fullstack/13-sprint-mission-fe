"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import pandaFace from "@/app/asset/pandaface.svg";
import passwordOpen from "@/app/asset/btn_visibility_on.svg";
import passwordClose from "@/app/asset/btn_visibility_off.svg";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  // 아이콘 눌러서 비밀번호 보기/숨기기
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 회원가입 버튼 클릭 시 검증
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    //유효성 검사
    const emailValid = email.trim() !== "";
    const nicknameValid = nickname.trim() !== "";
    const passwordValid = password.length >= 8;
    const passwordConfirmValid = password === passwordConfirmation;

    setEmailError(!emailValid);
    setNicknameError(!nicknameValid);
    setPasswordError(!passwordValid);
    setPasswordConfirmError(!passwordConfirmValid);

    if (
      !emailValid ||
      !nicknameValid ||
      !passwordValid ||
      !passwordConfirmValid
    ) {
      return;
    }

    // 회원가입 API 호출
    const response = await fetch(
      "https://panda-market-api.vercel.app/auth/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          password,
          passwordConfirmation,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      alert(data.message ?? "회원가입에 실패했습니다.");
      return;
    }
    router.push("/signin");
  }

  return (
    <div className="flex max-w-[640px] flex-col items-center gap-[40px] shrink-0 mx-auto my-auto">
      <Link href={"/"}>
        <div className="flex">
          <Image src={pandaFace} alt="Logoimage" width={100} height={100} />
          <p className="text-[66px] font-bold text-[#3692FF]">판다마켓</p>
        </div>
      </Link>
      <form
        className="flex flex-col items-center gap-[24px] self-stretch"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start gap-[24px]">
          <div className="flex flex-col items-start gap-[24px]">
            <div className="flex flex-col items-start gap-[16px]">
              <label className="text-[18px] text-[#1F2937] font-medium">
                이메일
              </label>
              <input
                className="bg-[#F3F4F6] w-[640px] h-[56px] flex px-[16px] py-[24px] items-center gap-[10px] rounded-[12px]"
                placeholder="이메일을 입력해주세요"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-[14px] text-[#F74747] font-medium">
                  이메일을 입력해주세요
                </p>
              )}
              <label className="text-[18px] text-[#1F2937] font-medium">
                닉네임
              </label>
              <input
                className="bg-[#F3F4F6] w-[640px] h-[56px] flex px-[16px] py-[24px] items-center gap-[10px] rounded-[12px]"
                placeholder="닉네임을 입력해주세요"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {nicknameError && (
                <p className="text-[14px] text-[#F74747] font-medium">
                  닉네임을 입력해주세요
                </p>
              )}
              <label className="text-[18px] text-[#1F2937] font-medium">
                비밀번호
              </label>
              <div className="relative">
                <input
                  className="bg-[#F3F4F6] flex w-[640px] h-[56px] px-[16px] py-[24px] items-center gap-[10px] rounded-[12px]"
                  placeholder="비밀번호를 입력해주세요"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={showPassword ? passwordOpen : passwordClose}
                    alt="open"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {passwordError && (
                <p className="text-[14px] text-[#F74747] font-medium">
                  비밀번호를 8자 이상 입력해주세요
                </p>
              )}

              <label className="text-[18px] text-[#1F2937] font-medium">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  className="bg-[#F3F4F6] flex w-[640px] h-[56px] px-[16px] py-[24px] items-center gap-[10px] rounded-[12px]"
                  placeholder="비밀번호를 입력해주세요"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={showPasswordConfirm ? passwordOpen : passwordClose}
                    alt="open"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              {passwordConfirmError && (
                <p className="text-[14px] text-[#F74747] font-medium">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
          </div>
          <button className="bg-[#9CA3AF] flex w-[640px] h-[56px] justify-center items-center gap-[10px] rounded-[40px]">
            <p className="text-[20px] text-[#F3F4F6] font-medium ">회원가입</p>
          </button>
        </div>
        <div className="flex flex-col w-[640px] h-[74px] px-[16px] py-[23px] gap-[10px] bg-[#E6F2FF] rounded-[8px]">
          <div className="flex w-[594px] items-center justify-between">
            <p className="text-[16px] text-[#1F2937] font-medium">
              간편 로그인하기
            </p>
            <div className="flex items-start gap-[16px]">ㅁ ㅁ</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[4px]">
          <p className="text-[14px] text-[#1F2937] font-medium">
            이미 회원이신가요?
          </p>
          <Link
            href={"/signin"}
            className="text-[14px] text-[#3692FF] font-medium underline"
          >
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
