// Articles

export async function getBestArticles(limit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles?sort=recent&limit=${limit}`,
  );
  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function getArticles({ keyword = "", sort = "recent", limit }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles?keyword=${keyword}&sort=${sort}&limit=${limit}`,
  );
  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
} // 다음엔 두개를 합칠 예정

export async function createArticles({ payload }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("생성 실패");
  return res.json();
}

export async function updateArticles({ payload, id }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("수정 실패");
  return res.json();
}

export async function getArticle(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles/${id}`);
  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function deleteArticle(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("삭제 실패");
}

// Comments

export async function getCommentsInArticle(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles/${id}/comments`,
  );
  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function createCommentsInArticle({ id, payload }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles/${id}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    throw new Error(`요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function updateCommentInArticle({ id, commentId, payload }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles/${id}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    throw new Error(`수정 실패: ${res.status}`);
  }

  return res.json();
}

export async function deleteCommentInArticle({ id, commentId }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/articles/${id}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error("삭제 실패");
}
