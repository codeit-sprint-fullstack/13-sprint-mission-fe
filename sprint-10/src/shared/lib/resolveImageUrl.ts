const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

// 업로드 API는 백엔드 origin 기준 상대 경로(예: "/uploads/xxx.png")를 반환한다.
export function resolveImageUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL}${path}`;
}
