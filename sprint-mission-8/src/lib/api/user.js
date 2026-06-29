import { authFetch, cookieFetch, defaultFetch } from "@/lib/fetchClient";

export const userService = {
  // 사용자 정보 요청
  getMe: () => authFetch("/users/me"),
};
