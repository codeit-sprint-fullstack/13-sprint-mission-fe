"use client";

import { useState, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "../../src/api/authApi";
import { getMe } from "../../src/api/userApi";
import { useAuthContext } from "../../src/context/AuthContext";

type SignUpField = "email" | "nickname" | "password" | "passwordConfirm";
// 필드별 에러 메시지 맵 (없는 필드는 생략 가능하므로 Partial + Record 유틸리티 타입)
type SignUpErrors = Partial<Record<SignUpField, string>>;

export default function SignUpPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) router.replace("/items");
  }, [isLoggedIn]);

  const isFormValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    passwordConfirm.trim() !== "";

  function validate(): SignUpErrors {
    const next: SignUpErrors = {};
    if (!email) next.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "올바른 이메일 형식이 아닙니다.";
    if (!nickname) next.nickname = "닉네임을 입력해 주세요.";
    if (!password) next.password = "비밀번호를 입력해 주세요.";
    else if (password.length < 8)
      next.password = "비밀번호를 8자 이상 입력해 주세요.";
    if (!passwordConfirm)
      next.passwordConfirm = "비밀번호 확인을 입력해 주세요.";
    else if (password !== passwordConfirm)
      next.passwordConfirm = "비밀번호가 일치하지 않아요.";
    return next;
  }

  async function handleSubmit(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const data = await signUp({
        email,
        password,
        nickname,
        passwordConfirmation: passwordConfirm,
      });
      const userData = await getMe(data.accessToken);
      if (!userData) {
        setModalMessage("사용자 정보를 불러오지 못했습니다.");
        return;
      }
      login(data.accessToken, userData);
      router.push("/items");
    } catch (err) {
      const message = err instanceof Error ? err.message : "회원가입에 실패했습니다.";
      setModalMessage(message);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && isFormValid) handleSubmit();
  }

  function setField(field: SignUpField, value: string) {
    if (field === "email") setEmail(value);
    if (field === "nickname") setNickname(value);
    if (field === "password") setPassword(value);
    if (field === "passwordConfirm") setPasswordConfirm(value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function EyeIcon({ visible }: { visible: boolean }) {
    return visible ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <Link href="/">
        <img src="/image/panda.png" alt="판다마켓" className="mb-8 h-12" />
      </Link>

      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="w-full max-w-[640px] rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            이메일
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setField("email", e.target.value)}
            className={`w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none ring-1 focus:ring-panda-primary ${errors.email ? "ring-red-400" : "ring-gray-200"}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            닉네임
          </label>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setField("nickname", e.target.value)}
            className={`w-full rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none ring-1 focus:ring-panda-primary ${errors.nickname ? "ring-red-400" : "ring-gray-200"}`}
          />
          {errors.nickname && (
            <p className="mt-1 text-xs text-red-500">{errors.nickname}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setField("password", e.target.value)}
              className={`w-full rounded-xl bg-gray-50 px-4 py-3 pr-12 text-sm outline-none ring-1 focus:ring-panda-primary ${errors.password ? "ring-red-400" : "ring-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setField("passwordConfirm", e.target.value)}
              className={`w-full rounded-xl bg-gray-50 px-4 py-3 pr-12 text-sm outline-none ring-1 focus:ring-panda-primary ${errors.passwordConfirm ? "ring-red-400" : "ring-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <EyeIcon visible={showPasswordConfirm} />
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="mt-1 text-xs text-red-500">
              {errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-xl bg-panda-primary py-3 text-sm font-semibold text-white transition hover:bg-panda-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          회원가입
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/image/ic_google.png"
              alt="구글 로그인"
              className="h-10 w-10 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/image/ic_kakao.png"
              alt="카카오 로그인"
              className="h-10 w-10 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          이미 회원이신가요?{" "}
          <Link
            href="/signin"
            className="font-semibold text-panda-primary underline"
          >
            로그인하기
          </Link>
        </p>
      </form>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
            <p className="mb-4 text-center text-sm font-medium text-gray-700">
              {modalMessage}
            </p>
            <button
              onClick={() => setModalMessage("")}
              className="w-full rounded-xl bg-panda-primary py-2 text-sm font-semibold text-white hover:bg-panda-hover"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
