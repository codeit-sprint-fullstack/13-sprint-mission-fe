// Article API

// BASE URL
const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 * 게시글 목록을 조회합니다.
 * @param {number} [page=1] - 현재 페이지 번호
 * @param {number} [pageSize=10] - 페이지당 게시글 수
 * @param {string} [keyword=""] - 검색 키워드 (선택)
 * @returns {Promise<Object>} - 게시글 목록 응답 데이터
 */
function getArticleList(page, pageSize, keyword) {
  const params = new URLSearchParams({
    page: page ?? 1,
    pageSize: pageSize ?? 10,
    keyword: keyword ?? "",
  });
  const url = `${BASE_URL}/articles?${params}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw new Error(`❌ API Error : ${error.message}`);
    });
}

/**
 * 게시글 상세를 조회합니다.
 * @param {number} articleId - 게시글 ID
 * @returns {Promise<Object>} - 게시글 상세 조회 응답 데이터
 */
function getArticle(articleId) {
  const url = `${BASE_URL}/articles/${articleId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw new Error(`❌ API Error : ${error.message}`);
    });
}

/**
 * 새로운 게시글을 등록합니다.
 * @param {{ image: string, content: string, title: string }} newPost - 게시글 데이터
 * @returns {Promise<Object>} - 게시글 등록 응답 데이터
 */
function createArticle(newPost) {
  const url = `${BASE_URL}/articles`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw new Error(`❌ API Error : ${error.message}`);
    });
}

/**
 * 게시글을 수정 합니다.
 * @param {number} articleId -수정할 게시글 ID
 * @param {{image: string, content: string, title: string}} updatedPost - 수정할 데이터
 * @returns {Promise<Object>} - 수정된 게시글 응답 데이터
 */
function patchArticle(articleId, updatedPost) {
  const url = `${BASE_URL}/articles/${articleId}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw new Error(`❌ API Error : ${error.message}`);
    });
}

/**
 * 게시글을 삭제 합니다.
 * @param {number} articleId - 삭제할 게시글 ID
 * @returns {Promise<void>} - 게시글 삭제 요청 결과
 */
function deleteArticle(articleId) {
  const url = `${BASE_URL}/articles/${articleId}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`⚠️ 서버 응답 실패, ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw new Error(`❌ API Error : ${error.message}`);
    });
}

// EXPORT
export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
