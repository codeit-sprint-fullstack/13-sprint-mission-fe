// 댓글 API - 댓글 목록 조회, 등록, 수정, 삭제 요청을 담당
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 특정 게시글의 댓글 목록 조회
export const getComments = async (articleId) => {
  const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`);
  return res.json();
};

// 새 댓글 등록
export const createComment = async (articleId, content) => {
  await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
};

// 기존 댓글 내용 수정 (PATCH) - commentId는 articleId와 다른 엔드포인트 사용
export const updateComment = async (commentId, content) => {
  await fetch(`${BASE_URL}/articles/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  await fetch(`${BASE_URL}/articles/comments/${commentId}`, {
    method: "DELETE",
  });
};
