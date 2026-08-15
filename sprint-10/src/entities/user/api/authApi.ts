import { request } from "@/shared/api/client";
import type { AuthResult } from "../model/types";

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResult>("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (
    nickname: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) =>
    request<AuthResult>("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),

  logout: () => Promise.resolve(),
};
