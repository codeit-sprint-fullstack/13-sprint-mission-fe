import { useCallback } from "react";

const TOKEN_KEY = "accessToken";

export function useAuth() {
  const getToken = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  const saveToken = useCallback((token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const isLoggedIn = useCallback((): boolean => {
    return Boolean(getToken());
  }, [getToken]);

  return { getToken, saveToken, removeToken, isLoggedIn };
}
