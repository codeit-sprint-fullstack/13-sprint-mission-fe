import { fetchClient } from "./fetchClient";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export const commentService = {
  getAllByArticleId: async (articleId: string) => {
      const res = await fetchClient(`/articles/${articleId}/comments?limit=100`);
      const data = await res.json();
      
      return data.list || data.data || data || []; 
  },
  create: async (articleId: string, content: string) => {
    const res = await fetchClient(`/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    return res.json();
  },
  update: async (commentId: number, content: string) => {
    const res = await fetchClient(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
    return res.json();
  },
  delete: async (commentId: number) => {
    const res = await fetchClient(`/comments/${commentId}`, {
      method: "DELETE",
    });
    return res.json();
  },
};