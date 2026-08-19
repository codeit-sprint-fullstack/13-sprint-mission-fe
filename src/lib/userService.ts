import { tokenFetch } from "./fetchClient";
import type { User } from "./types";

export const userService = {
  getMe: (): Promise<User> => tokenFetch<User>("/users/me"),
};
