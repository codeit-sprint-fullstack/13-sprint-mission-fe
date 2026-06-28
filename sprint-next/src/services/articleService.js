import { API } from "@/services/apiService";
export { formatDate } from "@/utils/formatDate";

export async function getBestArticles(pageSize = 3) {
  const data = await API.get(
    `/articles?page=1&pageSize=${pageSize}&orderBy=favorite`,
    { cache: "no-store" }
  );
  return data?.list ?? [];
}

export async function getArticles({ orderBy = "recent", keyword = "", pageSize = 10 } = {}) {
  const params = new URLSearchParams({ page: 1, pageSize, orderBy, keyword });
  const data = await API.get(`/articles?${params}`, { cache: "no-store" });
  return data?.list ?? [];
}

export async function getArticle(id) {
  return API.get(`/articles/${id}`, { cache: "no-store" });
}

export async function getArticleComments(articleId) {
  const data = await API.get(`/articles/${articleId}/comments`, { cache: "no-store" });
  return data?.list ?? [];
}

export function formatRelativeTime(isoString) {
  if (!isoString) return "방금 전";
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (isNaN(diff) || diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}
