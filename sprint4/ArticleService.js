export const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  return fetch(
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
  )
    .then((res) => {
      if (!res.ok) {
        console.error("❌ 에러:", res.status);
        throw new Error("요청 실패");
      }
      return res.json();
    })
    .then((data) => {
      console.log("📄 Article List:", data);
      return data;
    })
    .catch((err) => {
      console.error("❌ catch 에러:", err.message);
    });
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("조회 실패");
      return res.json();
    })
    .then((data) => {
      console.log("📄 Article:", data);
      return data;
    })
    .catch((err) => console.error(err));
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
      if (!res.ok) throw new Error("생성 실패");
      return res.json();
    })
    .then((data) => {
      console.log("✅ 생성:", data);
      return data;
    })
    .catch((err) => console.error(err));
}

export function patchArticle(id, data) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("수정 실패");
      return res.json();
    })
    .then((data) => {
      console.log("✏️ 수정:", data);
      return data;
    })
    .catch((err) => console.error(err));
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("삭제 실패");
      console.log("🗑 삭제 완료");
    })
    .catch((err) => console.error(err));
}
