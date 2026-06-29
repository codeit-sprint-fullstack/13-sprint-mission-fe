"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: (credentials) => api.post("/auth/signIn", credentials),
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/items");
    },
    onError: () => {
      setModalMessage(
        "비밀번호가 일치하지 않거나 로그인 중 오류가 발생했습니다.",
      );
      setIsModalOpen(true);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 md:px-0">
      <div className="w-full md:w-[400px] xl:w-[640px] min-h-[600px] p-6 md:p-8 bg-white rounded-lg shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-[40px]">
            <Image
              src="/logo.png"
              alt="Logo"
              width={396}
              height={132}
              priority
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
                type="email"
                placeholder="이메일을 입력해주세요"
                className={`w-full h-[56px] mt-2 px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-transparent"}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="relative mt-2">
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  className={`w-full h-[56px] px-4 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                    errors.password ? "border-red-500" : "border-transparent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transform -translate-y-1/2 right-4 top-1/2 hover:opacity-80"
                >
                  <Image
                    src={
                      showPassword
                        ? "/btn_visibility_on_24px_1.png"
                        : "/btn_visibility_on_24px.png"
                    }
                    alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
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

            <button
              type="submit"
              disabled={loginMutation.isPending}
              style={{ backgroundColor: "#3692FF" }}
              className="w-full h-[56px] mt-4 text-white font-medium rounded-lg hover:opacity-90 disabled:bg-gray-400 transition-colors flex justify-center items-center"
            >
              {loginMutation.isPending ? (
                <span className="animate-pulse">로그인 중...</span>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <div
            style={{ backgroundColor: "#E6F2FF" }}
            className="flex items-center justify-between px-6 py-4 rounded-lg my-4"
          >
            <span className="text-sm font-medium text-gray-700">
              간편 로그인하기
            </span>
            <div className="flex gap-3">
              <button type="button" className="hover:opacity-80">
                <Image
                  src="/Component 2.png"
                  alt="Google Login"
                  width={42}
                  height={42}
                />
              </button>
              <button type="button" className="hover:opacity-80">
                <Image
                  src="/Component 3.png"
                  alt="Kakao Login"
                  width={42}
                  height={42}
                />
              </button>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            판다마켓이 처음이신가요?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center text-black">
            <p className="mb-6 font-medium text-lg">{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
