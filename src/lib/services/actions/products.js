/** 상품 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

// DELETE /products/:id
export async function deleteProductAction(productId, token) {
  const response = await fetch(
    `${process.env.API_BASE_URL}/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("❌ 상품 삭제에 실패했습니다");
  }

  revalidatePath(`/items/${productId}`, "page");

  return { success: true };
}
