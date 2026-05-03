const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 목록
export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  try {
    const res = await fetch(
      `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
    );

    if (!res.ok) {
      throw new Error("목록 조회 실패");
    }

    return await res.json();
  } catch (err) {
    console.error("❌", err.message);
    throw err;
  }
}

// 생성
export async function createProduct(data) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("생성 실패");
    }

    return await res.json();
  } catch (err) {
    console.error("❌", err.message);
    throw err;
  }
}
