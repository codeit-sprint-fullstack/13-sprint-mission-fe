const ACCESS_TOKEN_KEY = "pandamarket-at";
const REFRESH_TOKEN_KEY = "pandamarket-rt";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface StoredAuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export function getTokens(): StoredAuthTokens {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
}

export function setTokens({ accessToken, refreshToken }: AuthTokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
