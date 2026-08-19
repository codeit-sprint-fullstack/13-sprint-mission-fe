export default function dateFormat(initialData: string) {
  const formattedDate = new Date(initialData)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ". ")
    .slice(0, -1);

  return formattedDate;
}
