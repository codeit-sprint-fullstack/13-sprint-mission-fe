import { AuthError } from "@/lib/error";
import isTokenExpired from "@/utils/isTokenExpired";

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    // Next.js 기본 캐싱 활성화
    cache: "force-cache",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

/**
 * Authorization Header 인증 fetch 클라이언트
 */
export const authFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // 서버 환경에서 localStorage 접근 불가시 예외처리
  let token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const refreshToken =
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

  if (!token) {
    throw new AuthError("토큰이 없습니다.", "NO_TOKEN");
  }

  // 만료 감지 시
  if (isTokenExpired(token)) {
    token = await renewToken(refreshToken);
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // 서버 컴포넌트에서도 매번 재검증
    cache: "no-store",
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

  // 401 에러 발생 시 토큰 갱신 시도
  if (response.status === 401 && url !== "/auth/refresh-token") {
    token = await renewToken(refreshToken);

    // 새 토큰으로 재요청
    response = await fetch(`${baseURL}${url}`, {
      ...mergedOptions,
      headers: {
        ...mergedOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(`API error: ${response.status}`, { cause: body });
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};

/**
 * Authorization Header 인증 fetch 클라이언트 토큰 갱신
 * */
export const renewToken = async (refreshToken) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });

    if (!refreshResponse.ok) {
      localStorage.removeItem("accessToken");
      throw new AuthError("토큰 갱신 실패", "REFRESH_FAILED");
    }

    const { accessToken } = await refreshResponse.json();
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError("토큰 갱신 실패", "REFRESH_FAILED");
  }
};
