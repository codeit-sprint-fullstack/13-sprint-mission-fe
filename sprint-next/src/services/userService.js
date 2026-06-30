const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export const userService = {
  async getMe() {
    const res = await fetch(`${BASE_URL}/users/me`, { headers: getHeaders() });
    if (!res.ok) throw new Error("사용자 정보를 불러오지 못했습니다.");
    return res.json();
  },

  async updateMe(data) {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("사용자 정보를 수정하지 못했습니다.");
    return res.json();
  },
};
