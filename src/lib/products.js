const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://panda-market-api-crud.vercel.app';

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function normalizeAssetUrl(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${BASE_URL}${path}`;
}

export function getProductImageUrl(product) {
  return normalizeAssetUrl(product.imageUrl ?? product.images?.[0]);
}

/**
 * @param {{ page?: number, pageSize?: number, keyword?: string, orderBy?: 'recent'|'favorite' }} options
 * @returns {Promise<{ list: object[], totalCount: number }>}
 */
export async function getProducts({ page = 1, pageSize = 10, keyword = '', orderBy = 'recent' } = {}) {
  const params = new URLSearchParams({ page, pageSize, keyword, orderBy });
  const res = await fetch(`${BASE_URL}/products?${params}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('상품 목록을 불러오지 못했습니다.');
  return res.json();
}

/**
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('상품을 불러오지 못했습니다.');
  return res.json();
}

export async function uploadProductImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error('이미지 업로드에 실패했습니다.');
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('상품 등록에 실패했습니다.');
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('상품 수정에 실패했습니다.');
  return res.json();
}
