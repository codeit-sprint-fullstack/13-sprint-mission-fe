/** 커스텀 에러 */

export class AuthError extends Error {
  code?: string; // "NO_TOKEN" | "TOKEN_EXPIRED" | "REFRESH_FAILED"

  constructor(message: string, code?: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

export class NetworkError extends Error {
  constructor(message = "네트워크 오류가 발생했습니다") {
    super(message);
    this.name = "NetworkError";
  }
}

/** status 코드를 담는 HTTP 에러 - fetch 응답 실패 시 사용 */
export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
