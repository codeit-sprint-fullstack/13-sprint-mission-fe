/** 게시글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

// DELETE /articles/:id
export async function deleteArticleAction(articleId) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/articles/${articleId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("❌ 게시글 삭제에 실패했습니다");
    }

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
