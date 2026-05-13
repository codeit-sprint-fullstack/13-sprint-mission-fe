const BASE_URL = "https://one3-sprint-mission-be-6qqf.onrender.com";

export const productAPI = {
  Get: async (params = { page: 1, pageSize: 4 }) => {
    const searchParam = new URLSearchParams(params);
    const respon = await fetch(`${BASE_URL}/products?${searchParam}`);
    return await respon.json();
  },
  GetSearch: async (params = { page: 1, pageSize: 4, keyword: "" }) => {
    const searchParam = new URLSearchParams(params);
    const respon = await fetch(`${BASE_URL}/products?${searchParam}`);
    return await respon.json();
  },
  POST: async (params) => {
    try {
      const respon = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return await respon.json();
    } catch (error) {
      console.error(error);
    }
  },
};
