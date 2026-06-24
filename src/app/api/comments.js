import { BASE_URL } from "./config";

export async function postComment(articleId, comment) {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: comment }),
  });
  return res;
}

export async function getComment(articleId) {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`);
  const commentData = await res.json();
  return commentData;
}

export async function deleteComment(articleId, commentId) {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
  return res;
}

export async function updateComment(articleId, commentId, updatedComment) {
  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: updatedComment }),
    },
  );
  return res;
}
