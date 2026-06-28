import { request } from "@/lib/api";

export const authService = {
  login: async (email, password) => {
    const response = await request("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    localStorage.setItem("accessToken", response.accessToken);
    return response;
  },

  register: async (nickname, email, password, passwordConfirmation) => {
    const response = await request("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        nickname,
        email,
        password,
        passwordConfirmation,
      }),
    });
    localStorage.setItem("accessToken", response.accessToken);
    return response;
  },
  logout: () => {
    localStorage.removeItem("accessToken");
  },
};
