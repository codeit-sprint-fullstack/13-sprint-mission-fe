const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({ page, pageSize, keyword, sort }) => {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
    orderBy: sort,
  });

  const res = await fetch(`${BASE_URL}/products?${params}`);
  if (!res.ok) throw new Error("API 요청 실패");

  return res.json();
};
