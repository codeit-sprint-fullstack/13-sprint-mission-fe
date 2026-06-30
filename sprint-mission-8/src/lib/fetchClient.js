/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
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
    const data = await response.json().catch(() => ({}));
    const error = new Error(data.message || "요청에 실패했습니다.");
    error.details = data.details; // ← 이걸 붙여야 바깥에서 꺼낼 수 있음
    throw error;
  }

  return response.json();
};

/**
 * 쿠키 인증 fetch 클라이언트
 */
export const cookieFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const refreshToken = localStorage.getItem("refreshToken");
  // const accessToken = localStorage.getItem("accessToken");
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    // 쿠키 전송을 위한 설정
    credentials: "include",
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
    try {
      // 토큰 갱신 요청
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        body: {
          refreshToken: refreshToken,
        },
      });

      if (refreshResponse.ok) {
        // 토큰 갱신 성공 시 원래 요청 재시도
        response = await fetch(`${baseURL}${url}`, mergedOptions);
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};

export const authFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = localStorage.getItem("accessToken");

  const mergedOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 시 refreshToken으로 재발급 후 재시도
  if (response.status === 401 && url !== "/auth/refresh-token") {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const { accessToken: newToken } = await refreshResponse.json();
        localStorage.setItem("accessToken", newToken);
        mergedOptions.headers.Authorization = `Bearer ${newToken}`;
        response = await fetch(`${baseURL}${url}`, mergedOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
