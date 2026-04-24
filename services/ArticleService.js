const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page, pageSize, keyword) {
  fetch(
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`List 가져오기 실패 : ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

export function getArticle(articleId) {
  fetch(`${BASE_URL}/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) throw new Error(`GET 실패 : ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export function createArticle(title, content, image) {
  fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`POST 실패 : ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

export function patchArticle(articleId) {
  const updates = {
    title: "새로운 제목으로 수정했습니다.",
  };

  fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`PATCH 실패 : ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

export function deleteArticle(articleId) {
  fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error(`DELETE 실패 : ${response.status}`);
      return response.ok;
    })
    .then((result) => {
      console.log("삭제 성공", result);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
