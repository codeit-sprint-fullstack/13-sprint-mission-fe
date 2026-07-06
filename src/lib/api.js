import axios from "axios";
import { ACCESS_TOKEN_KEY, clearTokens } from "./auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
    }
    return Promise.reject(error);
  },
);

export function getErrorMessage(error, fallback = "요청을 처리하지 못했어요.") {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export const authApi = {
  signIn: async (body) => {
    const { data } = await api.post("/auth/signIn", body);
    return data;
  },
  signUp: async (body) => {
    const { data } = await api.post("/auth/signUp", body);
    return data;
  },
};

export const userApi = {
  me: async () => {
    const { data } = await api.get("/users/me");
    return data;
  },
};

export const imageApi = {
  upload: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const { data } = await api.post("/uploads/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};

export const productApi = {
  list: async (params) => {
    const { data } = await api.get("/products", { params });
    return data;
  },
  detail: async (productId) => {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  },
  create: async (body) => {
    const { data } = await api.post("/products", body);
    return data;
  },
  update: async (productId, body) => {
    const { data } = await api.patch(`/products/${productId}`, body);
    return data;
  },
  remove: async (productId) => {
    const { data } = await api.delete(`/products/${productId}`);
    return data;
  },
  favorite: async (productId) => {
    const { data } = await api.post(`/products/${productId}/favorite`);
    return data;
  },
  unfavorite: async (productId) => {
    const { data } = await api.delete(`/products/${productId}/favorite`);
    return data;
  },
};

export const articleApi = {
  list: async (params) => {
    const { data } = await api.get("/articles", { params });
    return data;
  },
  best: async (params) => {
    const { data } = await api.get("/articles/best", { params });
    return data;
  },
  detail: async (articleId) => {
    const { data } = await api.get(`/articles/${articleId}`);
    return data;
  },
  create: async (body) => {
    const { data } = await api.post("/articles", body);
    return data;
  },
  update: async (articleId, body) => {
    const { data } = await api.patch(`/articles/${articleId}`, body);
    return data;
  },
  remove: async (articleId) => {
    const { data } = await api.delete(`/articles/${articleId}`);
    return data;
  },
  favorite: async (articleId) => {
    const { data } = await api.post(`/articles/${articleId}/favorite`);
    return data;
  },
  unfavorite: async (articleId) => {
    const { data } = await api.delete(`/articles/${articleId}/favorite`);
    return data;
  },
};

export const commentApi = {
  list: async (productId, cursor) => {
    const { data } = await api.get(`/products/${productId}/comments`, {
      params: { limit: 10, cursor: cursor || undefined },
    });
    return data;
  },
  create: async (productId, content) => {
    const { data } = await api.post(`/products/${productId}/comments`, {
      content,
    });
    return data;
  },
  listArticle: async (articleId, cursor) => {
    const { data } = await api.get(`/articles/${articleId}/comments`, {
      params: { limit: 10, cursor: cursor || undefined },
    });
    return data;
  },
  createArticle: async (articleId, content) => {
    const { data } = await api.post(`/articles/${articleId}/comments`, {
      content,
    });
    return data;
  },
  update: async (commentId, content) => {
    const { data } = await api.patch(`/comments/${commentId}`, { content });
    return data;
  },
  remove: async (commentId) => {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
  },
};
