import { getAuthHeaders } from "@/shared/api/client";
import type { User } from "../model/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userApi = {
  async getMe(): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/me`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("사용자 정보를 불러오지 못했습니다.");
    return res.json();
  },

  async updateMe(data: Partial<User>): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("사용자 정보를 수정하지 못했습니다.");
    return res.json();
  },
};
