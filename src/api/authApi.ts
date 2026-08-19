import type { User } from "../types/user";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  user: User;
  accessToken: string;
}

async function request(path: string, body: unknown): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "요청에 실패했습니다.");
  }

  return data as AuthResponse;
}

export interface SignInInput {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInInput): Promise<AuthResponse> {
  return request("/auth/signIn", { email, password });
}

export interface SignUpInput {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
}

export async function signUp({
  email,
  password,
  nickname,
  passwordConfirmation,
}: SignUpInput): Promise<AuthResponse> {
  return request("/auth/signUp", {
    email,
    password,
    nickname,
    passwordConfirmation,
  });
}
