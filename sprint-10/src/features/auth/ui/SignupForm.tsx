"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authApi, useAuth } from "@/entities/user";
import { validateSchema } from "@/shared/lib/validateSchema";
import Modal from "@/shared/ui/Modal";
import PasswordInput from "@/shared/ui/PasswordInput";
import { signupSchema } from "../model/authSchema";

type SignupValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

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
  const [values, setValues] = useState<SignupValues>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<ModalState | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { saveAuth } = useAuth();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors(validateSchema(signupSchema, next));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, nickname: true, password: true, passwordConfirm: true });
    const fieldErrors = validateSchema(signupSchema, values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsPending(true);
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
    } finally {
      setIsPending(false);
    }
  };

  const fieldError = (field: string) => (touched[field] ? errors[field]?.[0] : undefined);

  const inputCls = (field: string, extra = "") =>
    `w-full bg-gray-100 rounded-xl px-6 py-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 ${extra} ${
      fieldError(field) ? "ring-2 ring-red-400" : "focus:ring-primary-100"
    }`;

  return (
    <>
      {modal && <Modal message={modal.message} onClose={modal.onClose} />}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-gray-800">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="이메일을 입력해주세요"
            className={inputCls("email")}
          />
          {fieldError("email") && (
            <p className="text-sm text-red-500">{fieldError("email")}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="nickname" className="text-sm font-bold text-gray-800">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="닉네임을 입력해주세요"
            className={inputCls("nickname")}
          />
          {fieldError("nickname") && (
            <p className="text-sm text-red-500">{fieldError("nickname")}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold text-gray-800">
            비밀번호
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 입력해주세요"
            className={inputCls("password", "pr-14")}
            show={show.password}
            onToggle={() => setShow((prev) => ({ ...prev, password: !prev.password }))}
          />
          {fieldError("password") && (
            <p className="text-sm text-red-500">{fieldError("password")}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm" className="text-sm font-bold text-gray-800">
            비밀번호 확인
          </label>
          <PasswordInput
            id="passwordConfirm"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className={inputCls("passwordConfirm", "pr-14")}
            show={show.passwordConfirm}
            onToggle={() =>
              setShow((prev) => ({ ...prev, passwordConfirm: !prev.passwordConfirm }))
            }
          />
          {fieldError("passwordConfirm") && (
            <p className="text-sm text-red-500">{fieldError("passwordConfirm")}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold text-base py-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
