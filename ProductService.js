const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 모든 상품 조회
export function getProductList(page, pageSize, keyword) {
  return fetch(
    `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`,
  )
    .then((response) => {
      if (!response.ok) {
        console.error(`상품 조회 실패: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("상품을 불러올 수 없습니다.", error);
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

// 상품 삭제
export function deleteProduct(id) {
  return fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        console.error(`상품 삭제 실패: ${response.status}`);
        return false;
      }
      return true; // 성공 여부만 반환
    })
    .catch((error) => {
      console.error("상품을 삭제할 수 없습니다.", error);
      return false;
    });
}
