const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? `HTTP Error ${response.status}`);
  }

  return response.json();
}

export const authService = {
  login: (email, password) =>
    request("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (nickname, email, password, passwordConfirmation) =>
    request("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    }),

  logout: () => Promise.resolve(),
};
