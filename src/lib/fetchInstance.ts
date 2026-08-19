import type { ApiError } from "@/types/api";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/lib/authStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function showToast(type: "error" | "success", message: string): void {
  if (typeof window === "undefined") return;
  import("react-hot-toast").then(({ default: toast }) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  });
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

async function tryRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data: RefreshResponse = await res.json();
  setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

export type FetchInstanceOptions = RequestInit & {
  next?: { revalidate?: number };
};

export async function fetchInstance<T>(
  endpoint: string,
  options: FetchInstanceOptions = {},
): Promise<T> {
  const token = getAccessToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (res.status === 401 && typeof window !== "undefined") {
    const newToken = await tryRefresh();
    if (newToken) {
      const retryHeaders: HeadersInit = { ...headers, Authorization: `Bearer ${newToken}` };
      const retryRes = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers: retryHeaders });
      if (retryRes.ok) return retryRes.json() as Promise<T>;
    }
    clearTokens();
    showToast("error", "로그인이 필요합니다.");
    window.location.href = "/signin";
    // 리다이렉트 직후라 반환값은 실제로 쓰이지 않음
    return undefined as T;
  }

  if (res.status === 403) {
    const error: ApiError = { message: "권한이 없습니다.", status: 403 };
    showToast("error", error.message);
    throw error;
  }

  if (res.status === 409) {
    const parsed = (await res.json().catch(() => ({ message: "중복된 요청입니다." }))) as Partial<ApiError>;
    const error: ApiError = { message: parsed.message ?? "중복된 요청입니다.", status: 409 };
    showToast("error", error.message);
    throw error;
  }

  if (!res.ok) {
    const parsed = (await res.json().catch(() => ({ message: "요청에 실패했습니다." }))) as Partial<ApiError>;
    const error: ApiError = { message: parsed.message ?? "요청에 실패했습니다.", status: res.status };
    showToast("error", error.message);
    throw error;
  }

  return res.json() as Promise<T>;
}