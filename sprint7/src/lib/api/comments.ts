export interface Comment {
  id: number;
  articleId: number;
  content: string;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

export const commentService = {
  getAllByArticleId: async (articleId: string): Promise<Comment[]> => {
    let allComments: Comment[] = [];
    let cursor = 0;
    let hasNext = true;

    while (hasNext) {
      const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments?take=10&cursor=${cursor}`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error("댓글 로드 실패");
      
      const json = await res.json();
      const items = Array.isArray(json) ? json : (json.data || []);
      allComments = [...allComments, ...items];
      
      hasNext = json.hasNext ?? false;
      cursor = json.nextCursor ?? 0;
    }

    return allComments.reverse();
  },

  create: async (articleId: string, content: string) => {
    return fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
  },

  update: async (commentId: number, content: string) => {
    return fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
  },

  delete: async (commentId: number) => {
    return fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE'
    });
  }
};