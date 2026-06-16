async function getAllArticles({
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

async function getArticleById(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ 게시글 조회 실패 :`, { cause: error });
  }
}

async function createArticle(body) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw new Error("❌ 게시글 등록 실패", { cause: error });
  }
}

async function updateArticle(id, body) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw new Error("❌ 게시글 수정 실패", { cause: error });
  }
}

export { getAllArticles, getArticleById, createArticle, updateArticle };
