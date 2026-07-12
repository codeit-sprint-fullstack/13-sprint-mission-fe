import {
  getServerSideToken,
  setServerSideTokens,
  updateAccessToken,
} from "@/lib/actions/auth";

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
 * 토큰 인증 fetch 클라이언트 - accessToken/refreshToken httpOnly 쿠키 기반
 * - Server Action / Route Handler 등 서버 실행 컨텍스트 전용
 */
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = await getServerSideToken("accessToken");
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

  // 원래 요청 실행
  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (response.status === 401 && url !== "/auth/refresh") {
    // 토큰 갱신 요청 - refreshToken을 body가 아닌 Cookie로 받음
    const refreshToken = await getServerSideToken("refreshToken");
    const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!refreshResponse.ok) {
      const errorData = await refreshResponse.json().catch(() => null);
      const refreshError = new Error(
        errorData?.message ?? "리프레시 토큰이 유효하지 않습니다.",
      );
      refreshError.status = refreshResponse.status;
      throw refreshError;
    }

    // 토큰 갱신 성공 시 원래 요청 재시도
    const { data } = await refreshResponse.json();
    const newAccessToken = data.accessToken;
    mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;
    response = await fetch(`${baseURL}${url}`, mergedOptions);

    // 백엔드에서 refreshToken 재발급 한 것으로 교체, 아니면 accessToken만 갱신
    const setCookies = refreshResponse.headers.getSetCookie();
    const rotatedRefreshTokenCookie = setCookies.find((c) =>
      c.startsWith("refreshToken="),
    );
    const rotatedRefreshToken = rotatedRefreshTokenCookie
      ?.split(";")[0]
      .split("=")[1];

    if (rotatedRefreshToken) {
      await setServerSideTokens(newAccessToken, rotatedRefreshToken);
    } else {
      await updateAccessToken(newAccessToken);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(
      errorData?.message ?? `API 요청에 실패했습니다 (${response.status})`,
    );
    error.status = response.status;
    throw error;
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
 * 클라이언트 전용 fetch 클라이언트
 * - Mount Effect 등에서 Server Action 직접 호출 시, React hooks 개수 잘못 세는
 * 프레임워크 버그에 대응하기 위해 Route Handler(/api/users/me 등)를 경유해 요청
 */
export async function apiFetch(path, options = {}) {
  const response = await fetch(path, { ...options, cache: "no-store" });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = new Error(body?.error ?? `API error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;

  return await response.json();
}
