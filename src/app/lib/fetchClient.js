const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

async function tryRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Token refresh failed");

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
}

export async function publicFetch(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  return handleResponse(res);
}

export async function authFetch(url, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  // 401이면 토큰 갱신 후 재시도
  if (res.status === 401) {
    try {
      const newToken = await tryRefreshToken();
      const retryRes = await fetch(`${BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
        ...options,
      });
      return handleResponse(retryRes);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("세션이 만료되었습니다. 다시 로그인해 주세요.");
    }
  }

  return handleResponse(res);
}
