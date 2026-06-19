// 1. 게시글 전체 조회
export const getAllArticles = async (
  searchValue = "",
  pageNum = 1,
  sortValue = "latest",
) => {
  const response = await fetch(
    `http://localhost:3000/articles?keyword=${searchValue}&page=${pageNum}&sort=${sortValue}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "게시글 목록 조회에 실패했습니다.");
  }

  return response.json();
};

// 2. 게시글 상세 조회

export async function getArticle(id) {
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`);
    if (!response.ok) throw new Error("게시글을 가져오는데 실패했습니다");
    return await response.json();
  } catch (error) {
    console.error(`getArticle(${id}) 에러:`, error);
    throw error;
  }
}

// 3. 게시글 등록
export async function createArticle(articleData) {
  try {
    const response = await fetch("http://localhost:3000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) throw new Error("게시글 등록에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error("createArticle 에러:", error);
    throw error;
  }
}

// 4. 게시글 수정
export async function updateArticle(id, articleData) {
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(`updateArticle(${id}) 에러:`, error);
    throw error;
  }
}

// 5. 게시글 삭제
export async function deleteArticle(id) {
  try {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("게시글 삭제에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(`deleteArticle(${id}) 에러:`, error);
    throw error;
  }
}
