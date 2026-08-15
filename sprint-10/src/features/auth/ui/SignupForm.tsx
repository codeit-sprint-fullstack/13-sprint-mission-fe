"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi, useAuth } from "@/entities/user";
import Modal from "@/shared/ui/Modal";
import PasswordInput from "@/shared/ui/PasswordInput";
import { signupSchema, type SignupValues } from "../model/authSchema";

type ShowState = {
  password: boolean;
  passwordConfirm: boolean;
};

type ModalState = {
  message: string;
  onClose: () => void;
};

export default function SignupForm() {
  const [show, setShow] = useState<ShowState>({ password: false, passwordConfirm: false });
  const [modal, setModal] = useState<ModalState | null>(null);
  const { saveAuth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignupValues) => {
    try {
      const { user, accessToken } = await authApi.register(
        values.nickname,
        values.email,
        values.password,
        values.passwordConfirm,
      );
      setModal({
        message: "가입 완료되었습니다.",
        onClose: () => {
          saveAuth({ user, accessToken });
          router.push("/items");
        },
      });
    } catch (err) {
      setModal({
        message: err instanceof Error ? err.message : "오류가 발생했습니다.",
        onClose: () => setModal(null),
      });
    }
  };

  const inputCls = (hasError: boolean, extra = "") =>
    `w-full bg-gray-100 rounded-xl px-6 py-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 ${extra} ${
      hasError ? "ring-2 ring-red-400" : "focus:ring-primary-100"
    }`;

  return (
    <>
      {modal && <Modal message={modal.message} onClose={modal.onClose} />}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-gray-800">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className={inputCls(!!errors.email)}
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="nickname" className="text-sm font-bold text-gray-800">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            className={inputCls(!!errors.nickname)}
            {...register("nickname")}
          />
          {errors.nickname && (
            <p className="text-sm text-red-500">{errors.nickname.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold text-gray-800">
            비밀번호
          </label>
          <PasswordInput
            id="password"
            placeholder="비밀번호를 입력해주세요"
            className={inputCls(!!errors.password, "pr-14")}
            show={show.password}
            onToggle={() => setShow((prev) => ({ ...prev, password: !prev.password }))}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm" className="text-sm font-bold text-gray-800">
            비밀번호 확인
          </label>
          <PasswordInput
            id="passwordConfirm"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className={inputCls(!!errors.passwordConfirm, "pr-14")}
            show={show.passwordConfirm}
            onToggle={() =>
              setShow((prev) => ({ ...prev, passwordConfirm: !prev.passwordConfirm }))
            }
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-500">{errors.passwordConfirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold text-base py-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
