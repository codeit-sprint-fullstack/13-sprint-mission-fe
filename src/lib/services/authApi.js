export const authAPI = {
  login: async (email, password) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseURL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }
    return await response.json();
  },

  register: async (nickname, email, password, passwordConfirmation) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseURL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    return await response.json();
  },
  getUser: async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    return await response.json();
  },
};
