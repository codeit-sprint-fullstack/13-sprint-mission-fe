import type { AuthResponse, SignInInput, SignUpInput, User } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://panda-market-api-crud.vercel.app";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

// 같은 탭에서 로그인/로그아웃 시 Header 등 다른 컴포넌트에 상태 변경을 알리는 이벤트.
// localStorage의 'storage' 이벤트는 같은 탭 안에서는 발생하지 않아 별도 이벤트가 필요하다.
export const AUTH_CHANGE_EVENT = "authchange";

export async function signIn({ email, password }: SignInInput): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "로그인에 실패했습니다.");

  return data as AuthResponse;
}

export async function signUp(input: SignUpInput): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "회원가입에 실패했습니다.");

  return data as AuthResponse;
}

export function saveSession({ accessToken, user }: AuthResponse): void {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearSession(): void {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

// useSyncExternalStore의 getSnapshot은 값이 안 바뀌었으면 항상 같은 참조를 반환해야
// 한다. JSON.parse를 매번 새로 하면 매 렌더마다 새 객체가 생겨 무한 렌더링을 유발하므로,
// 원본 문자열이 그대로면 이전 파싱 결과를 재사용한다.
let cachedRaw: string | null = null;
let cachedUser: User | null = null;

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(USER_KEY);
  if (raw === cachedRaw) return cachedUser;

  cachedRaw = raw;
  try {
    cachedUser = raw ? (JSON.parse(raw) as User) : null;
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function subscribeToAuthChange(callback: () => void): () => void {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
