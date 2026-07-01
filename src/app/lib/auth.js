export const ACCESS_TOKEN_KEY = "accessToken";
export const AUTH_CHANGE_EVENT = "auth-change";

export const getAccessToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const hasAccessToken = () => Boolean(getAccessToken());

export const notifyAuthChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const setAccessToken = (accessToken) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  notifyAuthChange();
};

export const removeAccessToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  notifyAuthChange();
};

export const subscribeAuthChange = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
};

export const redirectToSignIn = () => {
  if (typeof window === "undefined") {
    return;
  }

  const isAuthPage =
    window.location.pathname === "/signin" ||
    window.location.pathname === "/signup";

  if (!isAuthPage) {
    window.location.href = "/signin";
  }
};
