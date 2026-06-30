const BASE_URL = "https://panda-market-api.vercel.app";

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
}

export async function fetchInstance(endpoint, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  // 401이면 토큰 갱신 후 재시도
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
      if (!retryRes.ok) {
        const error = await retryRes.json();
        throw error;
      }
      return retryRes.json();
    } catch {
      // 갱신 실패 시 로그아웃
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/signin";
    }
  }

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return res.json();
}
