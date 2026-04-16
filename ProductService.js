const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 상품 목록 조회
export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  try {
    const query = new URLSearchParams({
      page,
      pageSize,
      keyword,
    }).toString();

    const response = await fetch(`${BASE_URL}/products?${query}`);

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error("상품 목록 조회 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("getProductList 오류:", error.message);
    throw error;
  }
}

// 상품 단일 조회
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error("상품 조회 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("getProduct 오류:", error.message);
    throw error;
  }
}

// 상품 생성
export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error("상품 생성 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("createProduct 오류:", error.message);
    throw error;
  }
}

// 상품 수정
export async function patchProduct(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error("상품 수정 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("patchProduct 오류:", error.message);
    throw error;
  }
}

// 상품 삭제
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      throw new Error("상품 삭제 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("deleteProduct 오류:", error.message);
    throw error;
  }
}
