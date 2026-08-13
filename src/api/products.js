import axios from './axios';

export async function getProducts({
  orderBy = 'recent',
  page = 1,
  pageSize = 10,
  keyword,
} = {}) {
  const response = await axios.get('/products', {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  const { totalCount, list } = response.data;
  return { totalCount, list };
}

export async function addProduct(product) {
  const response = await axios.post('/products', product);
  const newProduct = response.data;
  return newProduct;
}

export async function getProduct(productId) {
  const response = await axios.get(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId, partialProduct) {
  const response = await axios.patch(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId) {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId) {
  const response = await axios.post(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId) {
  const response = await axios.delete(`/products/${productId}/favorite`);
  const product = await response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}) {
  const response = await axios.get(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  return response.data;
}

export async function addProductComment(productId, { content }) {
  const response = await axios.post(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
