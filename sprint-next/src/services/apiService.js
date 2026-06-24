import { BASE_URL } from "@/constants/api";

async function request(endpoint, options = {}) {
  const { body, ...customConfig } = options;

  const config = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 204) return null;

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message ?? `HTTP Error ${response.status}: ${endpoint}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Request 에러: ${error.message}`);
    throw error;
  }
}

export const API = {
  get: (endpoint, config = {}) => request(endpoint, config),
  post: (endpoint, body, config = {}) => request(endpoint, { method: "POST", body, ...config }),
  patch: (endpoint, body, config = {}) => request(endpoint, { method: "PATCH", body, ...config }),
  delete: (endpoint, config = {}) => request(endpoint, { method: "DELETE", ...config }),
};
