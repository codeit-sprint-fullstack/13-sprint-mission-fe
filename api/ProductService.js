const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(page, pageSize, keyword) {
  const params = new URLSearchParams({ page, pageSize, keyword });

  try {
    const res = await fetch(`${BASE_URL}/products?${params}`);
    if (!res.ok) {
      throw new Error(`상품 목록 조회 실패 (상태: ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ 에러: ${error.message}`);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) {
      throw new Error(`상품 상세 조회 실패 (ID: ${id})`);
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ 에러: ${error.message}`);
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });
    if (!res.ok) {
      throw new Error("상품 생성에 실패했습니다.");
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ 에러: ${error.message}`);
  }
}

export async function patchProduct(id, updates) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      throw new Error("상품 수정에 실패했습니다.");
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ 에러: ${error.message}`);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("상품 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error(`❌ 에러: ${error.message}`);
  }
}
