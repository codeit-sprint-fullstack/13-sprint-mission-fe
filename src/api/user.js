// 유저 API - 내 정보 조회
import { fetchInstance } from "@/lib/fetchInstance";

export async function getMe() {
  return fetchInstance("/users/me", {
    cache: "no-store",
  });
}
