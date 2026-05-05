const BASE_URL = "https://panda-market-api-crud.vercel.app";

export default class ProductApi {
  async getProductList(params) {
    return api.get(`/products?${params}`);
  }

  async getProduct(id) {
    return api.get(`/products/${id}`);
  }

  async createProduct(data) {
    return api.post("/products", data);
  }

  async patchProduct(id, data) {
    return api.patch(`/products/${id}`, data);
  }

  async deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }
}

async function request(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`Http Error : ${response.status}`);
    }
    if (response.status === 204) return null;

    return response.json();
  } catch (error) {
    console.error(`Request 에러: ${error.message}`);
    throw error;
  }
}

const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
