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
