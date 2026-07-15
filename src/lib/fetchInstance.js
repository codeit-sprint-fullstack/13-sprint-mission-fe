const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function showToast(type, message) {
  if (typeof window === "undefined") return;
  import("react-hot-toast").then(({ default: toast }) => {
    if (type === "error") toast.error(message);
    else toast.success(message);
  });
}

async function tryRefresh() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data.accessToken;
}

export async function fetchInstance(endpoint, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (res.status === 401 && typeof window !== "undefined") {
    const newToken = await tryRefresh();
    if (newToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      const retryRes = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers: retryHeaders });
      if (retryRes.ok) return retryRes.json();
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    showToast("error", "로그인이 필요합니다.");
    window.location.href = "/signin";
    return;
  }

  if (res.status === 403) {
    showToast("error", "권한이 없습니다.");
    throw { message: "권한이 없습니다.", status: 403 };
  }

  if (res.status === 409) {
    const error = await res.json().catch(() => ({ message: "중복된 요청입니다." }));
    showToast("error", error.message || "중복된 요청입니다.");
    throw error;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "요청에 실패했습니다." }));
    showToast("error", error.message || "요청에 실패했습니다.");
    throw error;
  }

  return res.json();
}
