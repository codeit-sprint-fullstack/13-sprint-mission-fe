import { tempAuthFetch } from "./fetchClient";
export const userService = {
  getMe: async () => tempAuthFetch("/users/me"),
};
