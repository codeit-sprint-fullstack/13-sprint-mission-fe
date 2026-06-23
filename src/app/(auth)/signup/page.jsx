"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import AuthForm from "@/app/components/auth/AuthForm";
import ConfirmModal from "@/app/components/ui/Modal";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isInitialized, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
  });

  useEffect(() => {
    if (isInitialized && user) {
      router.replace("/items");
    }
  }, [isInitialized, user, router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (values.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    if (values.password !== values.passwordRepeat) {
      newErrors.passwordRepeat = "비밀번호가 일치하지 않아요.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await signUp(values.email, values.name, values.password, values.passwordRepeat);
      router.push("/items");
    } catch (error) {
      setModal({
        title: "회원가입 실패",
        message: error.message || "회원가입에 실패했습니다. 다시 시도해주세요.",
        onConfirm: () => setModal(null),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-160 flex flex-col items-center gap-20">
        <Link href="/" className="flex items-center justify-center gap-7">
          <Image
            src="/logo/panda-logo.svg"
            alt="판다마켓 로고"
            width={103}
            height={103}
            className="object-contain"
          />
          <h1 className="text-primary font-rokaf text-[66.344px] font-bold leading-normal">
            판다마켓
          </h1>
        </Link>
        <AuthForm
          mode="signup"
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          disabled={loading}
          errors={errors}
        />
      </div>

      {modal && (
        <ConfirmModal
          title={modal.title}
          message={modal.message}
          onClick={modal.onConfirm}
          onExit={() => setModal(null)}
        />
      )}
    </div>
  );
}
