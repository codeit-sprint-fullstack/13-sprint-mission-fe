/** 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";
import { getServerSideToken } from "@/lib/actions/auth";

/** GET /articles/:articleId/comments
 * - 로그인 상태일 때, accessToken 발행
 * - refresh는 시도 하지 않음
 */
export async function getAllCommentAction({ articleId }) {
  try {
    const accessToken = await getServerSideToken("accessToken");
    const response = await fetch(
      `${process.env.API_BASE_URL}/articles/${articleId}/comments`,
      accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 댓글 조회 실패 :`, { cause: error });
  }
}

// POST /articles/:articleId/comments
export async function addCommentAction({ articleId, content }) {
  try {
    await tokenFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// PATCH /articles/:articleId/comments/:commentId
export async function updateCommentAction({ articleId, commentId, content }) {
  try {
    await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("❌ 댓글 수정에 실패했습니다");
  }
}

// DELETE /articles/:articleId/comments/:commentId
export async function deleteCommentAction({ articleId, commentId }) {
  try {
    await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "DELETE",
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("❌ 댓글 삭제에 실패했습니다");
  }
}
