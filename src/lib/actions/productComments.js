/** 상품 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";
import { getServerSideToken } from "@/lib/actions/auth";

/** GET /products/:productId/comments
 * - 로그인 상태일 때, accessToken 발행
 * - refresh는 시도 하지 않음
 */
export async function getAllCommentAction({ productId }) {
  try {
    const accessToken = await getServerSideToken("accessToken");
    const response = await fetch(
      `${process.env.API_BASE_URL}/products/${productId}/comments`,
      accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined,
    );

    if (response.status === 204) return null;
    if (response.status === 401 || response.status === 403)
      return { list: [], nextCursor: null };
    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 댓글 조회 실패 :`, { cause: error });
  }
}

// POST /products/:productId/comments
export async function addCommentAction({ productId, content }) {
  try {
    await tokenFetch(`/products/${productId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/items/${productId}`, "page");

    return { success: true };
  } catch (error) {
    if (error.status === 401) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    return { success: false, error: error.message };
  }
}

// PATCH /products/:productId/comments/:commentId
export async function updateCommentAction({ productId, commentId, content }) {
  try {
    await tokenFetch(`/products/${productId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/items/${productId}`, "page");

    return { success: true };
  } catch (error) {
    if (error.status === 401) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    if (error.status === 403) {
      return { success: false, error: "권한이 없습니다" };
    }

    console.error(error);
    return { success: false, error: "❌ 댓글 수정에 실패했습니다" };
  }
}

// DELETE /products/:productId/comments/:commentId
export async function deleteCommentAction({ productId, commentId }) {
  try {
    await tokenFetch(`/products/${productId}/comments/${commentId}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    if (error.status === 401) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    console.error(error);
    return { success: false, error: "❌ 댓글 삭제에 실패했습니다" };
  }
}
