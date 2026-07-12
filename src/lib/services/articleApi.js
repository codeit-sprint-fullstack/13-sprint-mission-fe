/** 게시글 API */

import { tokenFetch } from "@/lib/services/fetchClient";

// GET /articles
export async function getAllArticles({
  pageSize = 10,
  page = 1,
  order = "recent",
  search = "",
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
export async function getArticleById(id) {
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
export async function createArticle(body) {
  try {
    return await tokenFetch("/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error("❌ 게시글 등록 실패", { cause: error });
  }
}

// PATCH /articles/:id
export async function updateArticle(id, body) {
  try {
    return await tokenFetch(`/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error("❌ 게시글 수정 실패", { cause: error });
  }
}

// DELETE /articles/:id
export async function deleteArticle(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    revalidatePath(`/articles/${id}`, "page");
    return { success: true };
  } catch (error) {
    throw new Error("❌ 게시글 삭제 실패", { cause: error });
  }
}
