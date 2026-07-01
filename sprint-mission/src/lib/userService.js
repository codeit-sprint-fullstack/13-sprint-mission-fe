import { localStorageFetch } from "@/lib/fetchClient";

export const userService = {
  // 사용자 정보 요청
  getMe: () => localStorageFetch("/users/me"),
};
