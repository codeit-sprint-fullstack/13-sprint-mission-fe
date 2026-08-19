import axios from "axios";
import { ACCESS_TOKEN_KEY, clearTokens } from "./auth";
import type {
  Article,
  ArticleListParams,
  ArticlePayload,
  AuthFormValues,
  AuthResponse,
  Comment,
  ImageUploadResponse,
  PaginatedResponse,
  Product,
  ProductListParams,
  ProductPayload,
  SignUpFormValues,
  User,
} from "@/types/api";

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

export function getErrorMessage(
  error: unknown,
  fallback = "요청을 처리하지 못했어요",
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export const authApi = {
  signIn: async (body: AuthFormValues): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/signIn", body);
    return data;
  },
  signUp: async (body: SignUpFormValues): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/signUp", body);
    return data;
  },
};

export const userApi = {
  me: async (): Promise<User> => {
    const { data } = await api.get<User>("/users/me");
    return data;
  },
};

export const imageApi = {
  upload: async (files: File[]): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const { data } = await api.post<ImageUploadResponse>(
      "/uploads/images",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },
};

export const productApi = {
  list: async (
    params: ProductListParams = {},
  ): Promise<PaginatedResponse<Product>> => {
    const { data } = await api.get<PaginatedResponse<Product>>("/products", {
      params,
    });
    return data;
  },
  detail: async (productId: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${productId}`);
    return data;
  },
  create: async (body: ProductPayload): Promise<Product> => {
    const { data } = await api.post<Product>("/products", body);
    return data;
  },
  update: async (productId: string, body: ProductPayload): Promise<Product> => {
    const { data } = await api.patch<Product>(`/products/${productId}`, body);
    return data;
  },
  remove: async (productId: string): Promise<{ ok: boolean }> => {
    const { data } = await api.delete<{ ok: boolean }>(
      `/products/${productId}`,
    );
    return data;
  },
  favorite: async (productId: string): Promise<Product> => {
    const { data } = await api.post<Product>(`/products/${productId}/favorite`);
    return data;
  },
  unfavorite: async (productId: string): Promise<Product> => {
    const { data } = await api.delete<Product>(
      `/products/${productId}/favorite`,
    );
    return data;
  },
};

export const articleApi = {
  list: async (
    params: ArticleListParams = {},
  ): Promise<PaginatedResponse<Article>> => {
    const { data } = await api.get<PaginatedResponse<Article>>("/articles", {
      params,
    });
    return data;
  },
  best: async (
    params: Pick<ArticleListParams, "limit"> = {},
  ): Promise<{ list: Article[] }> => {
    const { data } = await api.get<{ list: Article[] }>("/articles/best", {
      params,
    });
    return data;
  },
  detail: async (articleId: string): Promise<Article> => {
    const { data } = await api.get<Article>(`/articles/${articleId}`);
    return data;
  },
  create: async (body: ArticlePayload): Promise<Article> => {
    const { data } = await api.post<Article>("/articles", body);
    return data;
  },
  update: async (articleId: string, body: ArticlePayload): Promise<Article> => {
    const { data } = await api.patch<Article>(`/articles/${articleId}`, body);
    return data;
  },
  remove: async (articleId: string): Promise<{ ok: boolean }> => {
    const { data } = await api.delete<{ ok: boolean }>(
      `/articles/${articleId}`,
    );
    return data;
  },
  favorite: async (articleId: string): Promise<Article> => {
    const { data } = await api.post<Article>(`/articles/${articleId}/favorite`);
    return data;
  },
  unfavorite: async (articleId: string): Promise<Article> => {
    const { data } = await api.delete<Article>(
      `/articles/${articleId}/favorite`,
    );
    return data;
  },
};

export const commentApi = {
  list: async (
    productId: string,
    cursor?: string,
  ): Promise<PaginatedResponse<Comment>> => {
    const { data } = await api.get<PaginatedResponse<Comment>>(
      `/products/${productId}/comments`,
      {
        params: { limit: 10, cursor: cursor || undefined },
      },
    );
    return data;
  },
  create: async (productId: string, content: string): Promise<Comment> => {
    const { data } = await api.post<Comment>(
      `/products/${productId}/comments`,
      {
        content,
      },
    );
    return data;
  },
  listArticle: async (
    articleId: string,
    cursor?: string,
  ): Promise<PaginatedResponse<Comment>> => {
    const { data } = await api.get<PaginatedResponse<Comment>>(
      `/articles/${articleId}/comments`,
      {
        params: { limit: 10, cursor: cursor || undefined },
      },
    );
    return data;
  },
  createArticle: async (
    articleId: string,
    content: string,
  ): Promise<Comment> => {
    const { data } = await api.post<Comment>(
      `/articles/${articleId}/comments`,
      {
        content,
      },
    );
    return data;
  },
  update: async (commentId: string, content: string): Promise<Comment> => {
    const { data } = await api.patch<Comment>(`/comments/${commentId}`, {
      content,
    });
    return data;
  },
  remove: async (commentId: string): Promise<{ ok: boolean }> => {
    const { data } = await api.delete<{ ok: boolean }>(
      `/comments/${commentId}`,
    );
    return data;
  },
};
