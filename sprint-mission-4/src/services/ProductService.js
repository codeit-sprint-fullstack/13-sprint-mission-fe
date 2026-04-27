// ProductService.js
const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  try {
    const response = await fetch(
      `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    );
    if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
export async function createProduct(data) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
export async function patchProduct(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
