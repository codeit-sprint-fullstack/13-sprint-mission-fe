export const apiFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
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

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401) {
    /**TODO: refreshToken으로 accessToken 갱신하는 코드 추가하기 */
  }
  if (!response.ok) {
    /**TODO: 서버에서 보낸 에러 메세지 보내기 */
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
