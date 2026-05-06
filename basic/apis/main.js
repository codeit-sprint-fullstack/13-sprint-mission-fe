export const BASE_URL = "https://panda-market-api-crud.vercel.app";
async function request(endpoint, options = {}) {
  try {
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    //응답 상태 코드가 2XX 아닐시 에러 처리하기
    if (!response.ok) {
      throw new Error(data?.message || `Request Failed ${response.status}`);
    }

    return response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  patch: (endpoint, data) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};
export default api;
