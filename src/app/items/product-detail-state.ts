import type { Comment } from "@/types";

export function isResourceOwner(
  currentUserId: number | undefined,
  ownerId: number | undefined,
): boolean {
  return currentUserId !== undefined && ownerId !== undefined && currentUserId === ownerId;
}

export function replaceComment(
  comments: Comment[],
  updated: Partial<Comment> & Pick<Comment, "id">,
): Comment[] {
  return comments.map((comment) =>
    comment.id === updated.id ? { ...comment, ...updated } : comment,
  );
}

export function removeComment(comments: Comment[], commentId: number): Comment[] {
  return comments.filter((comment) => comment.id !== commentId);
}
