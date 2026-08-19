"use client";
import Modal from "@/components/common/modal";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignupField = "email" | "nickname" | "password" | "passwordConfirmation";

export type SignupForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

type SignupApiError = Error & {
  details?: Record<string, { message: string }>;
};

const formatErrorMessage = (field: SignupField, message: string) => {
  if (message.includes("minLength 8")) return "8자 이상 입력해주세요.";
  if (message.includes("minLength 1")) return "닉네임을 확인해주세요.";
  if (message.includes("Not match")) {
    if (field === "email") return "이메일을 올바른 형식으로 입력해주세요.";
    if (field === "nickname") return "닉네임을 올바른 입력해주세요.";
  }
  return message;
};

export default function SignupPage() {
  const router = useRouter();
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    isSuccess: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // 입력 시 에러 초기화
  };

  const { mutate: signup, isPending } = useMutation<
    unknown,
    SignupApiError,
    SignupForm
  >({
    mutationFn: async (formData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          nickName: formData.nickname,
          encryptedpassword: formData.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        const err = new Error(data.message) as SignupApiError;
        err.details = data.details;
        throw err;
      }
      return res.json();
    },
    onSuccess: () => {
      setModal({ isOpen: true, message: "", isSuccess: true });
    },
    onError: (err) => {
      if (err.details) {
        const newErrors: Partial<Record<SignupField, string>> = {};
        Object.entries(err.details).forEach(([key, val]) => {
          const field = key.replace("requestBody.", "") as SignupField;
          newErrors[field] = formatErrorMessage(field, val.message);
        });
        setErrors((prev) => ({ ...prev, ...newErrors }));
      }
      setModal({
        isOpen: true,
        message: err.message || "회원가입에 실패했습니다.",
        isSuccess: false,
      });
    },
  });

  const isDisabled =
    !form.email ||
    !form.nickname ||
    !form.password ||
    !form.passwordConfirmation ||
    isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirmation) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation: "비밀번호가 일치하지 않아요",
      }));
      return;
    }
    signup(form);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <header>
        <Link href="/" className="flex items-center gap-5.5 mb-10">
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
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              className="w-full rounded-xl bg-gray-100 h-14 px-6 py-3.75 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-error-red text-sm">{errors.email}</p>
            )}
          </label>

          {/* 닉네임 */}
          <label className="flex flex-col gap-2">
            <span className="font-bold text-lg">닉네임</span>
            <input
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요"
              className="w-full rounded-xl bg-gray-100 h-14 px-6 py-3.75 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {errors.nickname && (
              <p className="text-error-red text-sm">{errors.nickname}</p>
            )}
          </label>

          {/* 비밀번호 */}
          <label className="flex flex-col gap-2">
            <span className="font-bold text-lg">비밀번호</span>
            <div className="relative">
              <input
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요"
                className="w-full rounded-xl bg-gray-100 h-14 px-6 py-3.75 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
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
            {errors.password && (
              <p className="text-error-red text-sm">{errors.password}</p>
            )}
          </label>

          {/* 비밀번호 확인 */}
          <label className="flex flex-col gap-2">
            <span className="font-bold text-lg">비밀번호 확인</span>
            <div className="relative">
              <input
                name="passwordConfirmation"
                type={showPwConfirm ? "text" : "password"}
                value={form.passwordConfirmation}
                onChange={handleChange}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className="w-full rounded-xl bg-gray-100 h-14 px-6 py-3.75 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwConfirm((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Image
                  src={
                    showPwConfirm
                      ? "/images/btn_visibility_on_24px.png"
                      : "/images/btn_visibile_off.png"
                  }
                  width={24}
                  height={24}
                  alt={showPwConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
                />
              </button>
            </div>
            {errors.passwordConfirmation && (
              <p className="text-error-red text-sm">
                {errors.passwordConfirmation}
              </p>
            )}
          </label>

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full h-14 rounded-[40px] bg-primary-100 text-white font-semibold text-[20px] mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "처리 중..." : "회원가입"}
          </button>
        </form>
      </main>

      <footer className="w-full max-w-160 mt-6">
        <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-6 py-4 h-18.5">
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
          이미 회원이신가요?
          <Link href="/login" className="text-primary-100 underline ml-1">
            로그인
          </Link>
        </p>
      </footer>
      <Modal
        isOpen={modal.isOpen}
        onConfirm={modal.isSuccess ? () => router.push("/login") : undefined}
        onClose={() =>
          setModal({ isOpen: false, message: "", isSuccess: false })
        }
        title={modal.isSuccess ? "가입이 완료되었습니다!" : "회원가입 실패"}
        confirmText={modal.isSuccess ? "확인" : "닫기"}
      >
        {!modal.isSuccess && modal.message}
      </Modal>
    </div>
  );
}
