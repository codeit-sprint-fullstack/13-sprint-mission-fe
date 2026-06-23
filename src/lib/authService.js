import { tempFetch } from "./fetchClient";
export const authService = {
  signUp: async (body) =>
    await tempFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
