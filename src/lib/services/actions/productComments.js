// TODO: API 수정 후, comment.js 파일 하나로 통합하기
/** 상품 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { AuthError } from "@/lib/error";

// GET /products/:productId/comments
export async function getAllCommentAction({ productId, limit = 10 }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/products/${productId}/comments?limit=${limit}`,
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
export async function addCommentAction({ token, productId, content }) {
  // 토큰 없을 때
  if (!token) {
    throw new AuthError("토큰이 없습니다.", "NO_TOKEN");
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/products/${productId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("❌ 댓글 작성에 실패했습니다");
    }

    revalidatePath(`/items/${productId}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// PATCH /comments/:commentId
export async function updateCommentAction({
  token,
  productId,
  commentId,
  content,
}) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("토큰이 만료되었거나 유효하지 않습니다");
      }

      if (response.status === 403) {
        throw new Error("권한이 없습니다");
      }

      throw new Error("❌ 댓글 수정에 실패했습니다");
    }

    revalidatePath(`/items/${productId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// DELETE /comments/:commentId
export async function deleteCommentAction({ token, productId, commentId }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("❌ 댓글 삭제에 실패했습니다");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
