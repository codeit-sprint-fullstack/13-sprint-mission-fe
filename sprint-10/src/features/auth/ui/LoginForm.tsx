"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi, useAuth } from "@/entities/user";
import Modal from "@/shared/ui/Modal";
import PasswordInput from "@/shared/ui/PasswordInput";
import { loginSchema, type LoginValues } from "../model/authSchema";

type ModalState = {
  message: string;
  onClose: () => void;
};

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);
  const { saveAuth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const { user, accessToken } = await authApi.login(values.email, values.password);
      saveAuth({ user, accessToken });
      router.push("/items");
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
          <label htmlFor="password" className="text-sm font-bold text-gray-800">
            비밀번호
          </label>
          <PasswordInput
            id="password"
            placeholder="비밀번호를 입력해주세요"
            className={inputCls(!!errors.password, "pr-14")}
            show={show}
            onToggle={() => setShow((prev) => !prev)}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold text-base py-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </>
  );
}
