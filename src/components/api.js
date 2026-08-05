const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export function apiUrl(path) {
  return apiBaseUrl ? `${apiBaseUrl}${path}` : `/api${path}`;
}
