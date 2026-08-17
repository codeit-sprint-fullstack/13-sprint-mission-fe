const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; //이건 내 내서버

export const marketAPI = {
  getArticle: async (
    params: PageParam = { page: 1, pageSize: 3 },
  ): Promise<ArticleResponse | undefined> => {
    try {
      const searchParam = new URLSearchParams({
        page: String(params.page),
        pageSize: String(params.pageSize),
      });
      const response = await fetch(`${BASE_URL}/articles?${searchParam}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  getDetailArticle: async (id: number): Promise<Article | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  getComments: async (id: number): Promise<Comment[] | null | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}/comments`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  postComment: async (
    params: { content: string },
    id: number,
  ): Promise<Comment | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  deleteComment: async (id: number): Promise<void> => {
    try {
      console.log(`${BASE_URL}/comments/${id}`);
      const response = await fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("삭제 실패");
    } catch (error) {
      console.error(error);
    }
  },
  postArticle: async (params: {
    title: string;
    content: string;
  }): Promise<Article | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  patchArticle: async (
    params: { title: string; content: string },
    id: number,
  ): Promise<Article | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  deleteArticle: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("삭제 실패");
    } catch (error) {
      console.error(error);
    }
  },
};
