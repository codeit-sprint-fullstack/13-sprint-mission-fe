import { BASE_URL } from "../config.js";

export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await fetch(
      `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    );
    if (!response.ok) throw new Error(`List 가져오기 실패: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error(`GET 실패 : ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!response.ok) throw new Error(`POST 실패 : ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function patchProduct(productId) {
  const updates = {
    name: "상품 이름 수정했습니다.",
  };

  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error(`PATCH 실패 : ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`DELETE 실패: ${response.status}`);
    console.log("삭제 성공", response.ok);
    return response.ok;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
