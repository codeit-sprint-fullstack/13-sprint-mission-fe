import { REFRESH_ENDPOINT } from "@/constants/endpoint";

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url: string, options: RequestInit = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    let errorMsg = `API error: ${response.status}`;
    try {
      const errorBody = await response.json();
      errorMsg = errorBody.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * 쿠키 인증 fetch 클라이언트
 */
export const cookieFetch = async (url: string, options: RequestInit = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
    credentials: "include",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401 && url !== `${REFRESH_ENDPOINT}`) {
    try {
      const refreshResponse = await fetch(`${baseURL}${REFRESH_ENDPOINT}`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const { accessToken } = await refreshResponse.json();
        localStorage.setItem("accessToken", accessToken);

        const retryOptions: RequestInit = {
          ...mergedOptions,
          headers: {
            ...mergedOptions.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };

        response = await fetch(`${baseURL}${url}`, retryOptions);
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || `API error: ${response.status}`;
    throw new Error(message);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
