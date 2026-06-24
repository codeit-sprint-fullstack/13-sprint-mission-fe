const BASE_URL = "http://localhost:3001";

export const marketAPI = {
  getArticle: async (params = { page: 1, pageSize: 3 }) => {
    try {
      const searchParam = new URLSearchParams(params);
      const response = await fetch(`${BASE_URL}/articles?${searchParam}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  getDetailArticle: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  getComments: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/articles/${id}/comments`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  postComment: async (params, id) => {
    try {
      console.log(params);
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
  deleteComment: async (id) => {
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
  postArticle: async (params) => {
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
  patchArticle: async (params, id) => {
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
  deleteArticle: async (id) => {
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
