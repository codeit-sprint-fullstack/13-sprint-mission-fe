/**
 * 날짜를 "방금 전", "1분 전", "2시간 전", "3일 전" 같은 상대 시간 문자열로 변환
 * 일정 기간(기본 7일)이 지나면 "YYYY.MM.DD" 형태의 절대 날짜로 표시
 *
 * @param {Date | string | number} date - 변환할 날짜 (Date 객체, ISO 문자열, timestamp 모두 가능)
 * @returns {string} 상대 시간 문자열
 */
export function getRelativeTime(date) {
  const target = new Date(date);

  if (isNaN(target.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  // 미래 시간 : 서버/클라이언트 시간 차로 음수 방어 코드
  if (diffSec < 0) {
    return "방금 전";
  }

  if (diffSec < 60) {
    return "방금 전";
  }

  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }

  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  if (diffDay < 7) {
    return `${diffDay}일 전`;
  }

  if (diffWeek < 4) {
    return `${diffWeek}주 전`;
  }

  if (diffMonth < 12) {
    return `${diffMonth}개월 전`;
  }

  if (diffYear >= 1) {
    return `${diffYear}년 전`;
  }

  // fallback: 절대 날짜 (YYYY.MM.DD)
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}
