import axios from "./axios";

export async function patchComment(commentId, { content }) {
  const response = await axios.patch(`/comments/${commentId}`, { content });
  const comment = response.data;
  return comment;
}

export async function deleteComment(commentId) {
  await axios.delete(`/comments/${commentId}`);
}
