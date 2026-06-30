"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { authService } from "@/services/authService";
import { loginSchema } from "@/schemas/authSchema";
import { validateSchema } from "@/utils/validate";
import Modal from "@/components/ui/Modal";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [modal, setModal] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { saveAuth } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors(validateSchema(loginSchema, next));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const fieldErrors = validateSchema(loginSchema, values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsPending(true);
    try {
      const { user, accessToken } = await authService.login(values.email, values.password);
      saveAuth({ user, accessToken });
      router.push("/items");
    } catch (err) {
      setModal({ message: err.message ?? "오류가 발생했습니다.", onClose: () => setModal(null) });
    } finally {
      setIsPending(false);
    }
  };

  const fieldError = (field) => (touched[field] ? errors[field]?.[0] : undefined);

  const inputCls = (field, extra = "") =>
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
            show={show}
            onToggle={() => setShow((prev) => !prev)}
          />
          {fieldError("password") && (
            <p className="text-sm text-red-500">{fieldError("password")}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold text-base py-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </>
  );
}
