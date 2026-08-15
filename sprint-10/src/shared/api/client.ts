const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `HTTP Error ${response.status}`);
  }

  return response.json();
}

export function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function authorizedRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });

  if (response.status === 204) return null as T;

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `HTTP Error ${response.status}: ${endpoint}`);
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options: RequestInit = {}) =>
    authorizedRequest<T>(endpoint, options),
  post: <T>(endpoint: string, body?: unknown, options: RequestInit = {}) =>
    authorizedRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body ?? {}),
      ...options,
    }),
  patch: <T>(endpoint: string, body?: unknown, options: RequestInit = {}) =>
    authorizedRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body ?? {}),
      ...options,
    }),
  delete: <T = null>(endpoint: string, options: RequestInit = {}) =>
    authorizedRequest<T>(endpoint, { method: "DELETE", ...options }),
};
