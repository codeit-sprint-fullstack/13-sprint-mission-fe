// Product API

// IMPORT
import productConfig from "./config/productConfig.js";

// BASE URL
const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 * 상품 관련 API 메서드 모음
 * @type {{
 *   getAll: (endpoint: string) => Promise<any>,
 *   get: (endpoint: string) => Promise<any>,
 *   post: (endpoint: string, data: Object) => Promise<any>,
 *   patch: (endpoint: string, data: Object) => Promise<any>,
 *   delete: (endpoint: string) => Promise<null | any>
 * }}
 */
const productApis = {
  getAll: (endpoint) => requestApi(endpoint),
  get: (endpoint) => requestApi(endpoint),
  post: (endpoint, data) =>
    requestApi(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: (endpoint, data) =>
    requestApi(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (endpoint) => requestApi(endpoint, { method: "DELETE" }),
};

/**
 * 공통 API 요청 함수
 *
 * @template T
 * @param {string} endpoint - API 엔드포인트 (e.g. /articles)
 * @param {RequestInit} [options={}] - fetch 옵션 (method, headers, body 등)
 * @returns {Promise<T|null>} 응답 데이터 (204 No Content일 경우 null)
 *
 * @throws {Error} 서버 응답 실패 또는 네트워크 에러 발생 시
 */
async function requestApi(endpoint, options = {}) {
  try {
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    if (response.status === 204) return null;

    const products = await response.json();
    return products;
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

export default productApis;
