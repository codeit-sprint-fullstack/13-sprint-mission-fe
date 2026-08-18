import { apiFetch } from "./fetchClient";

import { UserType } from "@/types/user";

export const userService = {
  getMe: async (): Promise<UserType> => apiFetch("/user/me"),
};
