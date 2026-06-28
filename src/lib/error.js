/** 커스텀 에러 */

export class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AuthError";
    this.code = code; // "NO_TOKEN" | "TOKEN_EXPIRED" | "REFRESH_FAILED"
  }
}

export class NetworkError extends Error {
  constructor(message = "네트워크 오류가 발생했습니다") {
    super(message);
    this.name = "NetworkError";
  }
}
