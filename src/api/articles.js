import axios from "./axios";

export async function getArticles({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
} = {}) {
  const response = await axios.get("/articles", {
    params: { page, pageSize, orderBy, keyword },
  });
  return response.data;
}

export async function getArticle(articleId) {
  const response = await axios.get(`/articles/${articleId}`);
  return response.data;
}

export async function createArticle(article) {
  const response = await axios.post("/articles", article);
  return response.data;
}

export async function updateArticle(articleId, article) {
  const response = await axios.patch(`/articles/${articleId}`, article);
  return response.data;
}

export async function deleteArticle(articleId) {
  await axios.delete(`/articles/${articleId}`);
}

export async function addArticleFavorite(articleId) {
  const response = await axios.post(`/articles/${articleId}/like`);
  return response.data;
}

export async function removeArticleFavorite(articleId) {
  const response = await axios.delete(`/articles/${articleId}/like`);
  return response.data;
}

export async function getArticleComments(articleId, { limit = 10, cursor } = {}) {
  const response = await axios.get(`/articles/${articleId}/comments`, {
    params: { limit, cursor },
  });
  return response.data;
}

export async function createArticleComment(articleId, content) {
  const response = await axios.post(`/articles/${articleId}/comments`, { content });
  return response.data;
}
