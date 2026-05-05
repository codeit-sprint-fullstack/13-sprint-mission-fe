const BASE_URL = "https://panda-market-api-crud.vercel.app";

export default class ArticleApi {
  async getArticleList(params) {
    return api.get(`/articles?${params}`);
  }

  async getArticle(data) {
    return api.get(`/articles/${data}`);
  }

  async createArticle(data) {
    return api.post("/articles", data);
  }

  async patchArticle(id, data) {
    return api.patch(`/articles/${id}`, data);
  }

  async deleteArticle(data) {
    return api.delete(`/articles/${data}`);
  }
}

function request(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Http Error: ${response.status}`);
      if (response.status === 204) return null;

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
}

const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  put: (endpoint, data) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
