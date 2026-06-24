/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
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
  return handleResponse(res);
}
