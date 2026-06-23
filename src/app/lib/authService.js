import { publicFetch } from "./fetchClient";

export const authService = {
  signIn: (email, password) =>
    publicFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // body: { email, nickname, password, passwordConfirmation }
  signUp: (email, nickname, password, passwordConfirmation) =>
    publicFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),
};
