import { dynamicFetch, tokenFetch } from "./fetchClient";
import type { Comment, ListResponse } from "./types";

export type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  writer: { id: number; nickname: string };
};

export async function getBestPosts(): Promise<Post[]> {
  const data = await dynamicFetch<ListResponse<Post>>(
    "/articles?limit=3&orderBy=like",
  );
  return data.list.sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
}

export async function getPosts(
  orderBy = "recent",
  keyword = "",
): Promise<Post[]> {
  if (orderBy === "oldest") {
    const params = new URLSearchParams({ orderBy: "recent", pageSize: "9999" });
    if (keyword) params.set("keyword", keyword);
    const data = await dynamicFetch<ListResponse<Post>>(
      `/articles?${params.toString()}`,
    );
    return (data.list ?? []).reverse();
  }

  const params = new URLSearchParams({ orderBy, pageSize: "4" });
  if (keyword) params.set("keyword", keyword);
  const data = await dynamicFetch<ListResponse<Post>>(
    `/articles?${params.toString()}`,
  );
  return data.list ?? [];
}

export const getPostById = (id: string): Promise<Post> =>
  dynamicFetch<Post>(`/articles/${id}`);

export const createPost = ({
  title,
  content,
  image,
  ownerId,
}: {
  title: string;
  content: string;
  image?: string;
  ownerId: string | number;
}): Promise<void> =>
  tokenFetch<void>("/articles", {
    method: "POST",
    body: JSON.stringify({ title, content, image, ownerId }),
  });

export const updatePost = (
  id: string,
  { title, content, image }: { title: string; content: string; image: string },
): Promise<void> =>
  tokenFetch<void>(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content, image }),
  });

export const deletePost = (id: string): Promise<void> =>
  tokenFetch<void>(`/articles/${id}`, { method: "DELETE" });

export async function getComments(articleId: string): Promise<Comment[]> {
  const data = await dynamicFetch<ListResponse<Comment>>(
    `/articles/${articleId}/comments?limit=10`,
  );
  return data.list ?? [];
}

export const createComment = (
  articleId: string,
  { content }: { content: string },
): Promise<void> =>
  tokenFetch<void>(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

export const updateComment = (
  commentId: string,
  { content }: { content: string },
): Promise<void> =>
  tokenFetch<void>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

export const deleteComment = (commentId: string): Promise<void> =>
  tokenFetch<void>(`/comments/${commentId}`, { method: "DELETE" });
