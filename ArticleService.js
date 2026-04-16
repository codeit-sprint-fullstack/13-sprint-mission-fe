const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 게시글 목록 조회
export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const query = new URLSearchParams({ page, pageSize, keyword }).toString();

  return fetch(`${BASE_URL}/articles?${query}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        throw new Error("게시글 목록 조회 실패");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("getArticleList 오류:", error.message);
      throw error;
    });
}

// 게시글 단일 조회
export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        throw new Error("게시글 조회 실패");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("getArticle 오류:", error.message);
      throw error;
    });
}

// 게시글 생성
export function createArticle({ title, content, image }) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        throw new Error("게시글 생성 실패");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("createArticle 오류:", error.message);
      throw error;
    });
}

// 게시글 수정
export function patchArticle(id, data) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        throw new Error("게시글 수정 실패");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("patchArticle 오류:", error.message);
      throw error;
    });
}

// 게시글 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        throw new Error("게시글 삭제 실패");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("deleteArticle 오류:", error.message);
      throw error;
    });
}
