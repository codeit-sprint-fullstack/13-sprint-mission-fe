export default function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // 디코딩
    const now = Math.floor(Date.now() / 1000); // 현재 시각 (초)
    return payload.exp < now; // 만료됐으면 true
  } catch {
    return true; // 디코딩 실패 = 유효하지 않은 토큰
  }
}
