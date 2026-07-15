import { fetchInstance } from "@/lib/fetchInstance";

export const getArticle = async (id) => {
  return fetchInstance(`/articles/${id}`);
};

export const deleteArticle = async (id) => {
  return fetchInstance(`/articles/${id}`, { method: "DELETE" });
};

export const updateArticle = async (id, data) => {
  return fetchInstance(`/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const addArticleLike = async (id) => {
  return fetchInstance(`/articles/${id}/like`, { method: "POST" });
};

export const removeArticleLike = async (id) => {
  return fetchInstance(`/articles/${id}/like`, { method: "DELETE" });
};
