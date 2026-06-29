/** 상품 댓글 API */

// GET /products/:productId/comments
export async function getAllProductComments(productId, limit) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/comments?limit=${limit}`,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 댓글 조회 실패 :`, { cause: error });
  }
}
