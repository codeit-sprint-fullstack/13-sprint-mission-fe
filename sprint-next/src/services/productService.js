import { API } from "@/services/apiService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProducts({ page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = {}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });
  const res = await fetch(`${BASE_URL}/products?${params}`);
  if (!res.ok) throw new Error("상품을 불러오지 못했습니다.");
  return res.json();
}

export async function getProduct(id) {
  return API.get(`/products/${id}`, { cache: "no-store" });
}

