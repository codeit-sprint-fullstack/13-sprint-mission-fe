const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function request(endpoint, options = {}) {
  const token = getAccessToken();

  const { body, headers: customHeaders, ...rest } = options;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...rest,
    headers: {
      ...defaultOptions.headers,
      ...customHeaders,
    },
  };

  if (body !== undefined) {
    mergedOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

  if (response.status === 204) return null;

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message ?? `HTTP Error ${response.status}: ${endpoint}`);
  }

  return response.json();
}

export const clientApi = {
  get: (endpoint, options = {}) => request(endpoint, options),
  post: (endpoint, body, options = {}) => request(endpoint, { method: "POST", body, ...options }),
  patch: (endpoint, body, options = {}) => request(endpoint, { method: "PATCH", body, ...options }),
  delete: (endpoint, options = {}) => request(endpoint, { method: "DELETE", ...options }),
};
