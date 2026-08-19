import { fetchInstance } from "@/lib/fetchInstance";
import type { SignInResponse, User } from "@/types/user";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export async function signIn({ email, password }: SignInPayload): Promise<SignInResponse> {
  return fetchInstance<SignInResponse>("/auth/signIn", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpPayload): Promise<User> {
  return fetchInstance<User>("/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    cache: "no-store",
  });
}