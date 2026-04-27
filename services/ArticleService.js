const BASE_URL = 'https://panda-market-api-crud.vercel.app';

export async function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  try {
    const res = await fetch(`${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`);
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function createArticle({ title, content, image }) {
  try {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image }),
    });
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function patchArticle(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function deleteArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
