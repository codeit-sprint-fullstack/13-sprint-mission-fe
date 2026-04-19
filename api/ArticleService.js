const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page, pageSize, keyword) {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return fetch(`${BASE_URL}/articles?${params}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`목록 조회 실패! 상태 : ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ 게시글 목록 조회 성공");
      return data;
    })
    .catch((error) => {
      console.error(`❌ 에러: ${error.message}`);
    });
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`상세 조회 실패! (ID: ${id})`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ 게시글 조회 성공");
      return data;
    })
    .catch((error) => {
      console.error(`❌ 에러: ${error.message}`);
    });
}

export function createArticle(title, content, image) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("게시글 생성에 실패했습니다.");
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ 게시글 생성 성공");
      return data;
    })
    .catch((error) => {
      console.error(`❌ 에러: ${error.message}`);
    });
}

export function patchArticle(id, updates) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("게시글 수정에 실패했습니다.");
      }
      return res.json();
    })
    .then((data) => {
      console.log("✅ 게시글 수정 성공");
      return data;
    })
    .catch((error) => {
      console.error(`❌ 에러: ${error.message}`);
    });
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("게시글 삭제에 실패했습니다.");
      }
      console.log("✅ 게시글 삭제 성공");
    })
    .catch((error) => {
      console.error(`❌ 에러: ${error.message}`);
    });
}
