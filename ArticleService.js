const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 모든 게시글 조회
export function getArticleList(page, pageSize, keyword) {
  return fetch(
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`,
  )
    .then((response) => {
      if (!response.ok) {
        console.error(`게시글 조회 실패: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("내용을 찾을 수 없습니다.", error);
    });
}

// 특정 게시글 조회
export function getArticle(id) {
  // 특정 게시글 조회
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((response) => {
      if (!response.ok) {
        console.error(`게시글 조회 실패: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("게시글을 찾을 수 없습니다.", error);
    });
}

// 게시글 생성
export function createArticle(articleData) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`게시글 생성 실패: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("게시글을 생성할 수 없습니다.", error);
    });
}

// 게시글 수정
export function patchArticle(id, articleData) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`게시글 수정 실패: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("게시글을 수정할 수 없습니다.", error);
    });
}

// 게시글 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        console.error(`게시글 삭제 실패: ${response.status}`);
        return false;
      }
      return true; // 성공 여부만 반환
    })
    .catch((error) => {
      console.error("게시글을 삭제할 수 없습니다.", error);
      return false;
    });
}
