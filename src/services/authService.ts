import { apiFetch } from "./fetchClient";

import { UserType } from "@/types/user";

export type SignUpRequestType = Partial<UserType> & {
  passwordConfirmation: string;
};

export type LoginRequestType = {
  id: UserType["email"];
  password: UserType["password"];
};

export type AuthResponseType = UserType & {
  accessToken: string;
  refreshToken: string;
};

export const authService = {
  signUp: async (body: SignUpRequestType): Promise<AuthResponseType> =>
    await apiFetch<AuthResponseType>("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: async (body: LoginRequestType): Promise<AuthResponseType> =>
    await apiFetch<AuthResponseType>("/auth/signIn", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
