import axios from "axios";
import {
  getAccessToken,
  redirectToSignIn,
  removeAccessToken,
} from "@/app/lib/auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://panda-market-api.vercel.app";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const accessToken = getAccessToken();

  if (config.requiresAuth && !accessToken) {
    redirectToSignIn();
    return Promise.reject(new Error("로그인이 필요합니다."));
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
      redirectToSignIn();
    }

    return Promise.reject(error);
  },
);
