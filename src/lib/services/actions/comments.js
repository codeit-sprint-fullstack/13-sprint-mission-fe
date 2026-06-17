/** 댓글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

// POST /articles/:articleId/comments
export async function addCommentAction({ articleId, content }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("❌ 댓글 작성에 실패했습니다");
    }

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// PATCH /articles/:articleId/comments/:commentId
export async function updateCommentAction({ articleId, commentId, content }) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error("❌ 댓글 수정에 실패했습니다");
    }

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// DELETE /articles/:articleId/comments/:commentId
export async function deleteCommentAction(articleId, commentId) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("❌ 댓글 삭제에 실패했습니다");
    }

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
