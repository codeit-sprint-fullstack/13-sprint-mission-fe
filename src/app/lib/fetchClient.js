// 브라우저: /api rewrite(next.config.mjs)를 거쳐 same-origin으로 호출 -> credentials:"include"면
//          브라우저가 accessToken 쿠키를 자동으로 싣고/받음.
// 서버 컴포넌트: 브라우저가 없어 쿠키를 자동으로 못 실어주므로, BE를 직접 호출하면서
//          next/headers로 들어온 요청의 accessToken 쿠키를 수동으로 Cookie 헤더에 실어줌.
const BASE_URL =
  typeof window === "undefined"
    ? process.env.BACKEND_URL
    : process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

async function getServerCookieHeader() {
  if (typeof window !== "undefined") return undefined;
  const { cookies } = await import("next/headers");
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken ? `accessToken=${accessToken}` : undefined;
}

async function request(url, options = {}) {
  const cookieHeader = await getServerCookieHeader();
  // FormData(이미지 업로드)는 브라우저가 boundary를 포함한 Content-Type을 직접 설정해야 하므로
  // 여기서 강제로 application/json을 지정하면 안 됨
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const res = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...options.headers,
    },
  });
  return handleResponse(res);
}

export function publicFetch(url, options = {}) {
  return request(url, options);
}

export function authFetch(url, options = {}) {
  return request(url, options);
}

// BE는 업로드된 이미지를 "/uploads/xxx.jpg" 같은 상대 경로로 반환함.
// <img src>는 브라우저가 직접 요청하므로(서버 컴포넌트에서 렌더링해도 마찬가지) 항상
// same-origin "/api" 프리픽스(next.config.mjs rewrite)를 붙여야 BE 정적 파일에 도달함.
export function resolveImageUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}