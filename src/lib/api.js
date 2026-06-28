export async function request(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    config,
  );

  if (!response.ok) {
    throw new Error(`HTTP 에러! 상태: ${response.status}`);
  }

  return response.json();
}

export async function tokenRequest(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");

  return request(endpoint, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}
