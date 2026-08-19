import { serverFetch } from "@/lib/serverFetch";
import { cookieFetch, defaultFetch } from "./fetchClient";
import { POST_ENDPOINT } from "@/constants/endpoint";
import {
  Post,
  PostListResponse,
  CreatePostInput,
  UpdatePostInput,
} from "@/types";

export async function getPostDetailServer(
  id: number,
): Promise<{ success: boolean; data: Post }> {
  return serverFetch(`${POST_ENDPOINT}/${id}`);
}

export async function createPost(data: CreatePostInput) {
  return cookieFetch(`${POST_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePost(id: number, data: UpdatePostInput) {
  return cookieFetch(`${POST_ENDPOINT}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function getPostDetail(
  id: number,
): Promise<{ success: boolean; data: Post }> {
  return cookieFetch(`${POST_ENDPOINT}/${id}`);
}

export async function getPostList(params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}): Promise<PostListResponse> {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = params;

  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    ...(keyword && { keyword }),
  }).toString();

  return defaultFetch(`${POST_ENDPOINT}?${query}`);
}

export async function deletePost(id: number) {
  return cookieFetch(`${POST_ENDPOINT}/${id}`, { method: "DELETE" });
}

export async function createPostServer(
  data: CreatePostInput,
): Promise<{ success: boolean; data: Post }> {
  return serverFetch(`${POST_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
