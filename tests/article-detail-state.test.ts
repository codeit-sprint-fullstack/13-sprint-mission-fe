import assert from 'node:assert/strict';
import test from 'node:test';
import type { Article, Comment } from '../src/types/index.ts';

type LatestAsyncRunner = {
  run<T>(
    task: Promise<T>,
    onSuccess: (value: T) => void,
    onError?: (error: unknown) => void,
  ): Promise<void>;
  cancel(): void;
};

type ArticleOwnershipState = {
  canManageArticle?: (currentUserId: number | undefined, article: Article | null) => boolean;
  canManageArticleComment?: (currentUserId: number | undefined, comment: Comment) => boolean;
  createLatestAsyncRunner?: () => LatestAsyncRunner;
};

async function loadOwnershipState(): Promise<ArticleOwnershipState> {
  try {
    return (await import('../src/app/boards/article-detail-state.ts')) as ArticleOwnershipState;
  } catch {
    return {};
  }
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

test('only the stored writer can manage an article or article comment', async () => {
  const state = await loadOwnershipState();
  assert.equal(typeof state.canManageArticle, 'function');
  assert.equal(typeof state.canManageArticleComment, 'function');
  if (!state.canManageArticle || !state.canManageArticleComment) return;

  const article = {
    id: 1,
    title: '게시글',
    content: '내용',
    createdAt: '2026-08-11T00:00:00.000Z',
    writer: { id: 7, nickname: '판다' },
  };
  const comment = {
    id: 2,
    content: '댓글',
    writer: { id: 8, nickname: '코알라' },
  };

  assert.equal(state.canManageArticle(7, article), true);
  assert.equal(state.canManageArticle(8, article), false);
  assert.equal(state.canManageArticle(undefined, article), false);
  assert.equal(
    state.canManageArticle(7, {
      id: 3,
      title: '작성자 정보가 없는 외부 응답',
      content: '내용',
      createdAt: '2026-08-11T00:00:00.000Z',
    } as Article),
    false,
  );
  assert.equal(state.canManageArticleComment(8, comment), true);
  assert.equal(state.canManageArticleComment(7, comment), false);
});

test('only the newest overlapping article request can apply its result', async () => {
  const state = await loadOwnershipState();
  assert.equal(typeof state.createLatestAsyncRunner, 'function');
  if (!state.createLatestAsyncRunner) return;

  const runner = state.createLatestAsyncRunner();
  const older = deferred<number>();
  const newer = deferred<number>();
  const applied: number[] = [];

  const olderRun = runner.run(older.promise, (value) => applied.push(value));
  const newerRun = runner.run(newer.promise, (value) => applied.push(value));

  newer.resolve(2);
  await newerRun;
  older.resolve(1);
  await olderRun;

  assert.deepEqual(applied, [2]);
});

test('cancelling an article request prevents an unmounted page update', async () => {
  const state = await loadOwnershipState();
  assert.equal(typeof state.createLatestAsyncRunner, 'function');
  if (!state.createLatestAsyncRunner) return;

  const runner = state.createLatestAsyncRunner();
  const pending = deferred<number>();
  const applied: number[] = [];
  const run = runner.run(pending.promise, (value) => applied.push(value));

  runner.cancel();
  pending.resolve(1);
  await run;

  assert.deepEqual(applied, []);
});
