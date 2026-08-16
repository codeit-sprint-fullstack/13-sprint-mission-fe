import axios from "./axios";
import type {
  AuthResult,
  SignInInput,
  SignUpInput,
  User,
} from "../types/models";

export async function signUp(input: SignUpInput): Promise<AuthResult> {
  const response = await axios.post<AuthResult & { accessToken: string; refreshToken: string }>(`/auth/signUp`, {
    email: input.email,
    nickname: input.nickname,
    password: input.password,
    passwordConfirmation: input.passwordConfirmation,
  });
  return { user: response.data.user };
}

export async function signIn(data: SignInInput): Promise<AuthResult> {
  const response = await axios.post<AuthResult & { accessToken: string; refreshToken: string }>(`/auth/signIn`, data);
  return { user: response.data.user };
}

export async function getMe(): Promise<User> {
  const response = await axios.get<User>(`/users/me`);
  return response.data;
}
