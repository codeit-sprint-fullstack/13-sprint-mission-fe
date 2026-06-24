"use client";
import Image from "next/image";
import React, { useState } from "react";
import ic_visibility_on from "@/assets/icons/btn_visibility_on_24px.svg";
import ic_visibility_off from "@/assets/icons/btn_visibility_off_24px.svg";
import Link from "next/link";
import ic_google from "@/assets/icons/ic_google.png";
import ic_kakao from "@/assets/icons/ic_kakao.svg";
import AuthModal from "./AuthModal";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function AuthForm({ type = "signin" }) {
  const { signin, signup } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const isSignin = type === "signin";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const isFormValid = isSignin
    ? formData.email && formData.password
    : formData.email &&
      formData.nickname &&
      formData.password &&
      formData.passwordCheck;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: "",
      nickname: "",
      password: "",
      passwordCheck: "",
    };

    // 1차 프론트엔드 유효성 검사
    if (!formData.email || !formData.password) {
      newErrors.email = "이메일을 확인해 주세요.";
      newErrors.password = "비밀번호를 확인해 주세요.";
      setErrors(newErrors);
      return;
    }

    if (!isSignin && formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = "비밀번호가 일치하지 않아요.";
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);

    try {
      if (isSignin) {
        // 🔑 1. 로그인 요청 보내기
        await signin(formData.email, formData.password);
        setModalMessage("로그인에 성공했습니다");
      } else {
        // 📝 2. 회원가입 요청 보내기
        await signup({
          nickname: formData.nickname,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordCheck,
        });

        // ⚡ 회원가입 성공하자마자 딜레이 없이 바로 가입한 정보로 로그인 꽂아버리기!
        await signin(formData.email, formData.password);
        setModalMessage("가입이 완료되었습니다.");
      }
      setIsSuccess(true);
      setIsModalOpen(true);
    } catch (error) {
      // 💥 백엔드가 뱉은 에러(400, 401, 409 중복 등)를 여기서 잡아서 모달에 표기!
      console.error("인증 처리 중 에러 발생:", error);
      setIsSuccess(false);
      setModalMessage(
        isSignin
          ? "이메일 또는 비밀번호를 다시 확인해 주세요."
          : "이미 존재하는 이메일이거나 회원가입에 실패했습니다.",
      );
      setIsModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      router.push("/"); // 🚀 성공했을 때만 메인 페이지('/')로 리다이렉트!
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:gap-6 max-w-[640px] w-full"
      >
        <div className="flex flex-col  gap-2 md:gap-4 w-[343px] md:w-[640px]">
          <label className="text-gray-800 font-bold text-md md:text-2lg">
            이메일
          </label>
          <input
            onChange={handleChange}
            name="email"
            value={formData.email}
            type="email"
            placeholder="이메일을 입력해주세요"
            className={`w-full bg-gray-100 px-6 py-4 rounded-xl ${errors.email && "border border-error-red"}`}
          />
          {errors.email && (
            <p className="text-error-red test-lg font-semibold pl-4">
              {errors.email}
            </p>
          )}
        </div>
        {!isSignin && (
          <div className="flex flex-col max-w-[640px] gap-2 md:gap-4 w-[343px] md:w-[640px]">
            <label className="text-gray-800 font-bold text-md md:text-2lg">
              닉네임
            </label>
            <input
              onChange={handleChange}
              name="nickname"
              value={formData.nickname}
              type="text"
              placeholder="닉네임을 입력해주세요"
              className="w-full bg-gray-100 px-6 py-4 rounded-xl"
            />
          </div>
        )}

        <div className="flex flex-col max-w-[640px] gap-2 md:gap-4 w-[343px] md:w-[640px]">
          <label className="text-gray-800 font-bold text-md md:text-2lg">
            비밀번호
          </label>
          <div className="relative flex items-center">
            <input
              onChange={handleChange}
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className={`w-full bg-gray-100 px-6 py-4 rounded-xl ${errors.password && "border border-error-red"}`}
            />
            <button
              onClick={handleToggle}
              type="button"
              className="absolute right-6"
            >
              {showPassword ? (
                <Image
                  alt="비밀번호 표시 버튼"
                  src={ic_visibility_on}
                  width={24}
                  height={24}
                  className=""
                />
              ) : (
                <Image
                  alt="비밀번호 숨김 버튼"
                  src={ic_visibility_off}
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-error-red test-lg font-semibold pl-4">
              {errors.password}
            </p>
          )}
        </div>
        {!isSignin && (
          <div className="flex flex-col max-w-[640px] gap-2 md:gap-4 w-[343px] md:w-[640px]">
            <label className="text-gray-800 font-bold text-md md:text-2lg">
              비밀번호 확인
            </label>
            <div className="relative flex items-center">
              <input
                onChange={handleChange}
                name="passwordCheck"
                value={formData.passwordCheck}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className={`w-full bg-gray-100 px-6 py-4 rounded-xl ${errors.passwordCheck && "border border-error-red"}`}
              />
              <button
                onClick={handleToggle}
                type="button"
                className="absolute right-6"
              >
                {showPassword ? (
                  <Image
                    alt="비밀번호 표시 버튼"
                    src={ic_visibility_on}
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    alt="비밀번호 숨김 버튼"
                    src={ic_visibility_off}
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </div>
            {errors.passwordCheck && (
              <p className="text-error-red test-lg font-semibold pl-4">
                {errors.passwordCheck}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`h-[56px] rounded-[50px] text-xl font-semibold text-gray-100 ${isFormValid ? "bg-primary-100" : "bg-gray-400"} `}
        >
          {isSignin ? "로그인" : "회원가입"}
        </button>
      </form>
      <div className="bg-[#E6F2FF] flex justify-between h-[74px] px-6 py-4 items-center rounded-lg">
        <p className="text-lg text-gray-800 font-medium">간편 로그인하기</p>
        <div className="flex gap-4">
          <a
            href="https://www.google.com"
            className="bg-white rounded-[50px] w-[42px] h-[42px] flex justify-center items-center "
          >
            <Image alt="" src={ic_google} width={22} height={22} />
          </a>
          <a
            href="https://www.kakaocorp.com/page"
            className="bg-[#F5E14B] rounded-[50px] w-[42px] h-[42px] flex justify-center items-center "
          >
            <Image alt="" src={ic_kakao} width={26} height={24} />
          </a>
        </div>
      </div>
      <div className="flex gap-1 justify-center">
        <p className="text-md font-medium text-gray-800">
          {isSignin ? "판다마켓이 처음이신가요?" : "이미 회원이신가요?"}
        </p>
        <Link
          href={isSignin ? "/signup" : "/signin"}
          className="text-md underline underline-offset-3 text-primary-100"
        >
          {isSignin ? "회원가입" : "로그인"}
        </Link>
      </div>
      <AuthModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </section>
  );
}
