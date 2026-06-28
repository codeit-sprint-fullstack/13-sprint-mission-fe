const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const requestInterceptors = [];

function addRequestInterceptor(fn) {
  requestInterceptors.push(fn);
}

async function request(endpoint, options = {}) {
  const { body, headers: customHeaders, ...rest } = options;

  let config = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  for (const interceptor of requestInterceptors) {
    config = interceptor(config);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  if (res.status === 204) return null;

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `HTTP Error ${res.status}: ${endpoint}`);
  }

  return res.json();
}

addRequestInterceptor((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (!token) return config;
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
});

export const clientApi = {
  get: (endpoint, config = {}) => request(endpoint, config),
  post: (endpoint, body, config = {}) => request(endpoint, { method: "POST", body, ...config }),
  patch: (endpoint, body, config = {}) => request(endpoint, { method: "PATCH", body, ...config }),
  delete: (endpoint, config = {}) => request(endpoint, { method: "DELETE", ...config }),
};
