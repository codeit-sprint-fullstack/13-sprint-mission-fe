"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignUpFormData, signUpSchema } from "@/schemas/authSchema";
import { useSignUp } from "@/hooks/useSignUp";
import { SIGNIN_ENDPOINT } from "@/constants/endpoint";
import { getErrorMessage } from "@/lib/error";

export function useSignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { register: signUpRegister, isLoading } = useSignUp();

  const [modalStatus, setModalStatus] = useState({
    modalOpen: false,
    modalMessage: "",
  });

  const closeModal = () =>
    setModalStatus((prev) => ({ ...prev, modalOpen: false }));

  async function onSubmit(data: SignUpFormData) {
    try {
      await signUpRegister(data);
      router.push(SIGNIN_ENDPOINT);
    } catch (error) {
      const message = getErrorMessage(error, "회원가입에 실패했습니다.");
      setModalStatus({
        modalOpen: true,
        modalMessage: message,
      });
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
