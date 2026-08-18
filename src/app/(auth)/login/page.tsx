"use client";

import {
  useEffect,
  useState,
  Suspense,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import AuthForm from "@/app/components/auth/AuthForm";
import ConfirmModal from "@/app/components/ui/Modal";

interface ModalState {
  title: string;
  message: string;
  onConfirm: () => void;
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 인증된 사용자만 접근 가능 : redirectTo
  const redirectTo = searchParams.get("redirect") ?? "/items";
  const { signIn, isInitialized, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<ModalState | null>(null);

  useEffect(() => {
    if (isInitialized && user) {
      router.replace(redirectTo);
    }
  }, [isInitialized, user, router, redirectTo]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      await signIn(values.email, values.password);
      router.push(redirectTo);
    } catch {
      setErrors({
        email: "이메일을 확인해 주세요.",
        password: "비밀번호를 확인해 주세요.",
      });
      setModal({
        title: "로그인 실패",
        message: "이메일 또는 비밀번호를 확인해 주세요.",
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
          mode="login"
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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
