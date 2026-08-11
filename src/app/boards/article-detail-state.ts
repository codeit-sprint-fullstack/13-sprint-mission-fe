import type { Article, Comment } from '@/types';

export type LatestAsyncRunner = {
  run<T>(
    task: Promise<T>,
    onSuccess: (value: T) => void,
    onError?: (error: unknown) => void,
  ): Promise<void>;
  cancel(): void;
};

export function createLatestAsyncRunner(): LatestAsyncRunner {
  let latestRun = 0;

  return {
    run<T>(
      task: Promise<T>,
      onSuccess: (value: T) => void,
      onError?: (error: unknown) => void,
    ) {
      const run = ++latestRun;
      return task.then(
        (value) => {
          if (run === latestRun) onSuccess(value);
        },
        (error: unknown) => {
          if (run === latestRun) onError?.(error);
        },
      );
    },
    cancel() {
      latestRun += 1;
    },
  };
}

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
