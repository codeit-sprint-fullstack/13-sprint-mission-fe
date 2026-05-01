import { BASE_URL } from "@/constants/constants";

/**
 * 상품 목록 데이터를 서버에서 조회하여 상태를 업데이트
 * @param {Object} params - 조회 조건 객체
 * @param {Function} params.setProducts - 결과를 저장할 상태 변경 함수
 * @param {number} [params.pageSize=10] - 한 페이지당 아이템 수
 * @param {number} [params.page=1] - 현재 페이지 번호
 * @param {string} [params.orderBy='recent'] - 정렬 기준
 * @param {string} [params.keyword=''] - 검색어
 */
async function fetchProducts({
  pageSize = 10,
  page = 1,
  orderBy = "recent",
  keyword = "",
}) {
  try {
    const query = new URLSearchParams({
      pageSize,
      page,
      orderBy,
      keyword,
    }).toString();

    const response = await fetch(`${BASE_URL}/products?${query}`);

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ API Error : ${error.message}`);
  }
}

export default fetchProducts;
