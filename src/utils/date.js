export function formatDate(dateInput) {
  return new Date(dateInput)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Seoul",
    })
    .replace(/\.$/, "");
}
