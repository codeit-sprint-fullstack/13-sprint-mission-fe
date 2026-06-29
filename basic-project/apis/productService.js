import api from "./main.js";
const PRODUCT_ENDPOINT = "/products";

export const getProductList = async (page, pageSize, keyword) => {
  const queryParam = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });
  return await api.get(`${PRODUCT_ENDPOINT}?${queryParam}`);
};
export const getProduct = async (productId) => {
  return await api.get(`${PRODUCT_ENDPOINT}/${productId}`);
};
export const createProduct = async (body) => {
  return await api.post(`${PRODUCT_ENDPOINT}`, body);
};
export const patchProduct = async (productId, body) => {
  return await api.patch(`${PRODUCT_ENDPOINT}/${productId}`, body);
};
export const deleteProduct = async (productId) => {
  return await api.delete(`${PRODUCT_ENDPOINT}/${productId}`);
};
