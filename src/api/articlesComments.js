import { fetchInstance } from "@/lib/fetchInstance";

export const getComments = async (articleId) => {
  return fetchInstance(`/articles/${articleId}/comments`);
};

export const createComment = async (articleId, content) => {
  return fetchInstance(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const updateComment = async (commentId, content) => {
  return fetchInstance(`/articles/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
};

export const deleteComment = async (commentId) => {
  return fetchInstance(`/articles/comments/${commentId}`, {
    method: "DELETE",
  });
};
