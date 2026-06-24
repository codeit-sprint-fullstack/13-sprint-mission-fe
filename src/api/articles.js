// 게시글 API - 게시글 조회, 수정, 삭제 요청을 담당
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 단일 게시글 조회
export const getArticle = async (id) => {
  const res = await fetch(`${BASE_URL}/articles/${id}`);
  return res.json();
};

// 게시글 삭제 후 목록 페이지로 이동은 호출하는 쪽에서 처리
export const deleteArticle = async (id) => {
  await fetch(`${BASE_URL}/articles/${id}`, { method: "DELETE" });
};

// 게시글 부분 수정 (PATCH)
export const updateArticle = async (id, data) => {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
