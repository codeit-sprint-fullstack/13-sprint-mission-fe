import api from "./main.js";
const ARTICLE_ENDPOINT = "/articles";

export const getArticleList = async (page, pageSize, keyword) => {
  const queryParam = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });
  return await api.get(`${ARTICLE_ENDPOINT}?${queryParam}`);
};
export const getArticle = async (articleId) => {
  return await api.get(`${ARTICLE_ENDPOINT}/${articleId}`);
};
export const createArticle = async (body) => {
  return await api.post(`${ARTICLE_ENDPOINT}`, body);
};
export const patchArticle = async (articleId, body) => {
  return await api.patch(`${ARTICLE_ENDPOINT}/${articleId}`, body);
};
export const deleteArticle = async (articleId) => {
  return await api.delete(`${ARTICLE_ENDPOINT}/${articleId}`);
};
