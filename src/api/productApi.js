import { api } from "./api.js";

const PRODUCT_ENDPOINT = "/products";

export const productApi = {
  getProductList: async (
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword,
  ) => {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (pageSize) params.append("pageSize", pageSize);
    if (orderBy) params.append("orderBy", orderBy);
    if (keyword) params.append("keyword", keyword);

    return await api.get(`${PRODUCT_ENDPOINT}?${params}`);
  },
};
