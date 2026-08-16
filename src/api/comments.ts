import axios from "./axios";
import type { Comment, CommentInput } from "../types/models";

export async function patchComment(commentId: number, { content }: CommentInput): Promise<Comment> {
  const response = await axios.patch<Comment>(`/comments/${commentId}`, { content });
  return response.data;
}

export async function deleteComment(commentId: number): Promise<void> {
  await axios.delete(`/comments/${commentId}`);
}
