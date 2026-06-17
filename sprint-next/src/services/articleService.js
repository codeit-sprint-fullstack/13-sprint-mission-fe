const BASE_URL = process.env.BASE_URL;

export function formatDate(isoString) {
  const date = new Date(isoString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}. ${m}. ${d}`;
}

export async function getBestArticles(pageSize = 3) {
  const res = await fetch(
    `${BASE_URL}/articles?page=1&pageSize=${pageSize}&orderBy=favorite`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.list ?? [];
}

export async function getArticles({ orderBy = "recent", keyword = "", pageSize = 10 } = {}) {
  const params = new URLSearchParams({ page: 1, pageSize, orderBy, keyword });
  const res = await fetch(`${BASE_URL}/articles?${params}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.list ?? [];
}
