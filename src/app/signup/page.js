"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: "", type: "" });

  // 2. React Query: 회원가입 Mutation
  const signUpMutation = useMutation({
    mutationFn: (formData) => api.post("/users", formData),
    onSuccess: () => {
      setModal({
        isOpen: true,
        message: "가입 완료되었습니다.",
        type: "success",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      setModal({ isOpen: true, message: errorMessage, type: "error" });
    },
  });

  const onSubmit = (data) => {
    const { passwordConfirmation, ...submitData } = data;
    signUpMutation.mutate(submitData);
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.type === "success") {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[343px] min-[744px]:max-w-[400px] min-[1200px]:max-w-[640px] p-6 min-[744px]:p-8 bg-white rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-10">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={396}
                height={132}
                priority
              />
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block mb-2 text-base min-[744px]:text-lg font-medium text-gray-800">
                이메일
              </label>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "올바른 이메일 형식이 아닙니다.",
                  },
                })}
                type="email"
                placeholder="이메일을 입력해주세요"
                className={`w-full h-12 min-[744px]:h-14 px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-base min-[744px]:text-lg font-medium text-gray-800">
                닉네임
              </label>
              <input
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  maxLength: {
                    value: 10,
                    message: "닉네임은 10자 이내여야 합니다.",
                  },
                })}
                type="text"
                placeholder="닉네임을 입력해주세요"
                className={`w-full h-12 min-[744px]:h-14 px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.nickname ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.nickname && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-base min-[744px]:text-lg font-medium text-gray-800">
                비밀번호
              </label>
              <div className="relative w-full h-12 min-[744px]:h-14">
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상 입력해주세요.",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  className={`w-full h-full px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-colors ${
                    errors.password ? "border-red-500" : "border-transparent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80"
                >
                  <Image
                    src={
                      showPassword
                        ? "/btn_visibility_on_24px_1.png"
                        : "/btn_visibility_on_24px.png"
                    }
                    alt="비밀번호 보기"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-base min-[744px]:text-lg font-medium text-gray-800">
                비밀번호 확인
              </label>
              <div className="relative w-full h-12 min-[744px]:h-14">
                <input
                  {...register("passwordConfirmation", {
                    required: "비밀번호 확인을 입력해주세요.",
                    validate: (value) =>
                      value === watch("password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  className={`w-full h-full px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-colors ${
                    errors.passwordConfirmation
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80"
                >
                  <Image
                    src={
                      showPasswordConfirm
                        ? "/btn_visibility_on_24px_1.png"
                        : "/btn_visibility_on_24px.png"
                    }
                    alt="비밀번호 보기"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              {errors.passwordConfirmation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || signUpMutation.isPending}
              className="w-full h-12 min-[744px]:h-14 mt-4 text-white font-medium bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {signUpMutation.isPending ? "가입 처리 중..." : "회원가입"}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm min-[744px]:text-base text-gray-600">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            로그인
          </Link>
        </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
            <p className="mb-8 font-medium text-gray-800 text-lg">
              {modal.message}
            </p>
            <button
              onClick={closeModal}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
