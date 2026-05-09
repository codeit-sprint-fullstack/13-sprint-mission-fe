import { BASE_URL } from "@/constants/constants";

/**
 * 상품 목록 데이터 조회
 *
 * @async
 * @function getProducts
 * @param {Object} params - 조회 조건 및 제어 객체
 * @param {number} [params.pageSize=10] - 한 페이지당 표시할 아이템 수
 * @param {number} [params.page=1] - 조회할 페이지 번호
 * @param {string} [params.orderBy='recent'] - 정렬 기준 (예: 'recent', 'favorite')
 * @param {string} [params.keyword=''] - 검색어 필터
 * @param {AbortSignal} [params.signal] - 비동기 요청을 취소하기 위한 AbortController의 signal
 *
 * @returns {Promise<Object|null>} 상품 목록 데이터 객체. 데이터가 없을 경우(204) null 반환.
 *
 * @throws {Error} API 응답이 실패하거나 네트워크 오류 발생 시 에러를 던집니다.
 *
 * @example
 * const data = await getProducts({ page: 1, keyword: '노트북' });
 */
async function getProducts({
  pageSize = 10,
  page = 1,
  orderBy = "recent",
  keyword = "",
  signal,
}) {
  try {
    const query = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      orderBy,
      keyword,
    }).toString();

    const response = await fetch(`${BASE_URL}/items?${query}`, { signal });

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    // AbortError인 경우 외부에서 알 수 있도록 에러 발생 (용자가 의도적으로 취소한 것인지 구분)
    if (error.name === "AbortError") throw error;

    throw new Error(`❌ API Error :`, { cause: error });
  }
}

/**
 * 상품 관련 데이터를 생성하거나 등록
 *
 * @async
 * @function postProduct
 * @param {string} endpoint - API의 세부 경로 (예: "/items")
 * @param {Object} data - 서버로 보낼 요청 본문(Body) 데이터 객체
 * @returns {Promise<Object>} 서버로부터 응답받은 JSON 데이터 객체
 *
 * @throws {Error} 응답 상태가 ok가 아니거나 네트워크 에러 발생 시 에러를 던집니다.
 * @throws {Error} '❌ 상품 조회 실패' 메시지와 함께 원래의 에러 원인(cause)을 포함합니다.
 *
 * @example
 * const newProduct = { name: "노트북", price: 1000000 };
 * try {
 *   const result = await postProduct("/products", newProduct);
 *   console.log("등록 성공:", result);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
async function postProduct(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw new Error("❌ 상품 조회 실패", { cause: error });
  }
}

export { getProducts, postProduct };
