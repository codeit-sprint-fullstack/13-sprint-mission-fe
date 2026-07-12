/** 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";

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

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("❌ 댓글 삭제에 실패했습니다");
  }
}
