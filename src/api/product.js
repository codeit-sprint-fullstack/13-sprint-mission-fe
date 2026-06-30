// 상품 API - 상품 목록 조회, 상세 조회, 등록, 수정, 삭제, 좋아요 요청을 담당
import { fetchInstance } from "@/lib/fetchInstance";

// 상품 목록 조회
export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) {
  const query = new URLSearchParams({
    page,
    pageSize,
    orderBy,
    keyword,
  }).toString();
  return fetchInstance(`/products?${query}`, {
    next: { revalidate: 60 },
  });
}

// 상품 상세 조회
export async function getProduct(productId) {
  return fetchInstance(`/products/${productId}`, {
    next: { revalidate: 60 },
  });
}

// 상품 등록
export async function createProducts({
  images,
  tags,
  price,
  description,
  name,
}) {
  return fetchInstance("/products", {
    method: "POST",
    body: JSON.stringify({ images, tags, price, description, name }),
  });
}

// 상품 수정
export async function updateProduct(
  productId,
  { images, tags, price, description, name },
) {
  return fetchInstance(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ images, tags, price, description, name }),
  });
}

// 상품 삭제
export async function deleteProduct(productId) {
  return fetchInstance(`/products/${productId}`, {
    method: "DELETE",
  });
}

// 좋아요
export async function addFavorite(productId) {
  return fetchInstance(`/products/${productId}/favorite`, {
    method: "POST",
  });
}

// 좋아요 취소
export async function removeFavorite(productId) {
  return fetchInstance(`/products/${productId}/favorite`, {
    method: "DELETE",
  });
}
