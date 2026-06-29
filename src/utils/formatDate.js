/**
 * 날짜를 "YYYY.MM.DD" 형식의 문자열로 변환
 *
 * @param {Date | string | number} date - 변환할 날짜 (Date 객체, ISO 문자열, timestamp 모두 가능)
 * @returns {string} "YYYY.MM.DD" 형식의 날짜 문자열 (예: "2026.06.17")
 */
export default function formatDate(date) {
  if (!date) return "";

  const newData = new Date(date);

  if (isNaN(newData.getTime())) return ""; // Invalid Date 예외 처리

  const formatted = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(newData)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");

  return formatted;
}
