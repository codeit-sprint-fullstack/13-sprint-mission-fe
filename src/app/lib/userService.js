import { authFetch } from "./fetchClient";

export const userService = {
  getMe: () => authFetch("/users/me"),
};
