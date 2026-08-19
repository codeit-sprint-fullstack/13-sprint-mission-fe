"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "@/schemas/authSchema";
import { useSignIn } from "@/hooks/useSignIn";
import { getErrorMessage } from "@/lib/error";

export function useSignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const { login, isLoading } = useSignIn();

  const [modalStatus, setModalStatus] = useState({
    modalOpen: false,
    modalMessage: "",
  });

  const closeModal = () =>
    setModalStatus((prev) => ({ ...prev, modalOpen: false }));

  async function onSubmit(data: SignInFormData) {
    try {
      await login(data);
    } catch (error) {
      const message = getErrorMessage(error, "로그인에 실패했습니다.");
      if (message.includes("이메일")) {
        setError("email", {
          type: "manual",
          message: "등록되지 않은 이메일입니다.",
        });
        setModalStatus({
          modalOpen: true,
          modalMessage: "등록되지 않은 이메일입니다.",
        });
      } else if (message.includes("비밀번호")) {
        setError("password", {
          type: "manual",
          message: "비밀번호를 확인해 주세요.",
        });
        setModalStatus({
          modalOpen: true,
          modalMessage: "비밀번호를 확인해 주세요.",
        });
      } else {
        const message = getErrorMessage(error, "로그인에 실패했습니다.");
        setModalStatus({
          modalOpen: true,
          modalMessage: message,
        });
      }
    }
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
    modalStatus,
    closeModal,
  };
}
