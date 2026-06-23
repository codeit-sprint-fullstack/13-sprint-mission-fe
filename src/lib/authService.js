import { tempFetch } from "./fetchClient";
/**TODO: 나중에 tempFetch를 defaultFetch로 변환 (auth로직이 내 서버에 구축되면) */
export const authService = {
  signUp: async (body) =>
    await tempFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: async (body) =>
    await tempFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
