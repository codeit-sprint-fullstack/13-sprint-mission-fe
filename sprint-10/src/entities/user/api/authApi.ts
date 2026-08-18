import { request } from "@/shared/api/client";
import type { LoginResponse, User } from "../model/types";

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // /auth/signUp 응답은 { success, data: User } 형태이며 accessToken은 내려오지 않는다.
  register: async (
    nickname: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    const res = await request<{ success: boolean; data: User }>("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });
    return res.data;
  },

  logout: () => Promise.resolve(),
};
