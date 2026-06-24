import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

export const authService = {
  // 쿠키 인증을 사용하는 로그인
  signin: (email, password) =>
    cookieFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 회원가입
  signup: (nickname, email, password, passwordConfirmation) =>
    defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
    }),

  // 로그아웃
  //   logout: () => cookieFetch("/auth/logout", { method: "DELETE" }),
};
