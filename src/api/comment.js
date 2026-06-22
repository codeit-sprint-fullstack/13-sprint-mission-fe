//1. 게시글 댓글 전체 조회

export async function getComments(articleId, page = 1, limit = 10) {
  try {
    const response = await fetch(
      `http://localhost:3000/articles/${articleId}/comments?page=${page}&limit=${limit}`,
    );
    if (!response.ok) throw new Error("댓글을 불러오는데 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error("getComments 에러:", error);
    throw error;
  }
}

//2. 게시글 댓글 등록

export async function createComment(articleId, content) {
  try {
    const response = await fetch(
      `http://localhost:3000/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );
    if (!response.ok) throw new Error("댓글 등록에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error("createComment 에러:", error);
    throw error;
  }
}

// 3. 게시글 댓글 수정 
export async function updateComment(articleId, commentId, content) {
  try {
    const response = await fetch(
      `http://localhost:3000/articles/${articleId}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );
    if (!response.ok) throw new Error("댓글 수정에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error("updateComment 에러:", error);
    throw error;
  }
}

// 4. 게시글 댓글 삭제 
export async function deleteComment(articleId, commentId) {
  try {
    const response = await fetch(
      `http://localhost:3000/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) throw new Error("댓글 삭제에 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error("deleteComment 에러:", error);
    throw error;
  }
}
