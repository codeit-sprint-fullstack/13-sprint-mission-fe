"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api";
import Modal from "@/components/common/Modal";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPassword = formData.password.length >= 8;

  const isValid =
    formData.email.trim() !== "" &&
    isValidEmail &&
    formData.password.trim() !== "" &&
    isValidPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      const data = await signIn({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    } catch (error) {
      setModal({
        isOpen: true,
        message: error.message || "로그인에 실패했습니다.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {modal.isOpen && (
        <Modal
          message={modal.message}
          onClose={() => setModal({ isOpen: false, message: "" })}
        />
      )}

      <Link href="/" className="mb-10">
        <Image
          src="/signuplogo.png"
          alt="판다마켓 로고"
          width={250}
          height={250}
          className="w-auto h-auto"
          loading="eager"
        />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[640px] flex flex-col gap-6"
      >
        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">이메일</label>
          <input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className={`w-full h-14 px-6 rounded-xl bg-gray-100 outline-none focus:ring-1 text-sm
              ${
                formData.email && !isValidEmail
                  ? "ring-1 ring-red-400 focus:ring-red-400"
                  : "focus:ring-blue-400"
              }`}
          />
          {formData.email && !isValidEmail && (
            <p className="text-red-400 text-xs mt-1">잘못된 이메일입니다.</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">비밀번호</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className={`w-full h-14 px-6 pr-12 rounded-xl bg-gray-100 outline-none focus:ring-1 text-sm
                ${
                  formData.password && !isValidPassword
                    ? "ring-1 ring-red-400 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-4"
            >
              <Image
                src="/eyesicon.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          {formData.password && !isValidPassword && (
            <p className="text-red-400 text-xs mt-1">
              비밀번호를 8자 이상 입력해주세요.
            </p>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full h-14 rounded-full text-white font-semibold transition
            ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          로그인
        </button>

        {/* 간편 로그인 */}
        <div className="flex justify-between items-center w-full h-14 px-6 rounded-xl bg-blue-50 text-sm font-medium text-gray-700">
          <span>간편 로그인하기</span>
          <div className="flex items-center gap-4">
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <Image
                src="/googlelogo.png"
                alt="구글 로그인"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/kakaologo.png"
                alt="카카오 로그인"
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="flex justify-center items-center gap-2 text-sm mt-4">
          <span className="text-gray-600">판다마켓이 처음이신가요?</span>
          <Link href="/signup" className="text-blue-500 font-semibold">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
