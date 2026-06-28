export const deFaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const deFaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const mergedOptions = {
    ...deFaultOptions,
    ...options,
    headers: {
      ...deFaultOptions.headers,
      ...options.headers,
    },
  };
  const response = await fetch(`${baseURL}${url}`, mergedOptions);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const authFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const deFaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  const mergedOptions = {
    ...deFaultOptions,
    ...options,
    headers: {
      ...deFaultOptions.headers,
      ...options.headers,
    },
  };
  const response = await fetch(`${baseURL}${url}`, mergedOptions);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
