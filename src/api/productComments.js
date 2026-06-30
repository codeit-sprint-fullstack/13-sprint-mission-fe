import { fetchInstance } from "@/lib/fetchInstance";

// 상품 댓글 목록 조회
export async function getProductComments(
  productId,
  { limit = 10, cursor } = {},
) {
  const params = new URLSearchParams({ limit });
  if (cursor) params.append("cursor", cursor);
  return fetchInstance(`/products/${productId}/comments?${params.toString()}`, {
    next: { revalidate: 60 },
  });
}

// 상품 댓글 작성
export async function createProductComment(productId, content) {
  return fetchInstance(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// 상품 댓글 수정
export async function updateProductComment(commentId, content) {
  return fetchInstance(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });
}

// 상품 댓글 삭제
export async function deleteProductComment(commentId) {
  return fetchInstance(`/comments/${commentId}`, {
    method: "DELETE",
  });
}
