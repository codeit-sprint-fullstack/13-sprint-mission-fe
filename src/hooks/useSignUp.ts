"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { SignUpFormData } from "@/schemas/authSchema";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
