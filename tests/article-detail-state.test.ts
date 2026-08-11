import assert from 'node:assert/strict';
import test from 'node:test';
import type { Article, Comment } from '../src/types/index.ts';

type ArticleOwnershipState = {
  canManageArticle?: (currentUserId: number | undefined, article: Article | null) => boolean;
  canManageArticleComment?: (currentUserId: number | undefined, comment: Comment) => boolean;
};

async function loadOwnershipState(): Promise<ArticleOwnershipState> {
  try {
    return (await import('../src/app/boards/article-detail-state.ts')) as ArticleOwnershipState;
  } catch {
    return {};
  }
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
