const BASE_URL = "https://panda-market-api.vercel.app";

export const productAPI = {
  Get: async (params = { page: 1, pageSize: 4, orderBy: "favorite" }) => {
    const searchParam = new URLSearchParams(params);
    const respon = await fetch(`${BASE_URL}/products?${searchParam}`);
    return await respon.json();
  },
};
