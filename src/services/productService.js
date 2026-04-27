const BASE_URL = 'https://panda-market-api-crud.vercel.app'

export async function getProductList({ page = 1, pageSize = 10, keyword = '', orderBy = 'recent' } = {}) {
  const res = await fetch(
    `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}&orderBy=${orderBy}`
  )
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
