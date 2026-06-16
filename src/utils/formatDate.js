export default function formatDate(date) {
  const newData = new Date(date);

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
