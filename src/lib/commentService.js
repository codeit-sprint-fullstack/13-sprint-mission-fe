import { defaultFetch } from "./fetchClient";
export const commentService = {
  postComment: async (id, body) =>
    defaultFetch(`/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
