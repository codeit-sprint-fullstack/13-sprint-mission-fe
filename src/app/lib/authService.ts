import { publicFetch } from "./fetchClient";
import type { AuthResult } from "./types";

export const authService = {
  signIn: (email: string, password: string): Promise<AuthResult> =>
    publicFetch<AuthResult>("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signUp: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ): Promise<AuthResult> =>
    publicFetch<AuthResult>("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),
};
