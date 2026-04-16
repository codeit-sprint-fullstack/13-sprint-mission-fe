const baseUrl = "https://panda-market-api-crud.vercel.app/articles";

export function getArticleList(params) {
  const searchParams = new URLSearchParams(params);
  const url = `${baseUrl}?${searchParams}`;
  fetch(url)
    .then((response) => {
      // if (response.status >= 300) { //!response가 200~299까지 였을 때, true인걸 몰랐음
      if (!response.ok) {
        throw new Error("요청 실패!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("요청 실패!", error.message);
      throw error;
    });
}

export function getArticle(articleId) {
  fetch(`${baseUrl}/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("요청 실패!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("요청 실패!", error.message);
      throw error;
    });
}

export function createArticle() {
  const newArticle = {
    image: "https://example.com/...",
    content: "게시글 내용입니다.",
    title: "게시글 제목입니다.",
  };
  fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArticle),
  })
    .then((response) => {
      if (response.ok) {
        throw new Error("요청 실패!");
      }
      return response.json();
    })
    .then((data) => {
      console.log("생성된 게시물:", data);
    })
    .catch((error) => {
      console.error("요청 실패!", error.message);
      throw error;
    });
}

export function patchArticle(articleId) {
  const newPatchArticle = {
    title: "수정된 제목입니다",
    content: "수정된 내용입니다",
  };
  fetch(`${baseUrl}/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPatchArticle),
  })
    .then((response) => {
      if (response.ok) {
        throw new Error("요청 실패!");
      }
      return response.json();
    })
    .then((data) => {
      console.log("수정된 게시물:", data);
    })
    .catch((error) => {
      console.error("요청 실패!", error.message);
      throw error;
    });
}

export function deleteArticle(articleId) {
  fetch(`${baseUrl}/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("요청 실패!");
      }
      console.log("게시물 삭제 성공 id: ", articleId);
    })
    .catch((error) => {
      console.error("요청 실패!", error.message);
      throw error;
    });
}
