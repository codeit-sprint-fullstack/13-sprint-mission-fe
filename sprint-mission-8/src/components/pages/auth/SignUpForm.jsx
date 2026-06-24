"use client";
import Button from "@/components/ui/Button";
import { InputWithLabel, PassWordWithLabel } from "@/components/ui/Input";
import Logo from "../../../../public/logo/logo.png";
import Google from "../../../../public/img/google.png";
import KakaoTalk from "../../../../public/img/kakaotalk.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const { signup } = useAuth(); // ← 추가
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
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

    if (!values.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (values.nickname.length > 10) {
      newErrors.nickname = "닉네임은 10자 이하로 입력해주세요.";
    }

    if (!values.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }

    if (!values.passwordConfirmation) {
      newErrors.passwordConfirmation = "비밀번호를 다시 한 번 입력해주세요.";
    } else if (values.password !== values.passwordConfirmation) {
      newErrors.passwordConfirmation = "비밀번호가 일치하지 않습니다.";
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
      await signup(
        values.nickname,
        values.email,
        values.password,
        values.passwordConfirmation,
      );
      router.push("/signin");
    } catch (err) {
      setErrors({ email: err.message });
    }
  }

  return (
    <div className="m-auto w-85.75 mt-6 tablet:w-160 tablet:mt-12 pc:mt-15">
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
        <InputWithLabel
          placeHolder="닉네임을 입력해주세요"
          label="닉네임"
          name="nickname"
          value={values.nickname}
          onChange={handleChange}
          error={errors.nickname}
        />
        <PassWordWithLabel
          placeHolder="비밀번호를 입력해주세요"
          label="비밀번호"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <PassWordWithLabel
          placeHolder="비밀번호를 다시 한번 입력해주세요"
          label="비밀번호 확인"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          error={errors.passwordConfirmation}
        />
        <Button size="large" onClick={handleSubmit}>
          회원가입
        </Button>
      </div>
      <div className="flex justify-between items-center w-full px-6 py-4 mt-6 rounded-lg bg-[#E6F2FF]">
        <span>간편로그인하기</span>
        <div className="flex gap-4">
          <div className="flex justify-center items-center rounded-[50%] w-10.5 h-10.5 bg-white">
            <Image src={Google} height={22} width={22} alt="google" />
          </div>
          <div className="flex justify-center items-center rounded-[50%] w-10.5 h-10.5 bg-[#F5E14B]">
            <Image
              src={KakaoTalk}
              height={21}
              width={19}
              alt="kakaotalk"
              className="w-6.5 h-6.5"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        이미 회원이신가요?{" "}
        <Link href={"/signin"} className="text-Primary-100 underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
