const BASE_URL =
  typeof window === "undefined"
    ? process.env.BACKEND_URL
    : process.env.NEXT_PUBLIC_API_URL;

// 브라우저: /api rewrite(next.config.mjs)를 거쳐 same-origin으로 호출 -> credentials:"include"면 브라우저가 accessToken 쿠키를 자동으로 싣고/받음.
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }
  return res.status === 204 ? (null as T) : res.json();
}

// 서버 컴포넌트: 브라우저가 없어 쿠키를 자동으로 못 실어주므로, BE를 직접 호출하면서 next/headers로 들어온 요청의 accessToken 쿠키를 수동으로 Cookie 헤더에 실어줌.
// items/[itemId]/page.tsx 하나가 서버에서 인증이 필요한 데이터를 fetch
async function getServerCookieHeader(): Promise<string | undefined> {
  if (typeof window !== "undefined") return undefined;
  const { cookies } = await import("next/headers");
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken ? `accessToken=${accessToken}` : undefined;
}

// 동시에 여러 요청이 401을 받아도 refresh는 한 번만 나가도록 진행 중인 시도를 공유함
// (refreshToken은 재발급 시 폐기/교체되므로 각자 따로 호출하면 뒤에 도는 요청이 실패함)
let refreshPromise: Promise<boolean> | null = null;
function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const cookieHeader = await getServerCookieHeader();
  // FormData(이미지 업로드)는 브라우저가 boundary를 포함한 Content-Type을 직접 설정해야 하므로~
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const buildHeaders = () => ({
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...options.headers,
  });

  let res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: buildHeaders(),
  });

  // accessToken 만료(401)면 refresh 한 번 시도하고 원래 요청 재시도
  // 서버 컴포넌트는 재시도해도 새 쿠키를 브라우저에 반영할 방법이 없어서 브라우저에서만 시도 (typeof window !== "undefined")
  // /auth/* 자체는 재시도 대상에서 제외(무한루프/의미없는 재시도 방지)
  const isAuthEndpoint = url.startsWith("/auth/");
  if (res.status === 401 && typeof window !== "undefined" && !isAuthEndpoint) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await fetch(`${BASE_URL}${url}`, {
        credentials: "include",
        ...options,
        headers: buildHeaders(),
      });
    }
  }

  return handleResponse<T>(res);
}

export function publicFetch<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  return request<T>(url, options);
}

export function authFetch<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  return request<T>(url, options);
}

// BE는 업로드된 이미지를 "/uploads/xxx.jpg" 같은 상대 경로로 반환함
// <img src>는 브라우저가 직접 요청하므로(서버 컴포넌트에서 렌더링해도 마찬가지) 항상 same-origin "/api" 프리픽스(next.config.mjs rewrite)를 붙여야 BE 정적 파일에 도달함
// 로컬 개발용
// TODO: AWS? CDN결합?
export function resolveImageUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

// BFF x
//
