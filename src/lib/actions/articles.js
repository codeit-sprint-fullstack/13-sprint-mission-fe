/** 게시글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";

// DELETE /articles/:id
export async function deleteArticleAction(articleId) {
  try {
    await tokenFetch(`/articles/${articleId}`, {
      method: "DELETE",
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("❌ 게시글 삭제에 실패했습니다");
  }
}
