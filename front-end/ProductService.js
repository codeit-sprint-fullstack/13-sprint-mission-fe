const BASE_URL = "http://localhost:3000/api";

/* 상품 목록 조회 */
export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
} = {}) {
  try {
    const offset = (page - 1) * pageSize;

    const params = new URLSearchParams({
      offset: offset,
      limit: pageSize,
      search: keyword,
      orderBy: orderBy,
    });

    const res = await fetch(`${BASE_URL}/products?${params.toString()}`);

    if (!res.ok) {
      throw new Error(`상품 목록 조회 실패: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("데이터 로딩 에러:", err);
    return { list: [], totalCount: 0 };
  }
}

/* 상품 등록 */
export async function createProduct(productData) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) throw new Error(`상품 등록 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("상품 등록 에러:", err);
    throw err;
  }
}

/* 상품 상세 조회 */
export async function getProductDetail(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`상품 상세 조회 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("상세 조회 에러:", err);
  }
}

/* 상품 수정 */
export async function updateProduct(id, updateData) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error(`상품 수정 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("수정 에러:", err);
  }
}

/* 상품 삭제 */
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`상품 삭제 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("삭제 에러:", err);
  }
}
