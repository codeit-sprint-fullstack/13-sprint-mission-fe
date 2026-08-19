import { getToken, setToken } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

// 204에는 본문이 없다. 호출부가 선언한 T로 좁혀서 넘긴다.
const parseResponse = <T>(res: Response): Promise<T> =>
  res.status === 204 ? Promise.resolve(null as unknown as T) : res.json();

const refreshAccessToken = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const { accessToken } = await res.json();
    setToken(accessToken);
    return accessToken as string;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    return null;
  }
};

// 401이면 토큰을 한 번 갱신하고 같은 요청을 재시도한다.
const fetchWithRefresh = async <T>(
  run: (token: string | null) => Promise<Response>,
): Promise<T> => {
  let res = await run(getToken());

  if (res.status === 401) {
    const accessToken = await refreshAccessToken();
    if (accessToken) res = await run(accessToken);
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return parseResponse<T>(res);
};

export const tokenFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const { headers, ...rest } = options;
  return fetchWithRefresh<T>((token) =>
    fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      ...rest,
    }),
  );
};

export const tokenUploadFetch = async <T>(
  url: string,
  formData: FormData,
): Promise<T> =>
  fetchWithRefresh<T>((token) =>
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    }),
  );

export const dynamicFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const { headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${url}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...headers },
    ...rest,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return parseResponse<T>(res);
};
