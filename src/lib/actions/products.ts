/** 상품 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";
import { getServerSideToken } from "@/lib/actions/auth";
import type { Product, ProductActionResult, ProductPayload } from "@/types/product";

// GET /products/:id (비로그인도 조회 가능하지만, 로그인 상태면 isLiked가 정확히
// 내려오도록 있는 accessToken은 함께 보낸다. refresh는 시도하지 않는다)
export async function getProductByIdAction(
  id: string | number,
): Promise<Product | null> {
  const accessToken = await getServerSideToken("accessToken");
  const response = await fetch(
    `${process.env.API_BASE_URL}/products/${id}`,
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  );

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

  const { data } = await response.json();
  return data;
}

// POST /products
export async function createProductAction(
  payload: ProductPayload,
): Promise<ProductActionResult> {
  try {
    const result = await tokenFetch("/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidatePath("/items", "page");

    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "❌ 상품 등록에 실패했습니다" };
  }
}

// PATCH /products/:id
export async function updateProductAction(
  productId: string | number,
  payload: ProductPayload,
): Promise<ProductActionResult> {
  try {
    const result = await tokenFetch(`/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidatePath(`/items/${productId}`, "page");

    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "❌ 상품 수정에 실패했습니다" };
  }
}

// DELETE /products/:id
export async function deleteProductAction(productId: string | number) {
  try {
    await tokenFetch(`/products/${productId}`, {
      method: "DELETE",
    });
  } catch {
    throw new Error("❌ 상품 삭제에 실패했습니다");
  }

  revalidatePath(`/items/${productId}`, "page");

  return { success: true };
}
