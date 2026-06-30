// 인증 API - 로그인, 회원가입 요청을 담당
import { fetchInstance } from "@/lib/fetchInstance";

export async function signIn({ email, password }) {
  return fetchInstance("/auth/signIn", {
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
}) {
  return fetchInstance("/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    cache: "no-store",
  });
}
