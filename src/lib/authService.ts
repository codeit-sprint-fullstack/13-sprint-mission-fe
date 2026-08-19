const TOKEN_KEY = "accessToken";
const MAX_AGE = 60 * 60 * 24 * 7;

// 미들웨어가 서버에서 읽어야 해서 localStorage 대신 쿠키에 보관한다.
// 클라이언트 fetch가 Authorization 헤더를 붙여야 하므로 httpOnly는 쓰지 않는다.
export const getToken = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const setToken = (token: string) => {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token,
  )}; path=/; max-age=${MAX_AGE}; samesite=lax${secure}`;
};

export const clearToken = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
};

export const authService = {
  logout: clearToken,
};
