import { fetchClient } from "./fetchClient";
import { Comment, PaginatedResponse } from "../../types";

export const commentService = {
  getAllByArticleId: async (articleId: string) => {
      const res = await fetchClient(`/articles/${articleId}/comments?limit=100`);
      const data = (await res.json()) as PaginatedResponse<Comment> | Comment[];
      
      return 'list' in data ? data.list : data; 
  },
  create: async (articleId: string, content: string) => {
    const res = await fetchClient(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    return (await res.json()) as Comment;
  },
  update: async (commentId: number, content: string) => {
    const res = await fetchClient(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
    return (await res.json()) as Comment;
  },
  delete: async (commentId: number) => {
    const res = await fetchClient(`/comments/${commentId}`, {
      method: "DELETE",
    });
    return res.json(); 
  },
};