const BASE_URL = 'https://panda-market-api.vercel.app/products';

export async function getProducts(options = '') {
  const response = await fetch(`${BASE_URL}${options}`);
  if (!response.ok) {
    throw new Error('상품 데이터를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}