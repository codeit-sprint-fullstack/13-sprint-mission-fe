import { defaultFetch } from "@/lib/services/fetchClient";

export const authService = {
  /** 로그인 */
  signIn: async (newFormData) => {
    const { email, password } = newFormData;

    const data = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  },

  /** 회원가입 */
  signUp: async (newFormData) => {
    const { email, password, nickname, passwordConfirmation } = newFormData;

    const data = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        nickname,
        passwordConfirmation,
      }),
    });

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  },
};
