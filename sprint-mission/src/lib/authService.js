import { defaultFetch } from "@/lib/fetchClient";

export const authService = {
  // 로컬스토리지을 사용하는 로그인
  signIn: async (email, password) => {
    const data = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return data;
  },
  // 회원가입
  signUp: async (nickname, email, password, passwordConfirmation) => {
    const data = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
    });
    return data;
  },
};
