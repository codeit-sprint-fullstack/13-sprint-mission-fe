"use client";

import { ITEM_ENDPOINT } from "@/constants/endpoint";
import { useAuth } from "@/providers/AuthProvider";
import { SignInFormData } from "@/schemas/authSchema";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login: contextLogin } = useAuth();

  const login = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      if (response?.accessToken) {
        contextLogin(response.accessToken);
        router.push(`${ITEM_ENDPOINT}`);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
}
