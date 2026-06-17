// API: https://panda-market-api-crud.vercel.app
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://panda-market-api-crud.vercel.app';

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
