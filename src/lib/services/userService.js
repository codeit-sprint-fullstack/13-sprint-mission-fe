import { authFetch } from "@/lib/services/fetchClient";

/** Authorization Header 인증 */
export const userService = {
  /** 사용자 정보 요청 */
  getMe: () => authFetch("/users/me"),

  /** 사용자 상품 정보 요청 */
  getMyProducts: () => authFetch("/users/me/products"),

  /** 사용자가 좋아요 한 상품 정보 요청 */
  getMyFavorites: () => authFetch("/users/me/favorites"),

  /** 상품의 좋아요 여부 확인 */
  getProductFavoriteStatus: (productId) =>
    authFetch(`/products/${productId}`).then(
      (data) => data.isFavorite ?? false,
    ),

  /** 상품 좋아요 수 카운트 업 */
  updateProductFavorite: (productId) =>
    authFetch(`/products/${productId}/favorite`, {
      method: "POST",
    }),

  /** 상품 좋아요 수 카운트 다운 */
  deleteProductFavorite: (productId) =>
    authFetch(`/products/${productId}/favorite`, {
      method: "DELETE",
    }),
};
