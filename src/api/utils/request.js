/**
 * 공통 API 요청 래퍼 함수
 * @template T
 * @param {() => Promise<T>} apiCall - API 요청 함수
 * @returns {Promise<T>}
 */
async function request(apiCall) {
  try {
    const data = await apiCall();
    console.log("✅ 완료", data);
    return data;
  } catch (error) {
    console.log("❌ 실패", error);
    throw error;
  }
}

export default request;
