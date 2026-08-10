import { authFetch } from "./fetchClient";
import type { User } from "./types";

export const userService = {
  getMe: (): Promise<User> => authFetch<User>("/users/me"),
};
