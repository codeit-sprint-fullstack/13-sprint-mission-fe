/** 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";
import { getServerSideToken } from "@/lib/actions/auth";
import { HttpError } from "@/lib/error";
import type { ActionResult } from "@/types/common";

/** GET /articles/:articleId/comments
 * - 로그인 상태일 때, accessToken 발행
 * - refresh는 시도 하지 않음
 */
export async function getAllCommentAction({
  articleId,
}: {
  articleId: string | number;
}) {
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
export async function addCommentAction({
  articleId,
  content,
}: {
  articleId: string | number;
  content: string;
}): Promise<ActionResult> {
  try {
    await tokenFetch(`/articles/${articleId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      return { success: false, code: "UNAUTHORIZED", error: "로그인이 필요합니다" };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "댓글 등록에 실패했습니다",
    };
  }
}

// PATCH /articles/:articleId/comments/:commentId
export async function updateCommentAction({
  articleId,
  commentId,
  content,
}: {
  articleId: string | number;
  commentId: number;
  content: string;
}): Promise<ActionResult> {
  try {
    await tokenFetch(`/articles/${articleId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      return { success: false, code: "UNAUTHORIZED", error: "로그인이 필요합니다" };
    }

    console.error(error);
    return { success: false, error: "❌ 댓글 수정에 실패했습니다" };
  }
}

// DELETE /articles/:articleId/comments/:commentId
export async function deleteCommentAction({
  articleId,
  commentId,
}: {
  articleId: string | number;
  commentId: number;
}) {
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
