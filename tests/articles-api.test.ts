import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import * as articles from '../src/lib/articles.ts';
import type { Article, ListResponse } from '../src/types/index.ts';

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://panda-market-api-crud.vercel.app';
const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('best-post request asks the paired backend for three like-ordered articles', async () => {
  let requestedUrl = '';
  globalThis.fetch = async (input) => {
    requestedUrl = String(input);
    return new Response(JSON.stringify({ list: [], totalCount: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const getBestArticles = (
    articles as typeof articles & {
      getBestArticles?: () => Promise<ListResponse<Article>>;
    }
  ).getBestArticles;

  assert.equal(typeof getBestArticles, 'function');
  if (!getBestArticles) return;
  await getBestArticles();

  assert.equal(requestedUrl, `${baseUrl}/articles?page=1&limit=3&orderBy=like`);
});
