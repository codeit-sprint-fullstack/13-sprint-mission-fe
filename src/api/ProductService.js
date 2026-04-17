// Product API

// BASE URL
const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 * 상품 목록을 조회합니다.
 * @param {number} [page=1] - 페이지 번호
 * @param {number} [pageSize=10] - 페이지 당 상품 수
 * @param {string} [keyword=""] - 검색 키워드
 * @returns {Promise<Object>} - 상품 목록 응답 데이터
 */
async function getProductList(page, pageSize, keyword) {
  try {
    const params = new URLSearchParams({
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      keyword: keyword ?? "",
    });
    const url = `${BASE_URL}/products?${params}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    const products = await response.json();
    return products;
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

/**
 * 상품 상세를 조회합니다.
 * @param {number} productId - 상품 ID
 * @returns {Promise<Object>} - 상품 상세 응답 데이터
 */
async function getProduct(productId) {
  try {
    const url = `${BASE_URL}/products/${productId}`;
    const response = await fetch(url);
    console.log(url)

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    const product = await response.json();
    return product;
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

/**
 * 새로운 상품을 등록합니다.
 * @param {{
 *   images: string[],
 *   tags: string[],
 *   price: number,
 *   description: string,
 *   name: string
 * }} newProduct - 상품 데이터
 * @returns {Promise<Object>} - 상품 등록 응답 데이터
 */
async function createProduct(newProduct) {
  try {
    const url = `${BASE_URL}/products`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return response.json();
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

/**
 * 상품 데이터를 수정합니다.
 * @param {number} productId - 수정할 상품 ID
 * @param {{
 *   images: string[],
 *   tags: string[],
 *   price: number,
 *   description: string,
 *   name: string
 * }} updatedProduct - 수정할 상품 데이터
 * @returns {Promise<Object>} - 수정된 상품 응답 데이터
 */
async function patchProduct(productId, updatedProduct) {
  try {
    const url = `${BASE_URL}/products/${productId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return response.json();
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

/**
 * 상품 데이터를 삭제합니다.
 * @param {number} productId - 삭제할 상품 ID
 * @returns {Promise<Object>} - 상품 삭제 응답 데이터
 */
async function deleteProduct(productId) {
  try {
    const url = `${BASE_URL}/products/${productId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);

    return response.json();
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

// EXPORT
export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
