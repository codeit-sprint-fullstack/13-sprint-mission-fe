import { authFetch, deFaultFetch } from "./fetchClient";

export const authService = {
  signin: (email, password) =>
    deFaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: ({ nickname, email, password, passwordConfirmation }) =>
    deFaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation,
      }),
    }),
  getUser: () => authFetch("/users/me"),
};
