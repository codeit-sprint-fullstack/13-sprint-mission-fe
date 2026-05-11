import axios from "axios";

const BASE_URL = "http://localhost:3000/products";

export const getProducts = async (offset, limit) => {
  const response = await axios.get(
    `${BASE_URL}?offset=${offset}&limit=${limit}`,
  );

  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(BASE_URL, productData);

  return response.data;
};
