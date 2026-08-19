"use client";
import Modal from "@/components/common/modal";
import { setToken } from "@/lib/authService";
import { useAuth } from "@/providers/providers";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFiled = "email" | "password";

type LoginForm = {
  email: string;
  password: string;
};

type LoginApiError = Error & {
  details?: Record<string, { message: string }>;
};

type LoginResponse = {
  accessToken: string;
};

type ModalProps = {
  isOpen: boolean;
  message: string;
};

const formatMessage = (field: LoginFiled, message: string) => {
  if (message.includes("Not match")) {
    if (field === "email") return "이메일을 확인해 주세요";
  }
  if (message.includes("minLength")) return "비밀번호를 확인해주세요";
  return message;
};

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    message: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // 입력 시 에러 초기화
  };

  const { mutate: signIn, isPending } = useMutation<
    LoginResponse,
    LoginApiError,
    LoginForm
  >({
    mutationFn: async (formData: LoginForm) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            encryptedpassword: formData.password,
          }),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        const err = new Error(data.message) as LoginApiError;
        err.details = data.details;
        throw err;
      }
      return res.json();
    },
    onSuccess: async (data) => {
      setToken(data.accessToken);
      await refreshUser();
      router.push("/items");
    },
    onError: (err) => {
      if (err.details) {
        const newErrors: Partial<Record<LoginFiled, string>> = {};
        Object.entries(err.details).forEach(([key, val]) => {
          const field = key.replace("requestBody.", "") as LoginFiled;
          newErrors[field] = formatMessage(field, val.message);
        });
        setErrors((prev) => ({ ...prev, ...newErrors }));
      } else {
        setErrors({
          email: "이메일을 확인해 주세요.",
          password: "비밀번호를 확인해 주세요.",
        });
      }
      setModal({
        isOpen: true,
        message: err.message || "이메일 또는 비밀번호를 확인해 주세요.",
      });
    },
  });

  const isDisabled = !form.email || !form.password || isPending;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(form);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <header>
        <Link href="/" className="flex items-center gap-[22px] mb-10">
          <Image
            src="/images/판다 얼굴.png"
            width={104}
            height={104}
            alt="판다 얼굴"
          />
          <h1 className="font-rokaf text-primary-100 font-bold text-[66px]">
            판다마켓
          </h1>
        </Link>
      </header>

      <main className="w-full max-w-160">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <label className="flex flex-col gap-2">
            <span className="font-bold text-lg">이메일</span>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="이메일을 입력해주세요"
              className="w-full rounded-xl bg-gray-100 h-14 px-6 py-[15px] text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-error-red text-sm">{errors.email}</p>
            )}
          </label>

          {/* 비밀번호 */}
          <label className="flex flex-col gap-2">
            <span className="font-bold text-lg">비밀번호</span>
            <div className="relative">
              <input
                name="password"
                onChange={handleChange}
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className="w-full rounded-xl bg-gray-100 h-14 px-6 py-[15px] text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              {errors.password && (
                <p className="text-error-red text-sm mt-2">
                  비밀번호를 확인해주세요
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Image
                  src={
                    showPw
                      ? "/images/btn_visibility_on_24px.png"
                      : "/images/btn_visibile_off.png"
                  }
                  width={24}
                  height={24}
                  alt={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                />
              </button>
            </div>
          </label>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full h-14 rounded-[40px] bg-primary-100 text-white font-semibold text-base font-semibold text-[20px] mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </form>
      </main>

      {/* 간편 로그인 */}
      <footer className="w-full max-w-160 mt-6">
        <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-6 py-4 h-[74px]">
          <span className="text-[16px] text-gray-600">간편 로그인하기</span>
          <div className="flex gap-4">
            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/google-favicon.png"
                width={42}
                height={42}
                alt="google_favicon"
              />
            </Link>
            <Link
              href="https://www.kakaocorp.com/page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/kakao-favicon.png"
                width={42}
                height={42}
                alt="kakao_favicon"
              />
            </Link>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          판다마켓이 처음이신가요?{" "}
          <Link href="/auth/signup" className="text-primary-100 underline">
            회원가입
          </Link>
        </p>
      </footer>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "" })}
        title="로그인 실패"
      >
        {modal.message && "로그인에 실패했습니다"}
      </Modal>
    </div>
  );
}
