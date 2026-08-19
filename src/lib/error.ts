export function getErrorMessage(
  error: unknown,
  fallback = "알 수 없는 오류가 발생했습니다.",
): string {
  return error instanceof Error ? error.message : fallback;
}
