import { apiFetch } from "./fetchClient";
export const userService = {
  getMe: async () => apiFetch("/user/me"),
};
