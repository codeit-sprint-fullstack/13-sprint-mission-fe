const BASE_URL = 'https://panda-market-api-crud.vercel.app';

export async function getProductList({ page = 1, pageSize = 10, keyword = '', orderBy = 'recent' } = {}) {
  try {
    const res = await fetch(`${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`);
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function patchProduct(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
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

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`에러 발생: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
