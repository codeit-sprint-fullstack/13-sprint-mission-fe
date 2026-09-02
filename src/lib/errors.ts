// catch로 받은 unknown을 사용자에게 보여줄 메시지로 바꿈
// throws는 무엇이든 가능해서 (문자열, 객체 ...) 타입이 unknown이라 좁히기가 필요함
export function getErrorMessage(
  err: unknown,
  fallback = "요청에 실패했어요.",
): string {
  return err instanceof Error ? err.message : fallback;
}
