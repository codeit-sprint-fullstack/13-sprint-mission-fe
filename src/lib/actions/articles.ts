/** 게시글 Server Actions */
"use server";

import { revalidatePath } from "next/cache";

import { tokenFetch } from "@/lib/services/fetchClient";
import type { ArticleActionResult, ArticlePayload } from "@/types/article";

// GET /articles
export async function getAllArticles({
  pageSize = "10",
  page = "1",
  order = "recent",
  search = "",
}: {
  pageSize?: string;
  page?: string;
  order?: string;
  search?: string;
}) {
  try {
    const query = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      order,
      search,
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?${query}`,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 게시글 조회 실패 :`, { cause: error });
  }
}

// GET /articles/:id
export async function getArticleById(id: string | number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
    );

    if (response.status === 404) {
      return { notFound: true, data: null };
    }

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 게시글 조회 실패 :`, { cause: error });
  }
}

// POST /articles
export async function createArticleAction(
  payload: ArticlePayload,
): Promise<ArticleActionResult> {
  try {
    const result = await tokenFetch("/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidatePath("/articles", "page");

    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "❌ 게시글 등록에 실패했습니다" };
  }
}

// PATCH /articles/:id
export async function updateArticleAction(
  articleId: string | number,
  payload: ArticlePayload,
): Promise<ArticleActionResult> {
  try {
    const result = await tokenFetch(`/articles/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidatePath(`/articles/${articleId}`, "page");

    return { success: true, data: result.data };
  } catch {
    return { success: false, error: "❌ 게시글 수정에 실패했습니다" };
  }
}

// DELETE /articles/:id
export async function deleteArticleAction(articleId: string | number) {
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
