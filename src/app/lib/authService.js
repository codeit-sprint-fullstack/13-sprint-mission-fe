import { publicFetch } from "./fetchClient";

export const authService = {
  signIn: (email, password) =>
    publicFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signUp: (email, nickname, password, passwordConfirmation) =>
    publicFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),

  refreshToken: (refreshToken) =>
    publicFetch("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
};
