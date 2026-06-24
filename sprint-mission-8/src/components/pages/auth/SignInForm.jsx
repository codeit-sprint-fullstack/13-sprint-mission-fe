"use client";

import Image from "next/image";
import Logo from "../../../../public/logo/logo.png";
import Google from "../../../../public/img/google.png";
import KakaoTalk from "../../../../public/img/kakaotalk.svg";
import Link from "next/link";
import { InputWithLabel, PassWordWithLabel } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const { signin } = useAuth(); // ← 추가
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(values) {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "잘못된 이메일입니다.";
    }

    if (!values.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);

    // 에러가 하나라도 있으면 제출 중단
    if (Object.keys(newErrors).length > 0) return;

    // 검증 통과 → API 호출
    try {
      await signin(values.email, values.password);
      router.push("/");
    } catch (err) {
      setErrors({ email: err.message });
    }
  }

  return (
    <div className="m-auto w-85.75 mt-20 tablet:w-160 tablet:mt-47.5 pc:mt-58">
      <div className="flex justify-center">
        <Link href={"/"}>
          <Image
            src={Logo}
            width={1188}
            height={396}
            alt="홈로고"
            className="w-49.5 tablet:w-99 tablet:h-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 tablet:gap-6 mt-6 tablet:mt-10">
        <InputWithLabel
          placeHolder="이메일을 입력해주세요"
          label="이메일"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PassWordWithLabel
          placeHolder="비밀번호를 입력해주세요"
          label="비밀번호"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button size="large" onClick={handleSubmit}>
          로그인
        </Button>
      </div>
      <div className="flex justify-between items-center w-full px-6 py-4 mt-6 rounded-lg bg-[#E6F2FF]">
        <span>간편로그인하기</span>
        <div className="flex gap-4">
          <div className="flex justify-center items-center rounded-[50%] w-10.5 h-10.5 bg-white">
            <Link href="https://www.google.com">
              <Image src={Google} height={22} width={22} alt="google" />
            </Link>
          </div>
          <div className="flex justify-center items-center rounded-[50%] w-10.5 h-10.5 bg-[#F5E14B]">
            <Link href="https://www.kakaocorp.com/page">
              <Image
                src={KakaoTalk}
                height={21}
                width={19}
                alt="kakaotalk"
                className="w-6.5 h-6.5"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        판다마켓이 처음이신가요?{" "}
        <Link href={"/signup"} className="text-Primary-100 underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
