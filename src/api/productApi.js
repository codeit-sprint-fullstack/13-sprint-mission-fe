const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function request(path, options) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "요청에 실패했습니다.");
  }

  return data;
}

export async function uploadImages(files) {
  const token = getToken();
  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "이미지 업로드에 실패했습니다.");
  }
  return data.urls;
}

export async function getProducts({
  page = 1,
  limit = 10,
  keyword = "",
  sort = "recent",
} = {}) {
  const params = new URLSearchParams({ page, limit, sort });
  if (keyword) params.append("keyword", keyword);
  return request(`/products?${params}`);
}

export async function getProduct(id) {
  return request(`/products/${id}`);
}

export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify({ name, description, price, tags, images }),
  });
}

export async function updateProduct(id, body) {
  return request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteProduct(id) {
  return request(`/products/${id}`, { method: "DELETE" });
}

export async function favoriteProduct(id) {
  return request(`/products/${id}/favorite`, { method: "POST" });
}

export async function unfavoriteProduct(id) {
  return request(`/products/${id}/favorite`, { method: "DELETE" });
}

export async function getProductComments(id, { cursor, limit = 10 } = {}) {
  const params = new URLSearchParams({ limit });
  if (cursor) params.append("cursor", cursor);
  return request(`/products/${id}/comments?${params}`);
}

export async function createProductComment(id, content) {
  return request(`/products/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}
