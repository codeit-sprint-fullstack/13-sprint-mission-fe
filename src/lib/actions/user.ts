/** 사용자 Server Actions */
"use server";

import { tokenFetch } from "@/lib/services/fetchClient";

/** 상품 좋아요 토글 (추가/취소)
 * - POST /products/:productId/likes
 */
export async function toggleLikeAction(productId: string | number) {
  return tokenFetch(`/products/${productId}/likes`, { method: "POST" });
}
