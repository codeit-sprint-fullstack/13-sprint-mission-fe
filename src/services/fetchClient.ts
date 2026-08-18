export const apiFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  let accessToken: string | null = null;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const isFormData = options.body instanceof FormData;

  const defaultOptions: RequestInit = {
    headers: {
      ...(!isFormData && {
        "Content-Type": "application/json",
      }),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    cache: "no-store",
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

  if (response.status === 401) {
    // TODO: refreshToken으로 accessToken 갱신
  }

  if (!response.ok) {
    // TODO: 서버에서 보낸 에러 메세지 보내기
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return {
    status: response.status,
    ok: response.ok,
  } as T;
};
