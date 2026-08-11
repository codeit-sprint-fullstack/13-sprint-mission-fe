import type { Article, Comment } from '@/types';

export function canManageArticle(
  currentUserId: number | undefined,
  article: Article | null,
): boolean {
  return currentUserId !== undefined && article?.writer?.id === currentUserId;
}

export function canManageArticleComment(
  currentUserId: number | undefined,
  comment: Comment,
): boolean {
  return currentUserId !== undefined && comment.writer?.id === currentUserId;
}
