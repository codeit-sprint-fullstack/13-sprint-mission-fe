import { BASE_URL } from "./config";

export async function getArticles(sortValue, debouncedKeyword) {
  const res = await fetch(
    `${BASE_URL}/articles?sort=${sortValue}&keyword=${debouncedKeyword}`,
  );
  const articles = await res.json();
  return articles.data;
}

export async function postArticle(articleData) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });
  const data = await res.json();
  return data.data.id;
}

export async function updateArticle(articleData, articleId) {
  await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });
}

export async function getDetailArticleData(articleId) {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`);
  const articleData = await res.json();
  return articleData;
}

export async function deleteDetailArticle(articleId) {
  await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  });
}

export async function getBestArticles() {
  const res = await fetch(`${BASE_URL}/articles?sort=favoritest&limit=3`, {
    cache: "no-store",
  });
  const bestArticles = await res.json();
  return bestArticles;
}
