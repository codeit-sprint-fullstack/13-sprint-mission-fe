const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPosts({
  orderBy = "recent",
  pageSize = 10,
  keyword = "",
} = {}) {
  const params = new URLSearchParams({
    orderBy,
    pageSize: String(pageSize),
    ...(keyword && { keyword }),
  });

  const url = `${BASE_URL}/articles?${params.toString()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);
  return response.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("이미지 업로드 실패");
  const data = await response.json();
  return data.url;
}

export async function createPost({ title, content, image, ownerId }) {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image, ownerId }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "게시글 등록 실패");
  }
  return response.json();
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "회원가입 실패");
  }
  return response.json();
}

export async function signIn({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "로그인 실패");
  }
  return response.json();
}
