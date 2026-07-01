import { tokenRequest } from "@/lib/api";

export const userService = {
  getMe: () => tokenRequest("/users/me"),
};
